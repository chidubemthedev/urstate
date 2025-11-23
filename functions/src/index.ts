const functions = require("firebase-functions");
const { default: next } = require("next");

const nextjsApp = next({
  dev: false,
  conf: { distDir: ".next" },
});

exports.nextServer = functions.https.onRequest((req: any, res: any) => {
  return nextjsApp.getRequestHandler()(req, res);
});
