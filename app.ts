import { App } from "./mod.ts";
import Http from "./packages/http/mod.ts";
import { places, weather } from "./datasources/caiyunapp/request.ts";
import { daily } from "./datasources/heweather/request.ts";

const app = new App();
app.use(new Http());
app.run();

weather({ location: [101.6544, 25.1552] }).then((res) => {
  console.log(res.result.forecast_keypoint);
});

places({ query: "阿里巴巴" }).then((res) => {
  console.log(res.places);
});

daily({ location: [101.6544, 25.1552] }).then((res) => {
  console.log(res.daily[0].fxDate);
});
