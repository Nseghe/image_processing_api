class fileStorageService {
  constructor({
    config,
    multer
  }) {
    this.config = config;
    this.multer = multer;
    this.getMulterUpload = this.getMulterUpload.bind(this);
  }

  getMulterUpload(req, res, next) {
    const storage = this.multer.memoryStorage({
      destination: function(request, file, callback) {
          callback(null, '');
      }
    });
    const upload = this.multer({
      storage: storage
    }).single('image');
    return upload
  }
}

module.exports = fileStorageService;
