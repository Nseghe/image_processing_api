// const chai = require('chai');
// const sinon = require('sinon');
// const expect = chai.expect;
// const ImagesModel = require('./images.model.js');


// describe('ImageModel', function() {
//   const databaseInitializationService = {
//     getRDSInitializationQueries: () => { return }
//   };
//   const fileProcessingService = {
//     getFileType: () => { return }
//   };
//   const fileStorageService = {};
//   const awsResourcesService = {
//     getMysqlConfig: () => { return },
//     getS3: () => { return }
//   };
//   const uuidv4 = () => { return };
//   const config = {};
//   const mysql = {
//     createConnection: () => { return }
//   };
//   const req = {
//     file: {
//       buffer: undefined,
//       size: 1
//     },
//     body: {
//       description: ""
//     }
//   };
//   const res = {};
//   const data = {
//     key: 'gh.png'
//   };
//   const DISStubValue = {};
//   const mysqlStubValue = {
//     connect: () => { return },
//     query: () => {return resolve({})}
//   };

//   describe('initializeRDS', function() {
//     it('should initialize the RDS', function() {
//       const ARSStubValue = {};
//       const ARSStub = sinon.stub(awsResourcesService,
//         'getMysqlConfig').returns(ARSStubValue);
//       const DISStub = sinon.stub(databaseInitializationService,
//         'getRDSInitializationQueries').returns(DISStubValue);
//       const mysqlStub = sinon.stub(mysql,
//         'createConnection').returns(mysqlStubValue);
//       const connectSpy = sinon.stub(mysqlStubValue, 'connect');
//       const querySpy = sinon.stub(mysqlStubValue, 'query');
//       const imagesModel = new ImagesModel({
//         databaseInitializationService,
//         fileProcessingService,
//         fileStorageService,
//         awsResourcesService,
//         uuidv4,
//         config,
//         mysql
//       });
//       imagesModel.initializeRDS()
//         .then(function(result) {
//           expect(ARSStub.calledOnce);
//           expect(DISStub.calledOnce);
//           expect(mysqlStub.calledOnce);
//           expect(mysqlStub.calledWith(ARSStubValue));
//           expect(connectSpy.calledOnce);
//           expect(querySpy.calledOnce);
//           expect(querySpy.calledWith(DISStubValue));
//           expect(result).to.equal(mysqlStubValue.query());
//         });
//     });
//   })
  
//   describe('uploadImage', function() {
//     it('should upload the image to s3', function() {
//       const ARSStubValue = {
//         upload: () => { return {}}
//       };
//       const FPSSpy = sinon.spy(fileProcessingService, 'getFileType');
//       const ARSStub = sinon.stub(awsResourcesService,
//         'getS3').returns(ARSStubValue);
//       const uploadSpy = sinon.spy(ARSStubValue, 'upload');
//       const imagesModel = new ImagesModel({
//         databaseInitializationService,
//         fileProcessingService,
//         fileStorageService,
//         awsResourcesService,
//         uuidv4,
//         config,
//         mysql
//       });
//       imagesModel.uploadImage(req)
//         .then(function(result) {
//           expect(FPSSpy.calledOnce);
//           expect(ARSStub.calledOnce);
//           expect(uploadSpy.calledOnce);
//           expect(FPSSpy.calledWith(req.file));
//           expect(result).to.equal(ARSStubValue.upload());
//         });
//     });
//   })

//   describe('deleteImage', function() {
//     it('should delete the image from s3', function() {
//       const ARSStubValue = {
//         deleteObject: () => { return {key: ""}}
//       };
//       const ARSStub = sinon.stub(awsResourcesService,
//         'getS3').returns(ARSStubValue);
//       const deleteObjectStub = sinon.stub(ARSStubValue, 'deleteObject');
//       const imagesModel = new ImagesModel({
//         databaseInitializationService,
//         fileProcessingService,
//         fileStorageService,
//         awsResourcesService,
//         uuidv4,
//         config,
//         mysql
//       });
//       imagesModel.deleteImage(data)
//         .then(function(result) {
//           expect(ARSStub.calledOnce);
//           expect(deleteObjectStub.calledOnce);
//           expect(result).to.equal(ARSStubValue.deleteObject());
//         });
//     });
//   })

//   describe('uploadImageDetails', function() {
//     it('should upload the image details to RDS', function() {
//       const ARSStubValue = {};
//       const ARSStub = sinon.stub(awsResourcesService,
//         'getMysqlConfig').returns(ARSStubValue);
//       const FPSSpy = sinon.spy(fileProcessingService, 'getFileType')
//       const mysqlStub = sinon.stub(mysql,
//         'createConnection').returns(mysqlStubValue);
//       const connectSpy = sinon.stub(mysqlStubValue, 'connect');
//       const querySpy = sinon.stub(mysqlStubValue, 'query');
//       const imagesModel = new ImagesModel({
//         databaseInitializationService,
//         fileProcessingService,
//         fileStorageService,
//         awsResourcesService,
//         uuidv4,
//         config,
//         mysql
//       });
//       imagesModel.uploadImageDetails(req, data)
//         .then(function(result) {
//           const querySpyArgs = querySpy.getCall(0).args[0];
//           console.log('\n\nquerySpyArgs: ', querySpyArgs);
//           expect(result).to.be.a('string').that.includes('INSERT');
//           expect(result).to.be.a('string').that.includes('Images');
//           expect(ARSStub.calledOnce);
//           expect(FPSSpy.calledOnce);
//           expect(FPSSpy.calledWith(req.file));
//           expect(mysqlStub.calledOnce);
//           expect(mysqlStub.calledWith(ARSStubValue));
//           expect(connectSpy.calledOnce);
//           expect(querySpy.calledOnce);
//           expect(result).to.equal(mysqlStubValue.query());
//         })
//     });
//   })

// })