class requestValidationService {
  constructor({
    config,
    fileProcessingService
  }) {
    this.config = config;
    this.fileProcessingService = fileProcessingService;
    this.checkFileExists = this.checkFileExists.bind(this);
    this.checkDescriptionExists = this.checkDescriptionExists.bind(this);
    this.checkFileType = this.checkFileType.bind(this);
    this.checkFileSize = this.checkFileSize.bind(this);
  }

  checkFileExists(req, res, next) {
    if (req.file) {
      return next();
    } else {
      return res.status(400).send({error: 'No file found. Please upload a image file.'});
    }
  }

  checkDescriptionExists(req, res, next) {
    if (req.body.description) {
      return next();
    } else {
      return res.status(400).send({error: 'No image description found. Please add an image description'});
    }
  }

  checkFileType(req, res, next) {
    const fileTypeTest = this.config.FILE_TYPES.test(this.fileProcessingService.getFileType(req.file));
    const mimeTypeTest = this.config.FILE_TYPES.test(req.file.mimetype);
    if (mimeTypeTest && fileTypeTest){
      return next();
    } else {
      return res.status(400).send({error: 'Invalid file type. Only png and jpeg files allowed.'});
    }
  }

  checkFileSize(req, res, next) {
    if (req.file.size > this.config.MAX_FILE_SIZE) {
      return res.status(400).send({error: `File size too large. File must not exceed ${this.config.MAX_FILE_SIZE/1024}kb.`});
    } else {
      return next();
    }
  }
  
}

module.exports = requestValidationService;