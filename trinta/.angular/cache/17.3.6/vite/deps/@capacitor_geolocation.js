import {
  registerPlugin
} from "./chunk-RWICNS3B.js";
import "./chunk-ASLTLD6L.js";

// node_modules/@capacitor/geolocation/dist/esm/index.js
var Geolocation = registerPlugin("Geolocation", {
  web: () => import("./web-ZCHCBMEJ.js").then((m) => new m.GeolocationWeb())
});
export {
  Geolocation
};
//# sourceMappingURL=@capacitor_geolocation.js.map
