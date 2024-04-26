const express = require('express')
const serverless = require('serverless-http')
const router = require('./routes/author')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const dbCloudUrl =
  'mongodb+srv://viennalabarda:nanaytatay@cluster0.rmamj9y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(dbCloudUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Failed to connect to MongoDB', error))
app.listen(3000, () => console.log('Server is running'))
app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)
