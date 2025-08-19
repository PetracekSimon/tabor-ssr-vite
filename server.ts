import type { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path, { dirname } from "path";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import folders from "./src/server/folder/controller.js";
import images from "./src/server/images/controller.js";
import users from "./src/server/user/controller.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { getMetaTags } from "./src/utils.js";
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolve = (p: string) => path.resolve(__dirname, p);

const getStyleSheets = async () => {
  try {
    const assetpath = resolve("public/assets");
    const files = await fs.readdir(assetpath);
    const cssAssets = files.filter(l => l.endsWith(".css"));
    const allContent = [];

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

  mongoose.connect(process.env.DATABASE_URL_CLOUD || "mongodb+srv://simpetracek:BonRLEVplgl0XpqN@main.n3btm.mongodb.net/tabor-web?retryWrites=true&w=majority&appName=main");
  const mongodb = mongoose.connection;
  mongodb.on('error', (e) => {
    console.error(e);
  });
  mongodb.once('open', () => {
    console.log(process.env.NODE_ENV);
    console.log('\x1b[32mConnected to db\x1b[0m');
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get("/@vite/client", (req, res, next) => {
    const filePath = path.join(__dirname, 'fake-script.js');
    if (isProd) {
      res.sendFile(filePath);
      return;
    } else {
      next();
      return;
    }
  });

  // Staré WP struktury, které už neexistují
  const GONE_URLS = [
    "/author/pav/",
    "/fotodenik-2022/",
    "/ngg_tag/5-7-2016/",
    "/ngg_tag/10-7-2016/",
    "/ngg_tag/20-7-2010/",
    "/ngg_tag/20-7-2015/",
    "/ngg_tag/21-7-2015/",
    "/ngg_tag/8-7-2015/",
    "/ngg_tag/9-7-2010/",
    "/1891-2/",
    "/fotodenik-2024/",
    "/fotodenik-2023/",
    "/fotodenik-2022/",
    "/fotodenik-2021/",
    "/fotodenik-2020/",
    "/ngg_tag/13-7-2012/",
    "/ngg_tag/14-7-2010/",
    "/ngg_tag/18-7-2011/",
    "/ngg_tag/19-7-2010/",
    "/ngg_tag/19-7-2011/",
    "/ngg_tag/19-7-2012/",
    "/ngg_tag/20-7-2011/",
    "/ngg_tag/3-7-2012/",
    "/ngg_tag/9-7-2015/",
    "comments/feed/",
    "/chci-jet/prihlaska/feed/",
  ];
  GONE_URLS.forEach(url => {
    app.get(url, (req, res) => {
      res.status(410).send('Tahle stránka už neexistuje.');
    });
  });

  // Staré WP struktury, které redirectují na nové
  app.get('/galerie/indiani-2019/', (req, res) => {
    res.redirect(301, '/galerie/2019/');
  });
  app.get('/galerie/mayove-2022/', (req, res) => {
    res.redirect(301, '/galerie/2022/');
  });
  app.get('/galerie/muz-se-zeleznou-2024/', (req, res) => {
    res.redirect(301, '/galerie/2024/');
  });
  app.get('/galerie/vikingove-2023/', (req, res) => {
    res.redirect(301, '/galerie/2023/');
  });

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: isTest ? "error" : "info",
    root: isProd ? "dist" : "",
    optimizeDeps: { include: [] },
  });

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  app.use(vite.middlewares);
  const assetsDir = resolve("public");
  const requestHandler = express.static(assetsDir);
  app.use(requestHandler);
  app.use("/public", requestHandler);

  if (isProd) {
    app.use(compression());
    app.use(
      serveStatic(resolve("client"), {
        index: false,
      }),
    );
  }
  const stylesheets = getStyleSheets();

  // 1. Read index.html
  const baseTemplate = await fs.readFile(isProd ? resolve("client/index.html") : resolve("index.html"), "utf-8");
  const productionBuildPath = path.join(__dirname, "./server/entry-server.js");
  const devBuildPath = path.join(__dirname, "./src/client/entry-server.tsx");
  const buildModule = isProd ? productionBuildPath : devBuildPath;

  const { render } = await vite.ssrLoadModule(buildModule);

  app.get("/robots.txt", (req, res) => {
    const filePath = path.join(__dirname, 'robots.txt');
    res.sendFile(filePath)
  });
  app.get("/sitemap.xml", (req, res) => {
    const filePath = path.join(__dirname, 'sitemap.xml');
    res.sendFile(filePath)
  });
  app.get("/googled8047f4609639b77.html", (req, res) => {
    const filePath = path.join(__dirname, 'googled8047f4609639b77.html');
    res.sendFile(filePath)
  });

  app.use('/api/folder', (req, res, next) => {
    req.apiPath = '/api/folder';
    folders(req, res, next);
  });
  app.use('/api/image', (req, res, next) => {
    req.apiPath = '/api/image';
    images(req, res, next);
  });
  app.use('/api/user', (req, res, next) => {
    req.apiPath = '/api/user';
    users(req, res, next);
  });

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    const initialData = {
      homePage: "Test message from BE - injected-content",
    }

    try {
      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      const template = await vite.transformIndexHtml(url, baseTemplate);
      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()

      //TODO: tady by šel udělat ten load dat DB, který by se daly editovat přes admina
      const initialDataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};</script>`;

      const appHtml = await render(url, "TEST string z BE - render");
      const cssAssets = await stylesheets;
      const { title, description, linkCanonical } = getMetaTags(url);


      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--head-->`, cssAssets)
        .replace(`<!--injected-content-->`, initialDataScript)
        .replace(`<!--link-canonical-->`, linkCanonical)
        .replace(`<!--meta-->`, `<title>${title}</title><meta name="description" content="${description}"/><meta name="og:description" content="${description}"/>`)
        .replace(/<link rel="stylesheet" href="\/assets\/index-(.*?)\.css">/, "");

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
  const port = process.env.PORT || 8080;
  app.listen(Number(port), "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${port}`);
  });
}

createServer();
