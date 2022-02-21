const { exec } = require("child_process");
const chokidar = require("chokidar");
const debounce = require("debounce");

const SYNC_DIR = process.env.SYNC_DIR;

console.log("Starting syncing in dir: ", SYNC_DIR);
initializeWatcher();

function initializeWatcher() {
  chokidar
    .watch(SYNC_DIR, {
      ignoreInitial: true,
    })
    .on("all", debounce(onChange, 1000));
}

function onChange() {
  run("git status");
}

function run(command) {
  exec(
    command,
    { shell: "powershell.exe", cwd: SYNC_DIR },
    (error, stdout, stderr) => {
      if (error) {
        console.error(error);
      }
      if (stdout) {
        console.log(stdout);
      }
      if (stderr) {
        console.error(stderr);
      }
    }
  );
}
