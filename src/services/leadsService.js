import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const LEADS_COLLECTION = 'leads'

/**
 * Subscribes to real-time updates on the "leads" collection, newest first.
 * Returns an unsubscribe function — call it on cleanup (e.g. useEffect return).
 */
export function subscribeToLeads(onData, onError) {
  const leadsQuery = query(
    collection(db, LEADS_COLLECTION),
    orderBy('createdAt', 'desc'),
  )

  return onSnapshot(
    leadsQuery,
    (snapshot) => {
      const leads = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      onData(leads)
    },
    onError,
  )
}

export function deleteLead(leadId) {
  return deleteDoc(doc(db, LEADS_COLLECTION, leadId))
}

export function updateLeadStatus(leadId, status) {
  return updateDoc(doc(db, LEADS_COLLECTION, leadId), { status })
}
