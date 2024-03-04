const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('UserController', function() {
  let userFacadeMock;
  let FacadeBuilderMock;
  let get_user;

  beforeEach(function() {
    userFacadeMock = {
      get_user: sinon.stub().resolves()
    };

    FacadeBuilderMock = function() {
      return {
        build: sinon.stub().returns({ some: 'response' })
      };
    };

    const userController = proxyquire('../api/controllers/userCtr', {
      '../../facades/userFacade': userFacadeMock,
      '../../util/FacadeBuilder': FacadeBuilderMock
    });

    get_user = userController.get_user;
  });

  it('should respond with status 200 for get_user', async function() {
    const req = {
      params: { userId: '1' },
      msg_locale: 'test message'
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    const next = sinon.stub();

    await get_user(req, res, next);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
  });

});
