'use strict'

/**
 * FacadeBuilder provides a structure for communications between
 * controllers and facades.
 */
class FacadeBuilder {
  constructor(payload) {
    this.payload = payload;
    this.responseData = {
      status: null,
      message: '',
      data: null,
    };
  }

  setResponseData(data) {
    this.responseData.data = data;
  }

  setStatus(status) {
    this.responseData.status = status;
  }

  setMessage(message) {
    this.responseData.message = message;
  }

  build() {
    return this.responseData;
  }
}
module.exports = FacadeBuilder;