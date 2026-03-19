CREATE TABLE users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    password_hash TEXT 
);

DROP TABLE users 
ALTER TABLE users 
ADD COLUMN username TEXT;

CREATE TABLE daily_entries(
    user_id INTEGER, 
    avg_daily_usage_hours REAL,
    sleep_hours_per_night REAL,
    most_used_platform TEXT,
    addiction_result TEXT,
    date TEXT DEFAULT (DATE('now','-1 day')),
    FOREIGN KEY(user_id)
        REFERENCES users (user_id)

)


INSERT INTO users (first_name, last_name, username)
 VALUES ('First', 'Person','fperson','')  