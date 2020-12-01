class imagesModel {
  constructor({
    databaseInitializationService,
    fileProcessingService,
    fileStorageService,
    awsResourcesService,
    uuidv4,
    config,
    mysql
  }) {
    this.databaseInitializationService = databaseInitializationService;
    this.fileProcessingService = fileProcessingService;
    this.fileStorageService = fileStorageService;
    this.awsResourcesService = awsResourcesService;
    this.uuidv4 = uuidv4;
    this.config = config;
    this.mysql = mysql;
    this.initializeRDS = this.initializeRDS.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.uploadImageDetails = this.uploadImageDetails.bind(this);
  }

  initializeRDS() {
    const mysqlConfig = this.awsResourcesService.getMysqlConfig();
    const createTableQuery = this.databaseInitializationService.getRDSInitializationQueries();
    const connection = new this.mysql.createConnection(mysqlConfig);
    return new Promise(function(resolve, reject) {
      connection.connect();
      connection.query(createTableQuery, function(error, results, fields) {
        if (error) { return reject(error);
        } else { return resolve(results) }
      });
    })
  }

  uploadImage(req) {
    const objectParams = {
      Bucket: this.config.AWS_BUCKET_NAME,
      Key: `${this.uuidv4()}.${this.fileProcessingService.getFileType(req.file)}`,
      Body: req.file.buffer
    };
    const s3 = this.awsResourcesService.getS3();
    return new Promise(function(resolve, reject) {
      s3.upload(objectParams, function(err, data) {
        if (err) { return reject(err);
        } else { return resolve(data) }
      });
    })
  }

  deleteImage(s3Data) {
    const objectParams = {
      Bucket: this.config.AWS_BUCKET_NAME,
      Key: s3Data.key,
    }
    const s3 = this.awsResourcesService.getS3();
    return new Promise(function(resolve, reject) {
      s3.deleteObject(objectParams, function(err, data) {
        if (err) { return reject(err);
        } else { return resolve(data) }
      });
    })
  }

  uploadImageDetails(req, data) {
    const mysqlConfig = this.awsResourcesService.getMysqlConfig();
    const query = `insert into Images
                  (id, description, filetype, fileSize)
                  values(?, ?, ?, ?)`;
    const params = [
      data.key.split('.')[0],
      req.body.description,
      this.fileProcessingService.getFileType(req.file),
      req.file.size
    ]
    const connection = new this.mysql.createConnection(mysqlConfig);
    return new Promise(function(resolve, reject) {
      connection.connect();
      connection.query(query, params, function(error, results, fields) {
        if (error) { return reject({error, data});
        } else { 
          return resolve({results, fields}) }
      });
    })
  }

}

module.exports = imagesModel
