const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const DatabaseInitializationService = require('../../src/db/init.sql.js');

describe('DatabaseInitializationService', function() {
  const config = {};
  describe('getRDSInitializationQueries', function() {
    it('should return query to create table', function() {
      const databaseInitializationService = new DatabaseInitializationService({
        config
      })
      const result = databaseInitializationService.getRDSInitializationQueries();
      expect(result).to.be.a('string').that.includes('CREATE TABLE');
      expect(result).to.be.a('string').that.includes('Images');
    })
  })
})