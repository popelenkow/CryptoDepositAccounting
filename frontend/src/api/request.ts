const apiBaseUrl = 'http://127.0.0.1:8000/';

const jsonHeaders: HeadersInit = { 'Content-Type': 'application/json' };
const textHeaders: HeadersInit = { 'Content-Type': 'text/plain' };

export type RequestOptions = {
  method: 'get' | 'post' | 'put' | 'delete';
  endpoint: string;
  formBody?: FormData;
  textBody?: string;
  jsonBody?: unknown;
};
export const request = async <Result = void>(
  options: RequestOptions,
): Promise<Result> => {
  const { method, endpoint, formBody, textBody, jsonBody } = options;

  const getHeaders = () => {
    if (formBody) return undefined;
    if (textBody) return textHeaders;
    if (jsonBody) return jsonHeaders;
    return undefined;
  };
  const body = formBody ?? textBody ?? JSON.stringify(jsonBody);

  const url = new URL(endpoint, apiBaseUrl);
  const response = await fetch(url, {
    method,
    headers: getHeaders(),
    body,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
