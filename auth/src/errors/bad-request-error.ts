import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  reason = "Email already regestered";
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
