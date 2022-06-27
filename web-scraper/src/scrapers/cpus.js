const axios = require("axios");
const cheerio = require("cheerio");
const cliProgress = require("cli-progress");

const createSqlInsert = require("../createSqlInsert");
const { partDefaultUrls } = require("../urls");

async function getDetailPages() {
  const { data } = await axios(partDefaultUrls.cpus);
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
    processor: specs["Processor"],
    cores: specs["Cores"],
    threads: specs["Number of Threads"],
    speed: specs["Operating Frequency"],
    socket_type: specs["Socket Type"],
  };

  return data;
}

async function scrapeCpus() {
  const detailUrls = await getDetailPages();

  const scrapeProgress = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  // start the progress bar with a total value of 200 and start value of 0
  scrapeProgress.start(detailUrls.length, 0);

  const detailValues = await Promise.all(
    detailUrls
      .filter(url => url.includes("amd"))
      .map(async (url, i) => {
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

  await createSqlInsert("./cpus.sql", "cpu", detailValues);

  console.log("Done! Go look in cpus.sql for your insert statement!");
}

exports.scrapeCpus = scrapeCpus;
