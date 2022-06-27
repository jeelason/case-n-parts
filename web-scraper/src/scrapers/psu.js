const axios = require("axios");
const cheerio = require("cheerio");
const cliProgress = require("cli-progress");

const createSqlInsert = require("../createSqlInsert");
const { partDefaultUrls } = require("../urls");

async function getDetailPages() {
  const { data } = await axios(partDefaultUrls.psu);
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
    Brand: specs["brand"],
    Wattage: specs["Wattage"],
    Atx_Connector: specs["ATX Connector"],
    Atx_12v_Connector: specs["ATX 12V Connector"],
    Graphics_Connector: specs["Graphics Connector"],
    Molex_Connector: specs["Molex Connector"],
    Sata_Connector: specs["SATA Connector"],
  };

  return data;
}

async function scrapePsu() {
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

  await createSqlInsert("./psu.sql", "psu", detailValues);

  console.log("Done! Go look in psu.sql for your insert statement!");
}

exports.scrapePsu = scrapePsu;
