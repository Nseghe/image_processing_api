const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const aws = require('aws-sdk');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const config = require('./config/env.config.js');
const port = config.API_PORT;
const DatabaseInitializationService = require('./db/init.sql.js');
const AWSResourcesService = require('./images/services/aws.resources.service.js');
const FileStorageService = require('./images/services/file.storage.service.js');
const FileProcessingService = require('./images/services/file.processing.service.js');
const RequestValidationService = require('./images/services/request.validation.service.js');
const ImagesModel = require('./images/models/images.model.js');
const ImagesController = require('./images/controllers/images.controller.js');
const ImagesRouter = require('./images/routes.config');
const initialize = require('./initialize.app.js');

const app = express();
app.disable("x-powered-by");
const databaseInitializationService = new DatabaseInitializationService({
  config
});
const fileProcessingService = new FileProcessingService();
const requestValidationService = new RequestValidationService({
  fileProcessingService,
  config
});
const awsResourcesService = new AWSResourcesService({
  config,
  aws
})
const fileStorageService = new FileStorageService({
  config,
  multer,
});
const imagesModel = new ImagesModel({
  databaseInitializationService,
  fileProcessingService,
  fileStorageService,
  awsResourcesService,
  config,
  uuidv4,
  mysql
});
const imagesController = new ImagesController({
  imagesModel
});
const imagesRouter = new ImagesRouter({
  app,
  fileStorageService,
  requestValidationService,
  imagesController
});

const server = initialize({
  app,
  bodyParser, 
  imagesModel, 
  imagesRouter
});

server.listen(port, function () {
  console.log('server listening at port %s', port);
});

module.exports = server