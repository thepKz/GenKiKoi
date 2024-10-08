
export class ValidationError extends Error {
    errors: any;
  
    constructor(errors: any) {
      super("Validation Error");
      this.name = "ValidationError";
      this.errors = errors;
    }
  }