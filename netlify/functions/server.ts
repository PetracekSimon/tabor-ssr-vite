import express from "express";
import serverless from "serverless-http";
import fs from "fs/promises";
import path, { dirname } from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import compression from "compression";
import serveStatic from "serve-static";
import folders from "../../src/server/folder/controller";
import images from "../../src/server/images/controller";
import users from "../../src/server/user/controller";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolve = (p: string) => path.resolve(__dirname, p);

const getStyleSheets = async () => {
  try {
    const assetpath = resolve("public");
    const files = await fs.readdir(assetpath);
    const cssAssets = files.filter(l => l.endsWith(".css"));
    const allContent: string[] = [];
    for (const asset of cssAssets) {
      const content = await fs.readFile(path.join(assetpath, asset), "utf-8");
      allContent.push(`<style type="text/css">${content}</style>`);
    }
    return allContent.join("\n");
  } catch {
    return "";
  }
};

async function createServer(isProd = process.env.NODE_ENV === "production") {
  const app = express();

  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.DATABASE_URL_CLOUD as string);
  const mongodb = mongoose.connection;
  mongodb.on('error', (e) => {
    console.error(e);
  });
  mongodb.once('open', () => {
    console.log('\x1b[32mConnected to db\x1b[0m');
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: isProd ? "info" : "error",
  });

  app.use(vite.middlewares);

  const assetsDir = resolve("public");
  app.use(express.static(assetsDir));
  app.use("/public", express.static(assetsDir));

  if (isProd) {
    app.use(compression());
    app.use(
      serveStatic(resolve("client"), {
        index: false,
      })
    );
  }

  const stylesheets = getStyleSheets();

  const baseTemplate = await fs.readFile(isProd ? resolve("client/index.html") : resolve("index.html"), "utf-8");
  const buildModule = isProd
    ? path.join(__dirname, "./server/entry-server.js")
    : path.join(__dirname, "../../src/client/entry-server.tsx");
  const { render } = await vite.ssrLoadModule(buildModule);

  app.use("/api/folder", folders);
  app.use("/api/image", images);
  app.use("/api/user", users);

  app.use("*", async (req, res, next) => {
    try {
      const template = await vite.transformIndexHtml(req.originalUrl, baseTemplate);
      const appHtml = await render(req.originalUrl);
      const cssAssets = await stylesheets;

      const html = template.replace(`<!--app-html-->`, appHtml).replace(`<!--head-->`, cssAssets);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  return app;
}

// Export serverless function handler
const app = await createServer();
export const handler = serverless(app);
