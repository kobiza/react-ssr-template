import fs from "fs/promises";
import path from "path";
import express from "express";
import React from 'react'

import {renderToString} from 'react-dom/server'
import App from './components/App'

const renderSsr = () => {
  return renderToString(
      <App/>
  );
}

const DEFAULT_PORT = "8082";
const app = express();

const QUERY_PARAMS = {
  DISABLE_SSR: "disableSsr",
};

const CONTENT_TEMPLATE_STRING = `<!-- content -->`;

app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", async (req, res) => {
  const indexFile = await fs.readFile(path.join(__dirname, "index.html"));
  const indexFileContent = indexFile.toString();

  res.set("Content-Type", "text/html");

  if (req.query[QUERY_PARAMS.DISABLE_SSR]) {
    res.send(indexFileContent);
  } else {
    const ssrOutput = renderSsr();
    const indexWithRenderedApp = indexFileContent.replace(
      CONTENT_TEMPLATE_STRING,
      ssrOutput
    );

    res.send(indexWithRenderedApp);
  }
});

app.use(express.static(path.join(__dirname)));

app.set('port', process.env.PORT || DEFAULT_PORT);

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}...`));
