const { readJSON, open, write, close, remove } = require("fs-extra");
const path = require("path");
const { uniq, orderBy } = require("lodash");

// const DATA = path.join(__dirname, "data");
const DATA = path.join("/srv/olacvis/data");
const LANGUAGE_STATS_FILE = path.join(__dirname, "olac-language-stats.csv");

let stats = [];
let resourceTypes = [];
(async () => {
    const index = await readJSON(path.join(DATA, "index.json"));
    for (let language of index) {
        resourceTypes.push(...Object.keys(language.resources));
        resourceTypes = uniq(resourceTypes);
    }
    for (let language of index) {
        let info = [];
        for (let type of resourceTypes) {
            info.push(language.resources[type] ? language.resources[type] : 0);
        }
        stats.push(
            `${language.code},${language.name},${language.url},${
                language.coords
            },${info.join(",")}`
        );
    }
    stats = orderBy(stats, (l) => l.split(",")[0]);
    stats = [`code,name,url,coords,${resourceTypes.join(",")}`, ...stats];

    await remove(LANGUAGE_STATS_FILE);
    const fd = await open(LANGUAGE_STATS_FILE, "w");
    for (let stat of stats) {
        await write(fd, `${stat}\n`);
    }
    await close(fd);
})();
