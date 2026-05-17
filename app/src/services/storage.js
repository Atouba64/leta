import { ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';
import { getFirebase } from '../config/firebase';

async function uriToBlob(uri) {
  const response = await fetch(uri);
  return response.blob();
}

export async function uploadTicketPhoto(ticketId, localUri, label = 'photo') {
  const { storage, configured } = getFirebase();
  if (!configured) {
    return localUri;
  }

  const name = `${label}-${Date.now()}.jpg`;
  const path = `tickets/${ticketId}/${name}`;
  const storageRef = ref(storage, path);
  const blob = await uriToBlob(localUri);
  await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
  return getDownloadURL(storageRef);
}

export async function uploadSignaturePng(ticketId, base64DataUrl) {
  const { storage, configured } = getFirebase();
  if (!configured) {
    return null;
  }

  const base64 = base64DataUrl.replace(/^data:image\/\w+;base64,/, '');
  const storageRef = ref(storage, `signatures/${ticketId}/signature.png`);
  await uploadString(storageRef, base64, 'base64', { contentType: 'image/png' });
  return getDownloadURL(storageRef);
}
