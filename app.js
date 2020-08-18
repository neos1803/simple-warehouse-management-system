require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT | 3000
const userRoute = require('')
const photoRoute = require('')
const commentRoute = require('')
const authRoute = require('')
const auth = require('./middleware/')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', auth, userRoute)
// app.use('/photos', auth, photoRoute)
// app.use('/comments', auth, commentRoute)
app.use('/auth', authRoute)

app.listen(port, () => console.log('Listened on port ' + port))