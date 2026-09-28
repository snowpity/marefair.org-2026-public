-- Run with: npx wrangler d1 execute steam-achievements --file=./schema.sql
-- Add --remote to apply to production instead of your local dev DB.

CREATE TABLE IF NOT EXISTS achievement_unlocks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  achievement_id TEXT NOT NULL,
  ip_hash TEXT NOT NULL,
  unlocked_at TEXT NOT NULL,
  UNIQUE(achievement_id, ip_hash)
);

CREATE INDEX IF NOT EXISTS idx_unlocks_achievement_id ON achievement_unlocks(achievement_id);
CREATE INDEX IF NOT EXISTS idx_unlocks_ip_hash ON achievement_unlocks(ip_hash);
