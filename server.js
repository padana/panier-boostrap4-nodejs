const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


app.set("views", './views')
app.set("view engine", 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))

 /******** Route ******/

const shopRoutes = require('./routes/shop')
app.use('/', shopRoutes)

const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes)


 
app.listen(port, (req, res)=>{
    console.log("mon port marche bien: ", port);
    
})