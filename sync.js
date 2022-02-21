const { exec } = require("child_process");
const chokidar = require("chokidar");
const debounce = require("debounce");

const SYNC_DIR = process.env.SYNC_DIR;

function initializeWatcher() {
  chokidar
    .watch(SYNC_DIR, {
      ignoreInitial: true,
    })
    .on("all", onChangeDebounced);
}

function onChange() {
  run(`git add .`);
  run(`git commit -m 'Updates notes on ${getReadableTimestamp()}'`);
  run(`git push`);
}
const onChangeDebounced = debounce(onChange, 30000);

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

function getReadableTimestamp() {
  return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
}

console.log("Starting syncing in dir: ", SYNC_DIR);
initializeWatcher();
