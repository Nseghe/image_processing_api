const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const FileProcessingService = require('../../src/images/services/file.processing.service.js');

describe('FileProcessingService', function() {
  describe('getFileType', function() {
    it('should return file extension given file name', function() {
      const file = {
        originalname: 'image.png'
      }
      const fileProcessingService = new FileProcessingService();
      const result = fileProcessingService.getFileType(file);
      expect(result).to.deep.equal('png');
    })
  })
});
