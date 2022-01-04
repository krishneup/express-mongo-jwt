import express, { Request, Response, NextFunction } from 'express';
import config from './utils/config';
const cors = require('cors');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import { connect } from './utils/db';
import UserRouter from './resources/user/user.router'
import authRouter from './resources/auth/auth.router'


var app:any = express();


var helmet = require('helmet')
app.use(helmet())

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// define user routes
app.use('/api/user', UserRouter);

// define auth routes
app.use('/api/auth', authRouter);



const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
     console.log(`working on port ${config.port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

start()