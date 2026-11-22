export class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = String(this.statusCode).startsWith("4") ? "fail" : "Error";
    this.isProductionError = true;
  }
}
