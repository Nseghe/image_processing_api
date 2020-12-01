const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const initialize = require('../../src/initialize.app.js');

describe('initialize', function() {
  it('should initialize RDS and configure routes', function() {
    const app = {
      use: function() { return },
      listen: sinon.spy()
    }
    const bodyParser = {
      json: function() { return }
    }
    const imagesModel = {
      initializeRDS: function() {
        return Promise.resolve('Images Table Created')
    }}
    const imagesRouter = {
      routesConfig: function() { 
        console.log('routesConfig function');
        return
      }
    }
    const useSpy = sinon.spy(app, 'use');
    const initializeRDSSpy = sinon.spy(imagesModel, 'initializeRDS');
    const routesConfigSpy = sinon.spy(imagesRouter, 'routesConfig');
    initialize({
      app,
      bodyParser,
      imagesModel,
      imagesRouter
    })
    expect(useSpy.calledTwice);
    expect(app.listen.calledOnce);
    expect(initializeRDSSpy.calledOnce);
    expect(routesConfigSpy.calledOnce);
  })
})