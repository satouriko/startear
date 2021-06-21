export interface ResponseOK<T extends keyof Result> {
  status: "ok";
  "api_version": string;
  "api_status": string;
  lang: string;
  unit: string;
  tzshift: number;
  timezone: string;
  "server_time": number;
  location: [number, number];
  result: Pick<Result, T> & { primary: number };
}

export type Realtime = "realtime";
export type Minutely = "minutely" | "forecast_keypoint";
export type Hourly = "hourly" | "forecast_keypoint";
export type Daily = "daily";
export type Weather = Realtime | Minutely | Hourly | Daily;

export interface Result {
  realtime: {
    status: "ok";
    temperature: number;
    humidity: number;
    cloudrate: number;
    skycon: string;
    visibility: number;
    dswrf: number;
    wind: Wind;
    pressure: number;
    "apparent_temperature": number;
    precipitation: {
      local: {
        status: "ok";
        datasource: string;
        intensity: number;
      };
      nearest: {
        status: "ok";
        distance: number;
        intensity: number;
      };
    };
    "air_quality": {
      pm25: number;
      pm10: number;
      o3: number;
      so2: number;
      no2: number;
      co: number;
      aqi: AQI;
      description: AQIDesc;
    };
    "life_index": {
      ultraviolet: LifeIndex;
      comfort: LifeIndex;
    };
  };
  daily: {
    status: "ok";
    astro: Astro[];
    precipitation: DailyVal<number>[];
    temperature: DailyVal<number>[];
    wind: DailyWind[];
    humidity: DailyVal<number>[];
    cloudrate: DailyVal<number>[];
    pressure: DailyVal<number>[];
    visibility: DailyVal<number>[];
    dswrf: DailyVal<number>[];
    "air_quality": {
      aqi: DailyVal<AQI>[];
      pm25: DailyVal<number>[];
    };
    skycon: DailySkycon[];
    "skycon_08h_20h": DailySkycon[];
    "skycon_20h_32h": DailySkycon[];
    "life_index": {
      ultraviolet: DailyLifeIndex[];
      carWashing: DailyLifeIndex[];
      dressing: DailyLifeIndex[];
      comfort: DailyLifeIndex[];
      coldRisk: DailyLifeIndex[];
    };
  };
  minutely: {
    status: "ok";
    datasource: string;
    "precipitation_2h": number[];
    precipitation: number[];
    probability: number[];
    description: string;
  };
  hourly: {
    status: "ok";
    precipitation: HourlyVal<number>[];
    temperature: HourlyVal<number>[];
    wind: HourlyVal<Wind>[];
    humidity: HourlyVal<number>[];
    cloudrate: HourlyVal<number>[];
    pressure: HourlyVal<number>[];
    visibility: HourlyVal<number>[];
    dswrf: HourlyVal<number>[];
    "air_quality": {
      aqi: HourlyVal<AQI>[];
      pm25: HourlyVal<number>[];
    };
    skycon: HourlySkycon[];
    description: string;
  };
  "forecast_keypoint": string;
}

export interface ResponseFailed {
  status: "failed";
  error: string;
  "api_version": string;
}

export interface Astro {
  date: string;
  sunrise: { time: string };
  sunset: { time: string };
}

export interface DailyVal<T> {
  date: string;
  max: T;
  min: T;
  avg: T;
}

export interface HourlyVal<T> {
  datetime: string;
  value: T;
}

export interface Wind {
  speed: number;
  direction: number;
}

export interface HourlyWind extends Wind {
  datetime: string;
}
export type DailyWind = DailyVal<Wind>;

export interface AQI {
  chn: number;
  usa: number;
}

export interface AQIDesc {
  chn: string;
  usa: string;
}

export interface DailySkycon {
  date: string;
  value: string;
}
export type HourlySkycon = HourlyVal<string>;

export interface LifeIndex {
  index: string;
  desc: string;
}

export interface DailyLifeIndex extends LifeIndex {
  date: string;
}

export type Location = [number, number];
