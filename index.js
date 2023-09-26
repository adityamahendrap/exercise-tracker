require('dotenv').config()
require('./config/dbConnection');
const express = require('express')
const app = express()
const cors = require('cors')
const usersRoute = require('./routes/users.route');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use('/api/users', usersRoute)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
