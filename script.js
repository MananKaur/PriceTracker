process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const puppeteer = require('puppeteer');
const $ = require('cheerio');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const url = 'https://www.amazon.in/Karin-Mini-Box-colours-Blender/dp/B07F1CG21K';
const belowthis = 4420;

async function configureBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function checkPrice(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  // console.log(html);

  $('#priceblock_ourprice', html).each(function () {
    let Price = $(this).text();

    let currentPrice = Number(Price.replace(/[^0-9.-]+/g, ""));

    if (currentPrice <= belowthis) {
      console.log("BUY!!!! " + currentPrice);
      try {
        sendNotification(currentPrice);
      } catch (e) {
        console.log(e);
      }
    }
  });
}

async function startTracking() {
  const page = await configureBrowser();

  let job = new CronJob('*/60 * * * * *', function () { 
    checkPrice(page);
  }, null, true, null, null, true);
  job.start();
}

async function sendNotification(price) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '***@gmail.com',
      pass: '****'
    }
  });

  let textToSend = 'Price dropped to ' + price;
  let htmlText = `<a href=\"${url}\">Link</a>`;

   await transporter.sendMail({
    from: '"Price Tracker" <****@.com>',
    to: "***@gmail.com",
    subject: 'Price dropped to ' + price,
    text: textToSend,
    html: htmlText
  });

 // console.log("Message sent: %s", info.messageId);
}

startTracking();
