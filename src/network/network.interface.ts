export interface NetworkResponse<T = any> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

export interface HttpResponse<T> extends Response {
  parsedBody?: NetworkResponse<T>;
}
