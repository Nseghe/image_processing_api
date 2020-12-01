const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const ImagesController = require('../../src/images/controllers/images.controller.js');

describe('ImagesController', function() {
  const req = {};
  const send = function(results) {
    return results
  }
  const status = function(code) {
    return {
      send: send
    }
  }
  const res = {
    status: status
  }
  describe('upload', function() {
    it('should call uploadImage and uploadImageDetails', function() {
      const imagesModel = {
        uploadImage: function(request, response) {
          return Promise.resolve({key: 'key'});
        },
        uploadImageDetails: function(request, response, data) { 
          return Promise.resolve(data);
        }
      };
      const uploadImageSpy = sinon.spy(imagesModel, 'uploadImage');
      const uploadImageDetailsSpy = sinon.spy(imagesModel, 'uploadImageDetails');
      const imagesController = new ImagesController({
        imagesModel
      });
      const statusSpy = sinon.spy(status);
      const sendSpy = sinon.spy(send);
      imagesController.upload(req, res);
      expect(uploadImageSpy.calledOnce);
      expect(uploadImageDetailsSpy.calledOnce);
      expect(statusSpy.calledOnce);
      expect(statusSpy.calledWith(201));
      expect(sendSpy.calledOnce);
      expect(sendSpy.calledWith({key: 'key'}));
    })
    it('should call uploadImage and deleteImage', function() {
      const imagesModel = {
        uploadImage: function(request, response) {
          return Promise.resolve({key: 'key'});
        },
        deleteImage: function(request, response) {
          return Promise.resolve({key: 'key'});
        },
        uploadImageDetails: function(request, response, data) { 
          console.log('uploadImageDetails function')
          return Promise.reject({error: 'error'});
        }
      }
      const uploadImageSpy = sinon.spy(imagesModel, 'uploadImage');
      const deleteImageSpy = sinon.spy(imagesModel, 'deleteImage');
      const uploadImageDetailsSpy = sinon.spy(imagesModel, 'uploadImageDetails');
      const imagesController = new ImagesController({
        imagesModel
      })
      const statusSpy = sinon.spy(status);
      const sendSpy = sinon.spy(send);
      imagesController.upload(req, res);
      expect(uploadImageSpy.calledOnce);
      expect(deleteImageSpy.calledOnce);
      expect(uploadImageDetailsSpy.calledOnce);
      expect(statusSpy.calledOnce);
      expect(statusSpy.calledWith(200));
      expect(sendSpy.calledOnce);
      expect(sendSpy.calledWith({error: 'error'}));
    })
    it('should call uploadImage and return 500 status error', function() {
      const imagesModel = {
        uploadImage: function(request, response) {
          return Promise.reject({error: 'error'});
        }
      }
      const uploadImageSpy = sinon.spy(imagesModel, 'uploadImage');
      const imagesController = new ImagesController({
        imagesModel
      })
      const statusSpy = sinon.spy(status);
      const sendSpy = sinon.spy(send);
      imagesController.upload(req, res);
      expect(uploadImageSpy.calledOnce);
      expect(statusSpy.calledOnce);
      expect(statusSpy.calledWith(200));
      expect(sendSpy.calledOnce);
      expect(sendSpy.calledWith({error: 'error'}));
    })
  })
})
