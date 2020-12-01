class imagesRouter {
  constructor({
    app,
    fileStorageService,
    requestValidationService,
    imagesController
  }) {
    this.app = app;
    this.fileStorageService = fileStorageService;
    this.requestValidationService = requestValidationService;
    this.imagesController = imagesController;
    this.routesConfig = this.routesConfig.bind(this);
  }
  
  routesConfig() {
    this.app.post('/api/images',
      this.fileStorageService.getMulterUpload(), [
      this.requestValidationService.checkFileExists,
      this.requestValidationService.checkDescriptionExists,
      this.requestValidationService.checkFileType,
      this.requestValidationService.checkFileSize,
      this.imagesController.upload
    ]);
  }

}

module.exports = imagesRouter
