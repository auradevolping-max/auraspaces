// Shared across the public contact form and the admin Projects tab so the
// two stay in sync — Firestore's leads validation rule mirrors this list.
// Values must stay in English: they're persisted to Firestore and validated
// against this exact enum in firestore.rules.
export const SERVICE_CATEGORIES = [
  'General Construction',
  'Interior Design',
  'Premium Finishing',
  'Smart Home Setup',
]

// Arabic display labels for the public (Arabic) contact form — keyed by the
// English values above, which remain the values actually stored/validated.
export const SERVICE_LABELS_AR = {
  'General Construction': 'إنشاءات عامة',
  'Interior Design': 'تصميم داخلي',
  'Premium Finishing': 'تشطيبات فاخرة',
  'Smart Home Setup': 'إعداد المنزل الذكي',
  Other: 'أخرى',
}
