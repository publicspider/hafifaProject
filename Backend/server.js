const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const express=require("express");
const app=express();
const session = require("express-session");
// const collection=require('./mongo')
const passport = require('./src/config/passport-config.js');
app.set("view engine", "ejs");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(
    session({
      secret:"DVIR",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
  
app.use(bodyParser.json());
// module.exports = router ;
const port=5000;
const dburl="mongodb://127.0.0.1:27017/SummeryProject";
    

mongoose.connect(dburl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>
console.log("MongoDB connection successfully")
)
.catch((err) => console.log(err));

app.use(passport.initialize());
  app.use(passport.session());

const users = require('./src/routes/auth');
app.use('/api/users', users);
const cars = require('./src/routes/cars');

app.use('/api/cars', cars);




app.listen(port, ()=>{
  console.log(`port ${port}`)

})

