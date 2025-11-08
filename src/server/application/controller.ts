import express from 'express';
import Errors from './errors.js';
import Types from './types.js';
import ApplicationMongo from './mongo.js';
import verify from '../utiles/auth.js';
import requsetHelper from '../utiles/request-helper.js';
import config from '../../config.js';
import sendEmail from "../helpers/email-helper.js"

import ReactDOMServer from "react-dom/server";
import PdfApplicationTemplate from "../../client/export/pdfApplicationTemplate.js";
import puppeteer from "puppeteer";
import { Application } from '@client/api.js';
import React from 'react';
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';

const _mongo = new ApplicationMongo();
const router = express.Router();


export async function generatePdf(application: Application) {
  const appHtml = ReactDOMServer.renderToStaticMarkup(
    React.createElement(PdfApplicationTemplate, { application })
  );

  // získat cestu k aktuálnímu souboru
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Prefer image from public assets (works in dev and prod), fallback to local export-assets
  const publicImgPath = path.resolve(__dirname, "../../../public", "assets", "application_hero.png");
  const imgPath = fs.existsSync(publicImgPath) ? publicImgPath : "";

  const imgBase64 = fs.readFileSync(imgPath, { encoding: "base64" });

  const imgSrc = `data:image/png;base64,${imgBase64}`;

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <style>
          @page {
            @bottom-center {
              content: counter(page) " / " counter(pages);
              font-family: Arial, sans-serif;
              font-size: 11px;
              color: #555;
            }
          }
        </style>
      </head>
      <body>
        <div style='border: 1px solid black; height: 400px; width: 100%'>
          <img src='${imgSrc}' style='width: 100%; height: 100%; object-fit: cover' />
        </div>
        ${appHtml}
      </body>
    </html>
  `;

 const browser = await puppeteer.launch({ 
   headless: true,
   args: [
     '--no-sandbox',
     '--disable-setuid-sandbox',
     '--disable-dev-shm-usage',
     '--disable-accelerated-2d-canvas',
     '--no-first-run',
     '--no-zygote',
     '--single-process',
     '--disable-gpu'
   ]
 });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "10mm",
      right: "10mm",
      bottom: "10mm",
      left: "10mm",
    }
  });

  await browser.close();
  return pdfBuffer;
}


router.get("/:id/pdf", verify, requsetHelper, async (req, res) => {
  const application = await _mongo.get(req.params.id); // nebo odkud bereš data
  if (!application) return res.status(404).send("Not found");

  const pdfBuffer = await generatePdf(application.toObject() as any);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=prihlaska.pdf");
  res.end(pdfBuffer);
});

router.post('/', requsetHelper, async (req, res) => {
  //HDS 1 (body validation)
  const validate = Types.create.validate(req.data);
  if (validate.error?.details) {
    return Errors.Create.InvalidBody(res, validate.error.details);
  }
  //TODO: recaptcha

  //HDS 2 (assign incremental number per year)
  try {
    const nextNum = await _mongo.getNextApplicationNumber(config.campYearInfo.year);
    req.data.applicationNumber = String(nextNum);
  } catch (error) {
    return Errors.Create.DatabaseFailed(res, error);
  }

  //HDS 3 (create)
  let dtoOut;
  try {
    dtoOut = await _mongo.create(req.data);
  } catch (error) {
    return Errors.Create.DatabaseFailed(res, error);
  }

  // HDS 4 Vygenerování PDF
  const pdfBuffer = await generatePdf(dtoOut.toObject() as any);

  // HDS 5 Zaslání emailu
  sendEmail(dtoOut.parentEmail, `${dtoOut.childFirstName} ${dtoOut.childLastName}`, pdfBuffer);

  //HDS 
  return res.send(dtoOut);
});

router.get('/list', verify, requsetHelper, async (req, res) => {
  //HDS 1 (body validation)
  const validate = Types.list.validate(req.data);
  if (validate.error?.details) {
    return Errors.List.InvalidBody(res, validate.error.details);
  }

  //HDS 2 (list)
  let dtoOut;
  try {
    dtoOut = await _mongo.list(req.data.filter, req.data.pageInfo);
  } catch (error) {
    return Errors.List.DatabaseFailed(res, error);
  }

  //HDS 3
  return res.send(dtoOut);
});

router.patch('/updateState', verify, requsetHelper, async (req, res) => {
  //HDS 1 (body validation)
  const validate = Types.updateState.validate(req.data);
  if (validate.error?.details) {
    return Errors.UpdateState.InvalidBody(res, validate.error.details);
  }

  //HDS 2 (update state)
  let updated;
  try {
    updated = await _mongo.updateState(req.data.id, req.data.state);
    if (!updated) {
      return Errors.UpdateState.NotFound(res, req.data.id);
    }
  } catch (error) {
    return Errors.UpdateState.DatabaseFailed(res, error);
  }

  //HDS 3
  return res.send(updated);
});



export default router; 