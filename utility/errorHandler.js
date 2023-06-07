class errorHandler extends Error {
  constructor(statusCode, message, responsePayload) {
    super(message);
    this.statusCode = statusCode;
    this.responsePayload = responsePayload;
  }
}

export default errorHandler;
