
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));