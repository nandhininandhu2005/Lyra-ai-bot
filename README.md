# 🤖 Sage AI - Telegram Bot — READY TO RUN

## 📁 Your folder should look like this:
```
sage-ai-bot/
├── index.js              ✅ (already filled with your keys)
├── firebase.js           ✅ (database helper)
├── firebase-key.json     ⬅️ RENAME your downloaded Firebase JSON to this
├── package.json          ✅
└── README.md             ✅
```

---

## 🚀 How to Run (3 steps only)

### 1. Rename your Firebase JSON file
Rename:
  telegram-chatbot-f9e82-firebase-adminsdk-fbsvc-75af0a0039.json
To:
  firebase-key.json

Place it in the same folder as index.js.

### 2. Open terminal in this folder and run:
```
npm install
```

### 3. Start the bot:
```
node index.js
```

You should see:
  ✅ Sage AI Bot is LIVE!
  📱 Open Telegram and chat with your bot.

---

## 💬 Bot Commands
| Command    | What it does              |
|------------|---------------------------|
| /start     | Welcome message           |
| /help      | Help + example questions  |
| /clear     | Clear your chat history   |
| /history   | Show history count        |

---

## ✅ Features
- Real-time answers with Google Search
- Source links in every answer
- Chat history saved in Firebase per user
- Remembers full conversation context
- Typing indicator while thinking
