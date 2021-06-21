import { App } from "./mod.ts";
import { weather } from "./datasources/caiyunapp/request.ts";

const app = new App();
app.run();

weather({ location: [101.6544, 25.1552] }).then((res) => {
  console.log(res.result.forecast_keypoint);
});
