const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

/**
 * Notifies the sales Telegram chat about a new lead. Best-effort: failures are
 * logged and swallowed so a Telegram outage never blocks the lead from being
 * saved to Firestore (the source of truth) or the success UX from showing.
 */
export async function notifyNewLead({ name, phone, service, message }) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram notification skipped: missing bot token or chat id.')
    return
  }

  const text = [
    '🚀 طلب مقايسة جديد!',
    `👤 الاسم: ${name}`,
    `📞 الرقم: ${phone}`,
    service ? `🛠️ الخدمة: ${service}` : null,
    `📝 الرسالة: ${message || 'لا توجد تفاصيل إضافية'}`,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    })
  } catch (err) {
    console.error('Error sending Telegram notification:', err)
  }
}
