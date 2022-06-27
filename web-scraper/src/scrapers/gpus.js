const axios = require("axios");
const cheerio = require("cheerio");
const cliProgress = require("cli-progress");

const createSqlInsert = require("../createSqlInsert");
const { partDefaultUrls } = require("../urls");

async function getDetailPages() {
  const { data } = await axios(partDefaultUrls.gpus);
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

  const data = {
    manufacturer: specs["GPU Manufacturer"],
    chipset: specs["GPU Chipset"],
    core_clock_speed: specs["Boost Core Clock Speed"],
    video_memory: parseInt(specs["Video Memory"], 10),
    memory_type: specs["Memory Type"],
    height: specs["Height"],
    length: specs["Video Card Length"],
    width: specs["Width"],
    hdmi: specs["HDMI"],
    display_port: specs["DisplayPort"],
  };

  return data;
}

async function scrapeGpus() {
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

  await createSqlInsert("./gpus.sql", "gpu", detailValues);

  console.log("Done! Go look in gpus.sql for your insert statement!");
}

exports.scrapeGpus = scrapeGpus;
