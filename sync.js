const chokidar = require("chokidar");

// One-liner for current directory
chokidar.watch(process.env.WATCH_DIR).on("all", (event, path) => {
  console.log(event, path);
});
