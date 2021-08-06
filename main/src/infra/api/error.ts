class BaseError extends Error {
  constructor(e?: string) {
    super(e)
    this.name = new.target.name
  }
}

/**
 * 404
 */
export class PageNotFoundError extends BaseError {
  constructor(public statusCode: number, e?: string) {
    super(e)
  }
}

/**
 * 500
 */
export class InternalServerError extends BaseError {
  constructor(public statusCode: number, e?: string) {
    super(e)
  }
}
