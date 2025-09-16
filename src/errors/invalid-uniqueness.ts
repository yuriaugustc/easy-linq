  export class InvalidUniquenessError extends Error {
    constructor(message?: string) {
      message = message ?? 'The element has not uniqueness on the list.';
      super(message);
      this.name = 'Invalid uniqueness';
    }
  }