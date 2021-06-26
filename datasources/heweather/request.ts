import { config } from "./config.ts";
import { Daily, RequestParams, ResponseOKV7, ResponseV7 } from "./types.ts";

export async function daily(
  params: RequestParams,
): Promise<ResponseOKV7<Daily>> {
  const urlParams = new URLSearchParams(
    params as unknown as Record<string, string>,
  );
  urlParams.set("key", config.api_key);
  const response = await fetch(
    `https://devapi.qweather.com/v7/weather/3d?${urlParams}`,
  );
  const data: ResponseV7 = await response.json();
  if (data.code !== "200") {
    throw new Error(data.code);
  }
  return data as ResponseOKV7<Daily>;
}
