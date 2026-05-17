import { useEffect, useRef, useState } from 'react';
import { supportsWebRTC } from '../utils/runtime';
import { publishSignal, subscribeSignals } from '../services/liveSession';

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];

/**
 * Firestore-backed WebRTC (Leta Live). Expo Go shows a placeholder; use a dev build for video.
 */
export function useWebRTC(sessionId, { isInitiator }) {
  const pcRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return undefined;

    if (!supportsWebRTC) {
      setStatus('unsupported');
      setError('Leta Live video needs a development build (not Expo Go).');
      return undefined;
    }

    const {
      mediaDevices,
      RTCPeerConnection,
      RTCSessionDescription,
      RTCIceCandidate,
    } = require('react-native-webrtc');

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
          if (event.streams?.[0]) setRemoteStream(event.streams[0]);
        };

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            publishSignal(sessionId, {
              type: 'ice',
              candidate: event.candidate.toJSON(),
            });
          }
        };

        unsubSignals = subscribeSignals(sessionId, async (signal) => {
          if (!pcRef.current) return;
          if (signal.type === 'offer' && !isInitiator) {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.sdp));
            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);
            await publishSignal(sessionId, { type: 'answer', sdp: answer });
          } else if (signal.type === 'answer' && isInitiator) {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.sdp));
          } else if (signal.type === 'ice') {
            await pcRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
          }
        });

        if (isInitiator) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          await publishSignal(sessionId, { type: 'offer', sdp: offer });
        }

        setStatus('connected');
      } catch (e) {
        if (mounted) {
          setError(e.message || 'WebRTC failed');
          setStatus('error');
        }
      }
    }

    start();

    return () => {
      mounted = false;
      unsubSignals();
      pcRef.current?.close();
      pcRef.current = null;
      localStream?.getTracks?.().forEach((t) => t.stop());
    };
  }, [sessionId, isInitiator]);

  return { localStream, remoteStream, status, error };
}
