import { chromium } from "@playwright/test";
import * as cheerio from "cheerio";

const demoUrl = "https://jiji.ng/agriculture-and-foodstuff";
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(demoUrl);

  await page.waitForLoadState("networkidle");

  //   const html = await page.content();

  //   const $ = cheerio.load(html);

  const targetProduces = [
    " yam ",
    "cassava",
    "sorghum",
    "rice",
    " beans ",
    "cocoa",
  ];

  const elements = await page.$$(`div.b-list-advert-base__data__title`);

  for (const element of elements) {
    const title = (await element.innerText()).trim().toLowerCase();
    // console.log(title, typeof title);

    const isProduce = targetProduces.some((produceTitle) =>
      title.includes(produceTitle)
    );
    console.log("produceee >>> ", title, isProduce);

    if (isProduce) {
      const selector = `div.masonry-item`;
      const produceDiv = await element.evaluateHandle((el) =>
        el.closest("div.masonry-item")
      );
      if (!produceDiv) continue;

      await page.waitForSelector(selector, { state: "visible" });

      await page.waitForLoadState("networkidle");

      // await page.waitForURL("**/meals-and-drinks", { timeout: 60000 });
      console.log("url  >>> ", page.url());

      await Promise.all([
        page.waitForNavigation({ waitUntil: "load", timeout: 30000 }),
        page.click(selector),
      ]);

      console.log("url after navigation >>> ", page.url());

      const detailDivSelector = "div.b-advert-card-wrapper";
      await page.waitForSelector(detailDivSelector, { state: "visible" });
      const detailsHtml = await page.content();

      const $ = cheerio.load(detailsHtml);
      const detailsDiv = $(detailDivSelector);

      if (detailsDiv.length < 1) continue;

      //   const title = detailsDiv
      //     .find(".b-advert-title-inner.qa-advert-title.b-advert-title-inner--h1")
      //     .text()
      //     .trim();
      //   const description = detailsDiv
      //     .find(".b-advert__description-text")
      //     .text()
      //     .trim();
      //   const infoStat = detailsDiv
      //     .find(".b-advert-info-statistics")
      //     .text()
      //     .trim();

      //   console.log({
      //     title,
      //     description,
      //     infoStat,
      //   });

      //   console.log(
      //     detailsDiv
      //       .find(
      //         ".b-advert-title-inner.qa-advert-title.b-advert-title-inner--h1"
      //       )
      //       .html()
      //   );
      //   const imgSrcs = [];
      //   detailsDiv.find("img").each((i, element) => {
      //     const imgSrc = $(element).attr("src");
      //     if (imgSrc) imgSrcs.push(imgSrc);
      //   });

      //   detailsDiv.find();
      await page.goBack();
    }
  }
  await browser.close();
})();
