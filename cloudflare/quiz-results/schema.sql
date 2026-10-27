CREATE TABLE IF NOT EXISTS results (
  id TEXT PRIMARY KEY,
  submitted_at TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_class TEXT NOT NULL,
  quiz_path TEXT NOT NULL,
  quiz_title TEXT NOT NULL,
  correct INTEGER NOT NULL CHECK (correct >= 0 AND correct <= total),
  attempted INTEGER NOT NULL CHECK (attempted = total),
  total INTEGER NOT NULL CHECK (total > 0),
  notified INTEGER NOT NULL DEFAULT 0,
  notification_attempts INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS results_date ON results(submitted_at);
CREATE INDEX IF NOT EXISTS results_pending ON results(notified, notification_attempts);
