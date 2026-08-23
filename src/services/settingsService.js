import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

const SETTINGS_DOC_PATH = ['settings', 'global_settings']

function settingsDocRef() {
  return doc(db, ...SETTINGS_DOC_PATH)
}

/**
 * Subscribes to real-time updates on the global settings document.
 * Returns an unsubscribe function — call it on cleanup (e.g. useEffect return).
 */
export function subscribeToSettings(onData, onError) {
  return onSnapshot(
    settingsDocRef(),
    (snapshot) => onData(snapshot.exists() ? snapshot.data() : null),
    onError,
  )
}

/** One-time fetch, used by the public site where a live listener isn't needed. */
export async function fetchSettings() {
  const snapshot = await getDoc(settingsDocRef())
  return snapshot.exists() ? snapshot.data() : null
}

export function saveSettings(data) {
  return setDoc(settingsDocRef(), data, { merge: true })
}
