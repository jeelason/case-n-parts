const { program } = require("commander");

const {
  scrapeGpus,
  scrapeCpus,
  scrapeRam,
  scrapeHdd,
  scrapePsu,
  scrapeMobos,
} = require("./src/scrapers");
const PartTypes = require("./src/PartTypes");

const scrapers = {
  [PartTypes.GPUs]: scrapeGpus,
  [PartTypes.CPUs]: scrapeCpus,
  [PartTypes.RAM]: scrapeRam,
  [PartTypes.HDD]: scrapeHdd,
  [PartTypes.PSU]: scrapePsu,
  [PartTypes.MOBOs]: scrapeMobos,
};

program
  .command("scrape")
  .description(
    `Scrapes the Microcenter website for various parts. Valid types are: ${Object.values(
      PartTypes
    )}`
  )
  .argument("<part>", "The part type to scrape.")
  .action(async part => {
    const scraper = scrapers[part];

    if (!scraper) {
      console.log(`Unknown part: ${part}`);
      console.log(
        `Please send in a known type from among: ${Object.values(PartTypes)}`
      );
      return;
    }

    await scraper();
  });

program.parse();
