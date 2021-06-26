import { config } from "./config.ts";
import { uuid } from "../../dep.ts";
import {
  Daily,
  Hourly,
  Minutely,
  Places,
  Realtime,
  RequestV20Params,
  RequestV25Params,
  ResponseFailed,
  ResponseOKV20,
  ResponseOKV25,
  ResultV20,
  ResultV25,
  Weather,
} from "./types.ts";

const makeHeaders = () => ({
  Host: "api.caiyunapp.com",
  "app-version": "6.1.4",
  app_name: "weather",
  "device-id": uuid.generate().toUpperCase(),
  "app-name": "weather",
  "Accept-Language":
    "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hans;q=0.8, en;q=0.7, ja-CN;q=0.6",
  "os-type": "ios_free",
  Accept: "application/json",
  "User-Agent": "ColorfulClouds/6.1.5 (iPhone; iOS 14.6; Scale/3.00)",
  lang: "zh_CN",
  "os-version": "14.6",
  Cookie: "RANGERS_WEB_ID=user",
});

export async function requestV25<T extends keyof ResultV25>(
  params: RequestV25Params,
): Promise<ResponseOKV25<T>> {
  const response = await fetch(
    `https://api.caiyunapp.com/v2.5/${config.api_key ||
      0}/${params.location}/${params.endpoint ?? "weather"}.json`,
    { headers: makeHeaders() },
  );
  const data: ResponseFailed | ResponseOKV25<T> = await response.json();
  if (data.status !== "ok") {
    throw new Error(data.error);
  }
  return data;
}

export async function requestV20<T extends keyof ResultV20>(
  params: RequestV20Params,
): Promise<ResponseOKV20<T>> {
  const urlParams = new URLSearchParams(
    params as unknown as Record<string, string>,
  );
  urlParams.set("token", config.api_key);
  const response = await fetch(
    `https://api.caiyunapp.com/v2/${params.endpoint ?? "weather"}?${urlParams}`,
    { headers: makeHeaders() },
  );
  const data: ResponseFailed | ResponseOKV20<T> = await response.json();
  if (data.status !== "ok") {
    throw new Error(data.error);
  }
  return data;
}

export const realtime = (params: RequestV25Params) =>
  requestV25<Realtime>({ ...params, endpoint: "realtime" });
export const daily = (params: RequestV25Params) =>
  requestV25<Daily>({ ...params, endpoint: "daily" });
export const minutely = (params: RequestV25Params) =>
  requestV25<Minutely>({ ...params, endpoint: "minutely" });
export const hourly = (params: RequestV25Params) =>
  requestV25<Hourly>({ ...params, endpoint: "hourly" });
export const weather = (params: RequestV25Params) =>
  requestV25<Weather>({ ...params, endpoint: "weather" });
export const places = (params: RequestV20Params) =>
  requestV20<Places>({ ...params, endpoint: "place" });
