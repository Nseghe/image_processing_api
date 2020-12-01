class fileProcessingService {
  constructor() {
    this.getFileType = this.getFileType.bind(this)
  }

  getFileType(file) {
    const filename = file.originalname.split(".");
    const fileType = filename[filename.length - 1].toLowerCase();
    return fileType;
  }
}

module.exports = fileProcessingService