"use strict"

require("dotenv").config()
const TelegramBot = require("node-telegram-bot-api")

const BOT_TOKEN = process.env.BOT_API_TOKEN

const bot = new TelegramBot(BOT_TOKEN, { polling: true })

const validateJsonInput = (jsonInput) => {
  try {
    const parsedJson = JSON.parse(jsonInput)
    if (!Array.isArray(parsedJson)) {
      return false
    }

    for (const item of parsedJson) {
      if (
        typeof item !== "object" ||
        !item.hasOwnProperty("id") ||
        !item.hasOwnProperty("question") ||
        !item.hasOwnProperty("options") ||
        !item.hasOwnProperty("answer")
      ) {
        return false
      }

      if (
        typeof item.id !== "number" ||
        typeof item.question !== "string" ||
        !Array.isArray(item.options) ||
        typeof item.answer !== "number"
      ) {
        return false
      }

      for (const option of item.options) {
        if (
          typeof option !== "object" ||
          !option.hasOwnProperty("id") ||
          !option.hasOwnProperty("value")
        ) {
          return false
        }

        if (typeof option.id !== "number" || typeof option.value !== "string") {
          return false
        }
      }
    }

    return true
  } catch (error) {
    return false
  }
}

bot.on("message", (msg) => {
  const chatId = msg.chat.id

  if (msg.text === "/start") {
    bot.sendMessage(chatId, "Hello 👋")
    return
  }

  // Input validation
  const validated = validateJsonInput(msg.text)

  if (!validated) {
    bot.sendMessage(chatId, "Invalid message")
    return
  }

  // Parse quizzes and create poll
  const quizzes = JSON.parse(msg.text)

  quizzes.forEach((quiz) => {
    const question = quiz.question
    const options = quiz.options.map((option) => option.value)
    const answer = quiz.answer - 1

    bot.sendPoll(chatId, question, options, {
      type: "quiz",
      correct_option_id: answer,
    })
  })
})
