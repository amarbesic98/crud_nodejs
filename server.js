const express = require('express')
const bodyparses = require('body-parser')
const app = express()
const morgan = require('morgan')
const routes = require('./server/routes/router')
const connectDB = require('./server/db/connect')
const PORT = process.env.PORT || 5000
const path = require('path')

app.use(morgan('tiny'));

app.use(bodyparses.urlencoded({extended:true}))

app.set("view engine","ejs")

app.use('/', routes)



app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/js', express.static(path.join(__dirname, "assets/js")))

const start = async () => {
    try {
      await connectDB()
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();

