require('dotenv').config();
require('../database/database').connect()
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(logger('dev'));
app.use((err, req, res, next) => {
  createErrorResponse(err, res);
});
app.use(cookieParser())

// IMPORT YOUR ROUTE
const moduleRoute = require('./modules');
const { createErrorResponse } = require('./utils/response');

app.use('/api',moduleRoute);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
})