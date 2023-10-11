const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const configSession = require('./configSession');

const ssr = require('../middlewares/ssr');
const getUser = require('../middlewares/getUser');

const serverConfig = (app) => {
  app.use(cookieParser());
  app.use(fileUpload());
  app.use(session(configSession));

  app.use(getUser);
  app.use(ssr);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '../photos')));
  app.use(express.static(path.join(__dirname, '../photosPost')));
  app.use(express.static(path.join(__dirname, '../../client/build')));
};

module.exports = serverConfig;
