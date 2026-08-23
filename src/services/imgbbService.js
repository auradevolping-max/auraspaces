const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload'
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY

/**
 * Uploads an image file to ImgBB and resolves with its public URL.
 * Throws with a readable message on failure (missing key, bad response, network error).
 */
export async function uploadImageToImgBB(file) {
  if (!IMGBB_API_KEY) {
    throw new Error('ImgBB API key is not configured (VITE_IMGBB_API_KEY).')
  }

  const formData = new FormData()
  formData.append('key', IMGBB_API_KEY)
  formData.append('image', file)

  const response = await fetch(IMGBB_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })

  const result = await response.json().catch(() => null)

  if (!response.ok || !result?.success) {
    throw new Error(result?.error?.message || 'Image upload to ImgBB failed.')
  }

  return result.data.url
}
