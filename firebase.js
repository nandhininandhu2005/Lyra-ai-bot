const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "chat_history.json");

// Ensure file exists
function ensureDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), "utf8");
  }
}

function loadDB() {
  try {
    ensureDB();
    const data = fs.readFileSync(DB_FILE, "utf8");
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("DB load error:", e.message);
    return {};
  }
}

function saveDB(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  } catch (e) {
    console.error("DB save error:", e.message);
  }
}

async function saveMessage(chatId, role, content) {
  const db = loadDB();
  const key = String(chatId);

  if (!db[key]) db[key] = { messages: [], profile: {} };

  db[key].messages.push({
    role,
    content,
    timestamp: new Date().toISOString(),
  });

  // Keep last 40 messages
  if (db[key].messages.length > 40) {
    db[key].messages = db[key].messages.slice(-40);
  }

  saveDB(db);
}

async function getHistory(chatId) {
  const db = loadDB();
  const key = String(chatId);

  if (!db[key] || !db[key].messages) return [];

  return db[key].messages.slice(-20).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

async function clearHistory(chatId) {
  const db = loadDB();
  const key = String(chatId);

  if (db[key]) db[key].messages = [];

  saveDB(db);
}

async function saveUserProfile(chatId, userInfo) {
  const db = loadDB();
  const key = String(chatId);

  if (!db[key]) db[key] = { messages: [], profile: {} };

  db[key].profile = {
    ...db[key].profile,
    ...userInfo,
  };

  saveDB(db);
}

module.exports = {
  saveMessage,
  getHistory,
  clearHistory,
  saveUserProfile,
};