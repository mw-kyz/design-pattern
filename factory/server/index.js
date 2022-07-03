const express = require('express')
const { resolve } = require('path')

const app = express()

app.use('/', express.static(resolve(__dirname, '../modules')))

app.listen(3000)

console.log('http://localhost:3000')