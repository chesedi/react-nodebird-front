const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

app.use(morgan('dev'));
// cors 설정
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json()); // FE json 형식 데이터를 처리해줌
app.use(express.urlencoded({ extended: true})); // FE form-submit 방식 데이터 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('hello express')
});

app.get('/', (req, res) => {
  res.send('hello api')
});

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중!');
});