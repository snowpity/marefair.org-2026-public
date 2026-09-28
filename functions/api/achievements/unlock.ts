import { ACHIEVEMENT_IDS } from '@scripts/steam-id';

const VALID_ACHIEVEMENT_IDS = new Set<string>(ACHIEVEMENT_IDS);

export const onRequestPost: PagesFunction<{ DB: D1Database; IP_SALT: string }> = async (context) => {
  const { achievement_id } = await context.request.json();

  if (typeof achievement_id !== 'string' || !VALID_ACHIEVEMENT_IDS.has(achievement_id)) {
    return new Response(null, { status: 400 });
  }

  const ip = context.request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await hashIp(ip, context.env.IP_SALT);

  await context.env.DB.prepare(
    `INSERT OR IGNORE INTO achievement_unlocks (achievement_id, ip_hash, unlocked_at) VALUES (?, ?, ?)`
  ).bind(achievement_id, ipHash, new Date().toISOString()).run();

  return new Response(null, { status: 204 });
};

async function hashIp(ip: string, salt: string) {
  const data = new TextEncoder().encode(ip + salt);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}