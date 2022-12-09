const express = require('express');

const app = express();

const userV1Routes = require('./user/routes/v1-user-route');

app.use('/v1/user',userV1Routes);

module.exports = app