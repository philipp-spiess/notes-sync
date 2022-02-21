const chokidar = require("chokidar");

const WATCH_DIR = process.env.WATCH_DIR;

console.log("Starting watching on: ", WATCH_DIR);

// One-liner for current directory
chokidar.watch(WATCH_DIR).on("all", (event, path) => {
  console.log(event, path);
});
