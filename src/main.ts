import "dotenv/config"
import express from "express"
import helmet from "helmet"
import "./bot"

const app = express()

// app.use(express.json())
app.use(helmet())

app.listen(8000, () => {
  console.log(`App is listening at http://localhost:${8000}`)
})
