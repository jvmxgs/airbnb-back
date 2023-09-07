import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import i18n from 'i18n'
import path from 'path'
import db from './config/db'

dotenv.config()

const app = express()

const port = process.env.PORT ?? 3000

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
  console.log(`Example app listening on port ${port}`)
})
