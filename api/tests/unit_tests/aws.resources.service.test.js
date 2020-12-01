const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const AWSResourcesService = require('../../src/images/services/aws.resources.service.js');

describe('AWSResourcesService', function() {
  const config = {
    AWS_RDS_END_POINT_MYSQL: 'endpoint',
    AWS_RDS_USERNAME_MYSQL: 'username',
    AWS_RDS_PASSWORD_MYSQL: 'password',
    AWS_RDS_PORT_MYSQL: 'port',
    AWS_RDS_MYSQL_DATABASE_NAME: 'database',
    AWS_RDS_TIMEOUT_MYSQL: 'timeout'
  }
  const aws = {
    config: { credentials: ''},
    SharedIniFileCredentials: function(profile) { return 'credentials' },
    S3: function() { 
      return {'S3 object': 'S3 object'};
    }
  }
  
  describe('getS3', function() {
    it('should return an S3 object', function() {
      const S3Spy = sinon.spy(aws, 'S3');
      const SharedIniFileCredentialsSpy = sinon.spy(aws, 'SharedIniFileCredentials');
      const awsResourcesService = new AWSResourcesService({
        config,
        aws
      });
      const result = awsResourcesService.getS3();
      expect(SharedIniFileCredentialsSpy.calledOnce).to.equal(true);
      expect(S3Spy.calledOnce).to.equal(true);
      expect(result).to.deep.equal(aws.S3());
    })
  })

  describe('getMysqlConfig', function() {
    it('should return a mysql config object', function() {
      const awsResourcesService = new AWSResourcesService({
        config,
        aws
      });
      const result = awsResourcesService.getMysqlConfig();
      expect(result).to.have.property('host').that.equals('endpoint');
      expect(result).to.have.property('user').that.equals('username');
      expect(result).to.have.property('password').that.equals('password');
      expect(result).to.have.property('port').that.equals('port');
      expect(result).to.have.property('database').that.equals('database');
      expect(result).to.have.property('connectTimeout').that.equals('timeout');
    })
  })

});
