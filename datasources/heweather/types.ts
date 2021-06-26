export interface ResponseV7 {
  code: string;
}

export type ResponseOKV7<T extends keyof ResultV7> = Pick<ResultV7, T> & {
  code: "200";
  updateTime: string; // ISO Date
  fxLink: string;
  refer: {
    sources: string[];
    license: string[];
  };
};

export type Daily = "daily";

export enum Unit {
  Metric = "m",
  Imperial = "i",
}

export interface RequestParams {
  lang?: string;
  unit?: Unit;
  location: Location;
}

export interface ResultV7 {
  daily: DailyWeather[];
}

export interface DailyWeather {
  fxDate: string; // 2021-06-26
  sunrise: string; // 04:47
  sunset: string; // 19:47
  moonrise: string; // 21:35
  moonset: string; // 07:04
  moonPhase: string; // 亏凸月
  tempMax: string; // 30
  tempMin: string; // 23
  iconDay: string; // 302
  textDay: string; // 雷阵雨
  iconNight: string; // 101
  textNight: string; // 多云
  wind360Day: string; // 135
  windDirDay: string; // 东南风
  windScaleDay: string; // 1-2
  windSpeedDay: string; // 3
  wind360Night: string; // 135
  windDirNight: string; // 东南风
  windScaleNight: string; // 1-2
  windSpeedNight: string; // 3
  humidity: string; // 76
  precip: string; // 1.3
  pressure: string; // 998
  vis: string; // 23
  cloud: string; // 51
  uvIndex: string; // 11
}

export type Location = [number, number];
