import { useEffect, useRef, useState } from 'react';
import { mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { publishSignal, subscribeSignals } from '../services/liveSession';

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];

/**
 * Firestore-backed WebRTC (Leta Live). Requires dev build — not Expo Go.
 */
export function useWebRTC(sessionId, { isInitiator }) {
  const pcRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return undefined;

    let unsubSignals = () => {};
    let mounted = true;

    async function start() {
      try {
        setStatus('starting');
        const stream = await mediaDevices.getUserMedia({
          audio: true,
          video: { facingMode: 'environment' },
        });
        if (!mounted) return;
        setLocalStream(stream);

        const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        pcRef.current = pc;

        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        pc.ontrack = (event) => {
          if (event.streams?.[0]) {
            setRemoteStream(event.streams[0]);
          }
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            publishSignal(sessionId, {
              type: 'ice',
              candidate: event.candidate.toJSON(),
              from: isInitiator ? 'field' : 'remote',
            });
          }
        };

        unsubSignals = subscribeSignals(sessionId, async (signal) => {
          if (!pcRef.current) return;

          if (signal.type === 'offer' && !isInitiator) {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.sdp));
            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);
            await publishSignal(sessionId, {
              type: 'answer',
              sdp: answer,
              from: 'remote',
            });
          } else if (signal.type === 'answer' && isInitiator) {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.sdp));
          } else if (signal.type === 'ice') {
            try {
              await pcRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
            } catch {
              /* ignore duplicate */
            }
          }
        });

        if (isInitiator) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          await publishSignal(sessionId, {
            type: 'offer',
            sdp: offer,
            from: 'field',
          });
        }

        setStatus('connected');
      } catch (e) {
        setError(e.message || 'WebRTC failed');
        setStatus('error');
      }
    }

    start();

    return () => {
      mounted = false;
      unsubSignals();
      pcRef.current?.close();
      localStream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, isInitiator]);

  return { localStream, remoteStream, status, error };
}
