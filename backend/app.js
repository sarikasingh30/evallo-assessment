const express = require("express");
const app = express();
const dotEnv = require("dotenv");
// const ejs = require('ejs');
const cors = require("cors");
const path = require("path");
// const router=require("./routes/tasks")
const passport = require("passport");
const session = require("express-session");
const authRouter = require("./src/controllers/googleAuth");
const connectDB = require("./src/config/db");
const Meeting = require("./src/models/event.model");

app.use(
  cors({
    origin: "http://localhost:3000", // React app's origin
    credentials: true,
  })
);

app.use(express.json());

// dotenv Config
dotEnv.config({ path: "" });

// Connect to DB
connectDB();

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

app.get('/api/config', (req, res) => {
  res.json({
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
  });
});

app.use("/auth/google", authRouter);

app.post("/meetings", async (req, res) => {
  const { id,title, start, end, allDay, userId } = req.body;

  if (!id||!title || !start || !end || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newMeeting = new Meeting({
      id,
      title,
      start,
      end,
      allDay,
      userId: userId
    });

    await newMeeting.save();
    res.status(201).send("Scheduled");
  } catch (error) {
    res.status(500).json({ error: 'Failed to create meeting' });
  }
});

port = 5000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
