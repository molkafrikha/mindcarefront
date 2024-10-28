import {
  WebPlugin
} from "./chunk-RWICNS3B.js";
import {
  __async
} from "./chunk-ASLTLD6L.js";

// node_modules/@capacitor/app/dist/esm/web.js
var AppWeb = class extends WebPlugin {
  constructor() {
    super();
    this.handleVisibilityChange = () => {
      const data = {
        isActive: document.hidden !== true
      };
      this.notifyListeners("appStateChange", data);
      if (document.hidden) {
        this.notifyListeners("pause", null);
      } else {
        this.notifyListeners("resume", null);
      }
    };
    document.addEventListener("visibilitychange", this.handleVisibilityChange, false);
  }
  exitApp() {
    throw this.unimplemented("Not implemented on web.");
  }
  getInfo() {
    return __async(this, null, function* () {
      throw this.unimplemented("Not implemented on web.");
    });
  }
  getLaunchUrl() {
    return __async(this, null, function* () {
      return { url: "" };
    });
  }
  getState() {
    return __async(this, null, function* () {
      return { isActive: document.hidden !== true };
    });
  }
  minimizeApp() {
    return __async(this, null, function* () {
      throw this.unimplemented("Not implemented on web.");
    });
  }
};
export {
  AppWeb
};
//# sourceMappingURL=web-X26COIIP.js.map