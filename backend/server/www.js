const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('../routers/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors')
app.use(cors())
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterorgnizer.x5aho.mongodb.net/organizers?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const publicPath = path.resolve(__dirname, '..', 'build');
app.use(express.static(publicPath))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
http.createServer(app).listen(process.env.PORT || 5010)
app.use(logger('dev'));

app.use(cookieParser());
app.use('/', indexRouter);
