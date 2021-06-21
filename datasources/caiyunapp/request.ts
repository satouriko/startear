import { config } from "./config.ts";
import { uuid } from "../../dep.ts";
import {
  Daily,
  Hourly,
  Location,
  Minutely,
  Realtime,
  ResponseFailed,
  ResponseOK,
  Result,
  Weather,
} from "./types.ts";

interface RequestParams {
  endpoint?: string;
  location: Location;
}

export async function request<T extends keyof Result>(
  params: RequestParams,
): Promise<ResponseOK<T>> {
  const response = await fetch(
    `https://api.caiyunapp.com/v2.5/${config.api_key ||
      0}/${params.location}/${params.endpoint ?? "weather"}.json`,
    {
      headers: {
        Host: "api.caiyunapp.com",
        "app-version": "6.1.4",
        app_name: "weather",
        "device-id": uuid.generate().toUpperCase(),
        "app-name": "weather",
        "Accept-Language":
          "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hans;q=0.8, en;q=0.7, ja-CN;q=0.6",
        "os-type": "ios_free",
        Accept: "application/json",
        "User-Agent": "ColorfulClouds/6.1.4 (iPhone; iOS 14.6; Scale/3.00)",
        lang: "zh_CN",
        "os-version": "14.6",
        Cookie: "RANGERS_WEB_ID=user",
      },
    },
  );
  const data: ResponseFailed | ResponseOK<T> = await response.json();
  if (data.status !== "ok") {
    throw new Error(data.error);
  }
  return data;
}

export const realtime = (params: RequestParams) =>
  request<Realtime>({ ...params, endpoint: "realtime" });
export const daily = (params: RequestParams) =>
  request<Daily>({ ...params, endpoint: "daily" });
export const minutely = (params: RequestParams) =>
  request<Minutely>({ ...params, endpoint: "minutely" });
export const hourly = (params: RequestParams) =>
  request<Hourly>({ ...params, endpoint: "hourly" });
export const weather = (params: RequestParams) =>
  request<Weather>({ ...params, endpoint: "weather" });
