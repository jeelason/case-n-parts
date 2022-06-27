const axios = require("axios");
const cheerio = require("cheerio");
const cliProgress = require("cli-progress");

const createSqlInsert = require("../createSqlInsert");
const { partDefaultUrls } = require("../urls");

async function getDetailPages() {
  const { data } = await axios(partDefaultUrls.ram);
  const $ = cheerio.load(data);

  const detailUrls = [];
  $(".detail_wrapper a").each((i, element) => {
    detailUrls.push(partDefaultUrls.base + $(element).attr("href"));
  });

  return detailUrls;
}

function mapDetailPage($) {
  const specs = {};
  $(".spec-body").each((i, element) => {
    const specName = $("div:first-child", element).text();
    const specValue = $("div:last-child", element).text();
    specs[specName] = specValue;
  });

  specs["brand"] = $("#brandContainer a").text();

  const data = {
    brand: specs["brand"],
    memory_type: specs["Memory Type"],
    memory_speed: specs["Memory Speed"],
    memory_channels: specs["Memory Channels"],
    pin_configuration: specs["Pin Configuration"],
  };

  return data;
}

async function scrapeRam() {
  const detailUrls = await getDetailPages();

  const scrapeProgress = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  // start the progress bar with a total value of 200 and start value of 0
  scrapeProgress.start(detailUrls.length, 0);

  const detailValues = await Promise.all(
    detailUrls.map(async (url, i) => {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(async () => {
            const { data } = await axios(url);
            const $ = cheerio.load(data);
            const rowData = mapDetailPage($);
            resolve(rowData);

            // update the current value in your application..
            scrapeProgress.update(i);
          }, i * 300 + Math.floor(Math.random() * 300));
        } catch (error) {
          reject(error);
        }
      });
    })
  );

  // stop the progress bar
  scrapeProgress.stop();

  await createSqlInsert("./ram.sql", "ram", detailValues);

  console.log("Done! Go look in cpus.sql for your insert statement!");
}

exports.scrapeRam = scrapeRam;
