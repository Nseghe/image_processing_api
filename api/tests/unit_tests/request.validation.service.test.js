const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const RequestValidationService = require('../../src/images/services/request.validation.service.js');

describe('RequestValidationService', function() {
  const config = {
    'FILE_TYPES': /jpeg|jpg|png/,
    'MAX_FILE_SIZE': 500 * 1024
  }
  let fileProcessingService = {};
  let req = {}
  let res = {
    status: function(code) {
      return {
        send: function(message) {
          return message
      }}
  }}
  const statusSpy = sinon.spy(res, 'status');

  describe('checkFileExists', function() {
    it('should return 400 error if file does not exist', function() {
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      })
      const nextSpy = sinon.spy();
      const result = requestValidationService.checkFileExists(req, res, nextSpy);
      expect(statusSpy.calledWith(400)).to.equal(true);
      expect(result).to.have.property('error');
    })
    it('should call next() if file exists', function() {
      req = {
        file: {originalname: 'image.png'}
      }
      res = {};
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      })
      const nextSpy = sinon.spy();
      requestValidationService.checkFileExists(req, res, nextSpy);
      expect(nextSpy.calledOnce).to.equal(true);
    })
  })

  describe('checkDescriptionExists', function() {
    it('should return 400 error if description does not exist', function() {
      req = {
        body: {}
      }
      res = {
        status: function(code) {
          return {
            send: function(message) {
              return message
          }}
      }};
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      })
      const nextSpy = sinon.spy();
      const result = requestValidationService.checkDescriptionExists(req, res, nextSpy);
      expect(statusSpy.calledWith(400)).to.equal(true);
      expect(result).to.have.property('error');
    })
    it('should call next() if description exists', function() {
      req = {
        body: {description: 'A nice image'}
      }
      res = {};
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      });
      const nextSpy = sinon.spy();
      requestValidationService.checkDescriptionExists(req, res, nextSpy);
      expect(nextSpy.calledOnce).to.equal(true);
    })
  })

  describe('checkFileType', function() {
    it('should return 400 error if invalid mimetype', function() {
      fileProcessingService = {
        getFileType: function(file) { return 'png' }
      };
      req = {
        file: {mimetype: 'csv'}
      };
      res = {
        status: function(code) {
          return {
            send: function(message) {
              return message
          }}
      }};
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      });
      const nextSpy = sinon.spy();
      const result = requestValidationService.checkFileType(req, res, nextSpy);
      expect(statusSpy.calledWith(400)).to.equal(true);
      expect(result).to.have.property('error');
    })
    it('should return 400 error if invalid filetype', function() {
      fileProcessingService = {
        getFileType: function(file) { return 'csv' }
      };
      req = {
        file: {mimetype: 'png'}
      };
      res = {
        status: function(code) {
          return {
            send: function(message) {
              return message
          }}
      }}
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      });
      const nextSpy = sinon.spy();
      const result = requestValidationService.checkFileType(req, res, nextSpy);
      expect(statusSpy.calledWith(400)).to.equal(true);
      expect(result).to.have.property('error');
    })
    it('should call next() if valid filetype and mimetype', function() {
      fileProcessingService = {
        getFileType: function(file) { return 'png' }
      };
      req = {
        file: {
          mimetype: 'png'
        }
      };
      res = {};
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      });
      const nextSpy = sinon.spy();
      requestValidationService.checkFileType(req, res, nextSpy);
      expect(nextSpy.calledOnce).to.equal(true);
    })
  })

  describe('checkFileSize', function() {
    it('should return 400 error if invalid file size', function() {
      req = {
        file: {size: 1000*1024}
      };
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      });
      res = {
        status: function(code) {
          return {
            send: function(message) {
              return message
          }}
      }}
      const nextSpy = sinon.spy();
      const result = requestValidationService.checkFileSize(req, res, nextSpy);
      expect(statusSpy.calledWith(400)).to.equal(true);
      expect(result).to.have.property('error');
    })
    it('should call next() if valid file size', function() {
      req = {
        file: {size: 100*1024}
      };
      res = {};
      const requestValidationService = new RequestValidationService({
        config,
        fileProcessingService
      });
      const nextSpy = sinon.spy();
      requestValidationService.checkFileSize(req, res, nextSpy);
      expect(nextSpy.calledOnce).to.equal(true);
    })
  })

});