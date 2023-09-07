import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import db from './config/db'
import i18n from 'i18n'
import path from 'path'
const app = express()
const port = 3000

i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  objectNotation: true
})

i18n.setLocale('en')

mongoose.Promise = Promise
mongoose.connect(db.connectionString)
  .then(() => {
    console.log('Connected to database')
  })
  .catch(err => console.log(err))
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use(express.json())

app.use('/', routes())

app.get('/', (_req, res) => {
  res.send('Hola mundo!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
