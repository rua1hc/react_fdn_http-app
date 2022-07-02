import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

import "./index.css";

import "bootstrap/dist/css/bootstrap.css";

// Sentry.init({
//     dsn: "https://e66119851fa244d285c85a5ad73e1b18@o1304672.ingest.sentry.io/6545301",
//     integrations: [new BrowserTracing()],

//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
// });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
