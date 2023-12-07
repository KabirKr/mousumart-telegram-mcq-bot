import "dotenv/config"
import express from "express"
import helmet from "helmet"
import TelegramBot from "node-telegram-bot-api"

import { startBot } from "./bot"

const PORT = process.env.PORT || 8000
const BOT_TOKEN = process.env.BOT_TOKEN as string
const APP_URL = process.env.APP_URL as string

const app = express()
app.use(express.json())
app.use(helmet())

// Bot setup
const bot = new TelegramBot(BOT_TOKEN, { polling: false })
bot.setWebHook(`${APP_URL}/bot${BOT_TOKEN}`)
startBot(bot)

app.get("/", (req, res) => {
  return res.send("Hello!")
})

app.post(`/bot${BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})
