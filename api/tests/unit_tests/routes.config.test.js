const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const ImagesRouter = require('../../src/images/routes.config.js');

describe('ImagesRouter', function() {
  const app = {
    post: function(path, uploadObject, functionArray) {
      for (let i = 0; i < functionArray.length; i++) {
        functionArray[i]();
      }
    }
  };
  const fileStorageService = {
    getMulterUpload: function() { return }
  };
  const requestValidationService = {
    checkFileExists: function() { return },
    checkDescriptionExists: function() { return },
    checkFileType: function() { return },
    checkFileSize: function() { return }
  };
  const imagesController = {
    upload: function() { return }
  }

  describe('app.post', function() {
    it('should get multer upload object and validate request', function() {
      const getMulterUploadSpy = sinon.spy(fileStorageService, 'getMulterUpload');
      const checkFileExistsSpy = sinon.spy(requestValidationService, 'checkFileExists');
      const checkDescriptionExistsSpy = sinon.spy(requestValidationService, 'checkDescriptionExists');
      const checkFileTypeSpy = sinon.spy(requestValidationService, 'checkFileType');
      const checkFileSizeSpy = sinon.spy(requestValidationService, 'checkFileSize');
      const uploadSpy = sinon.spy(imagesController, 'upload');
      const imagesRouter = new ImagesRouter({
        app,
        fileStorageService,
        requestValidationService,
        imagesController
      })
      imagesRouter.routesConfig();
      expect(getMulterUploadSpy.calledOnce).to.equal(true);
      expect(checkFileExistsSpy.calledOnce).to.equal(true);
      expect(checkDescriptionExistsSpy.calledOnce).to.equal(true);
      expect(checkFileTypeSpy.calledOnce).to.equal(true);
      expect(checkFileSizeSpy.calledOnce).to.equal(true);
      expect(uploadSpy.calledOnce).to.equal(true);
    })
  })

});
