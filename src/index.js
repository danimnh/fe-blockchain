import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { getActions as getSWActions } from "store/sw";

import "./global.css";

axios.defaults.baseURL = "http://13.229.214.74:3001/";
if (!document.ie) {
  // check for ie
  Promise.all([import("react"), import("react-dom"), import("App")]).then(
    ([{ default: React }, { default: ReactDOM }, { default: App }]) => {
      ReactDOM.render(<App />, document.getElementById("root"));
    }
  );

  serviceWorker.register({
    onSuccess: () => getSWActions().handleSuccess(),
    onUpdate: (reg) => getSWActions().handleUpdate(reg),
  });
}
