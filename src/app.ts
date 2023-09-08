import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import i18n from 'i18n'
import path from 'path'
import db from './config/db'
import cors from 'cors'

dotenv.config()

const app = express()

const port = process.env.PORT ?? 3000

const allowedOrigins = ['http://localhost:8080']

app.use(
  cors({
    origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void): void {
      if (origin === '' || origin === undefined || allowedOrigins.includes(origin ?? '')) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    }
  })
)

i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  objectNotation: true
})

i18n.setLocale('en')

db.connect()

app.use(express.json())

app.use('/', routes())

app.get('/', (_req, res) => {
  res.send('Hola mundo!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
