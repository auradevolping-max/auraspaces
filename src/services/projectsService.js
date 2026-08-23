import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'

const PROJECTS_COLLECTION = 'projects'

function projectsQuery() {
  return query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'))
}

/**
 * Subscribes to real-time updates on the "projects" collection, newest first.
 * Returns an unsubscribe function — call it on cleanup (e.g. useEffect return).
 */
export function subscribeToProjects(onData, onError) {
  return onSnapshot(
    projectsQuery(),
    (snapshot) => {
      onData(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })))
    },
    onError,
  )
}

/** One-time fetch, used by the public site where a live listener isn't needed. */
export async function fetchProjects() {
  const snapshot = await getDocs(projectsQuery())
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
}

export function addProject({ title, category, description, imageUrl }) {
  return addDoc(collection(db, PROJECTS_COLLECTION), {
    title,
    category,
    description,
    imageUrl,
    createdAt: serverTimestamp(),
  })
}

export function deleteProject(projectId) {
  return deleteDoc(doc(db, PROJECTS_COLLECTION, projectId))
}
