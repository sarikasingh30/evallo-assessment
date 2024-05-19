const express=require("express")
const app=express()
const dotEnv=require("dotenv")
// const ejs = require('ejs');
const cors=require("cors")
const path=require("path")
// const router=require("./routes/tasks")
const passport=require("passport")
const session = require('express-session')
const authRouter=require("./src/controllers/googleAuth")
const connectDB = require("./src/config/db")

app.use(cors({
  origin: 'http://localhost:3000', // React app's origin
  credentials: true
}));

app.use(express.json());

// dotenv Config
dotEnv.config({path: "" })

// Connect to DB
connectDB()



app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


// app.get('/', (req, res) => {
//   res.render('auth');
// });

app.use('/auth/google', authRouter);



port=5000
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})