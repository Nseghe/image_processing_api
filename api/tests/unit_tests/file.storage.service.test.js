const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const FileStorageService = require('../../src/images/services/file.storage.service.js');

describe('FileStorageService', function() {
  describe('getMulterUpload', function() {
    it('should create multer upload object', function() {
      const config = {};
      multer.memoryStorage = function(memoryObject) {
        return memoryObject
      };
      const req = sinon.spy();
      const res = sinon.spy();
      const next = sinon.spy();
      function multer(multerObject) {
        return {
          single: function(image) { return 'image' }
        }
      }
      const fileStorageService = new FileStorageService({
        config,
        multer
      });
      const result = fileStorageService.getMulterUpload(req, res, next);
      expect(result).to.deep.equal('image');
    })
  })

});
