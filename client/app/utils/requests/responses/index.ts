export interface BaseResponse<T> {
  ok: boolean;
  data: T | null;
  error: { code: string; message: string } | null;
}
