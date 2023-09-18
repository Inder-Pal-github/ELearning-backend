class ErrorHandler extends Error {
  statusCode: Number;
  constructor(message: string, statusCode:Number) {
    super(message); // super keyword is used to call the constructor of parent class(Error in this case).
    // It passes the message argument to the error class constructor, which sets the error messsage for the instance
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;