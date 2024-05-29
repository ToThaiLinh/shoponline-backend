const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

routes(app)

app.get('/', (req, res) => {
  res.send('Hello World! Tô Thái Linh')
})

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
  console.log('Connect database success');
})
.catch((err) => {
  console.log('Lỗi kết nối database ', err);
})

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})