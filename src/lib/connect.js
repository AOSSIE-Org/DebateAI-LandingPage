export const WEBAPP_URL = 'https://debateai.aossie.org';
export const TRY_IT_OUT_URL = `${WEBAPP_URL}/?server=official`;

export function normalize(raw) {
  try {
    const u = new URL(String(raw).trim());
    const local = ['localhost', '127.0.0.1'].includes(u.hostname);
    if (u.protocol !== 'https:' && !(local && u.protocol === 'http:')) return null;
    return u.origin;
  } catch {
    return null;
  }
}

export function connectToServer(raw) {
  const url = normalize(raw);
  if (!url) return false;
  window.location.href = `${WEBAPP_URL}/?server=${encodeURIComponent(url)}`;
  return true;
}
