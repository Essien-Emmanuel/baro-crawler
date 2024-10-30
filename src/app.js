import express from "express";

const app = express();

import { chromium } from "@playwright/test";
import * as cheerio from "cheerio";

const demoUrl = "https://jiji.ng/agriculture-and-foodstuff";
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(demoUrl);

  await page.waitForLoadState("networkidle");

  const targetProduces = [
    "yam",
    "cassava",
    "sorghum",
    "rice",
    "beans",
    "cocoa",
  ];

  await browser.close();
})();

export default app;
