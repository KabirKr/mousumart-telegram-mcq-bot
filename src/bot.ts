import TelegramBot from "node-telegram-bot-api"
import validateJsonInput from "./jsonValidation"

const BOT_TOKEN = process.env.BOT_API_TOKEN as string

const bot = new TelegramBot(BOT_TOKEN, { polling: true })

bot.on("message", (msg) => {
  const chatId = msg.chat.id

  if (msg.text === "/start") {
    bot.sendMessage(chatId, `Hello! ${msg.chat.first_name} 👋`)
    return
  }

  if (!validateJsonInput(msg.text)) {
    bot.sendMessage(chatId, "Sorry! I don't know how to answer your message 🤔")
    return
  }

  // Parse quizzes and create poll
  const quizzes = JSON.parse(msg.text as string)

  quizzes.forEach((quiz: any) => {
    const question = quiz.question
    const options = quiz.options.map((option: any) => option.value)
    const answer = quiz.answer - 1

    bot.sendPoll(chatId, question, options, {
      type: "quiz",
      correct_option_id: answer,
    })
  })
})
