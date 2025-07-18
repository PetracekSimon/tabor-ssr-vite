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

const getMetaTags = (url: string) => {

  //TODO: další meta tagy
  /*
  <meta name="keywords" content="letni, tabor, stan, stanovy, deti, tri, tydny, dlouhy">
  <meta property="og:title" content="">
  <meta property="og:site_name" content="">
  <meta property="og:url" content="">
  <meta property="og:description" content="">
  <meta property="og:type" content="">
  <meta property="og:image" content="">
  atd... 
  */

  let title = "Letní stanový tábor";
  let description = "Užijte si 19 dní plných dobrodružství na letním stanovém táboře Kamenná! Děti se mohou těšit na hry, sportovní aktivity a objevování přírody, které jim zanechají nezapomenutelné zážitky.";
  switch (url) {
    case "/":
      title = "Letní stanový tábor ";
      break;
    case "/o-tabore":
      title = "Letní stanový tábor | O táboře";
      break;
    case "/prubeh-tabora":
      title = "Letní stanový tábor | Průběh tábora";
      break;
    case "/chci-jet":
      title = "Letní stanový tábor | Chci jet";
      break;
    case "/galerie":
      title = "Letní stanový tábor | Galerie";
      break;
    default:
      title = "Letní stanový tábor";
      break;
  }

  return { title, description }
}

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
  console.log("isProd:", isProd);
  
  const buildModule = isProd ? productionBuildPath : devBuildPath;
  const { render } = await vite.ssrLoadModule(buildModule);

  app.get("/robots.txt", (req,res) =>{
    const filePath = path.join(__dirname, 'robots.txt');
    res.sendFile(filePath)
  });
  app.get("/sitemap.xml", (req,res) =>{
    const filePath = path.join(__dirname, 'sitemap.xml');
    res.sendFile(filePath)
  })

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
      const appHtml = await render(url);
      const cssAssets = await stylesheets;
      const { title, description } = getMetaTags(url);


      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--head-->`, cssAssets)
        .replace(`<!--meta-->`, `<title>${title}</title><meta name="description" content="${description}"/>`)
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
