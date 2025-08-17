export class ResponseService {
  static formatResponse<T>(
    ok: boolean,
    data: T | null,
    error: { code: string; message: string } | null
  ) {
    return { ok, data, error }
  }
}
