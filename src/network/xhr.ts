import options from '../core/options';
import type { HttpResponse, NetworkResponse } from './network.interface';

const baseURL = 'https://core.human-id.org/v0.0.3/mobile';

export default async function xhr<T, R>(
  url: string,
  params: T
): Promise<NetworkResponse<R>> {
  url = baseURL + url;
  const xhrOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'client-secret': options.clientSecret,
      'client-id': options.clientId,
    },
    body: JSON.stringify(params),
  };

  const response: HttpResponse<R> = await fetch(url, xhrOptions);

  try {
    response.parsedBody = await response.json();
  } catch {}

  if (!response.ok && response.parsedBody) {
    throw {
      message: response.parsedBody.message,
      code: response.parsedBody.code,
    };
  }

  return response.parsedBody!;
}
