const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const winston = require('winston');
const cookieParser = require('cookie-parser');


const editroutes = require('./routes/edit');
const imageroutes = require('./routes/image');
const loginroutes = require('./routes/login');
const postroutes = require('./routes/post');
const postsroutes = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'https://blog-tau-ashy.vercel.app'], credentials: true }));
app.use(helmet());
app.use(cookieParser());

app.use('/edit', editroutes); 
app.use('/image', imageroutes); 
app.use('/login', loginroutes); 
app.use('/post', postroutes); 
app.use('/posts', postsroutes); 

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//   ],
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
