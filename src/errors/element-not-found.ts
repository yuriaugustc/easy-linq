  export class ElementNotFoundError extends Error {
    constructor(message?: string) {
      message = message ?? 'The element was not found on the list.';
      super(message);
      this.name = 'Element not found';
    }
  }