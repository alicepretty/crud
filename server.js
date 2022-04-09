const express = require('express')
// const res = require('express/lib/response')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errormiddleware')

const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/api/blogs', require('./routes/blogroutes'))
 app.use(errorHandler)
app.listen(port, () => console.log("server started at on port ${port}"))