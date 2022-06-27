const { scrapeGpus } = require("./gpus");
const { scrapeCpus } = require("./cpus");
const { scrapeRam } = require("./ram");
const { scrapeHdd } = require("./hdd");
const { scrapePsu } = require("./psu");
const { scrapeMobos } = require("./mobos");

module.exports = {
  scrapeGpus,
  scrapeCpus,
  scrapeRam,
  scrapeHdd,
  scrapePsu,
  scrapeMobos,
};
