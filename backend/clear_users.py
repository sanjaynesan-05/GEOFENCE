import sqlite3

conn = sqlite3.connect('users.db')
conn.execute("DELETE FROM users")
conn.commit()
conn.close()

print("✅ All users deleted from users.db")
