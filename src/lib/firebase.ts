import { initializeApp } from 'firebase/app'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

export async function uploadImage(file: File) {
  const path = `images/${file.name}`

  const storageRef = ref(storage, path)
  const uploadResult = await uploadBytes(storageRef, file)
  const imageURL = await getDownloadURL(uploadResult.ref)

  return imageURL
}

export async function deleteImage(imageUrl: string) {
  const regex = /\/o\/(.*)/

  try {
    const url = new URL(imageUrl)
    const pathMatch = url.pathname.match(regex)

    if (!pathMatch || pathMatch.length < 2) return

    const fileName = decodeURIComponent(pathMatch[1])
    const storageRef = ref(storage, fileName)

    await deleteObject(storageRef)
  } catch (error) {
    console.error('Error deleting image:', error)
  }
}
