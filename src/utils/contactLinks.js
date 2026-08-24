/** Builds a wa.me link from a phone number in any format (spaces, dashes, +). */
export function toWhatsAppLink(rawNumber) {
  const digits = String(rawNumber).replace(/[^\d]/g, '')
  return `https://wa.me/${digits}`
}

export function toMailtoLink(email) {
  return `mailto:${email}`
}
