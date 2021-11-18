const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

var knex = require("knex")({
  client:"sqlite3",
  connection: {
    // filename: app.getPath('userData')
    filename: "./inventory.db"
  }
});

let win;

async function createWindow() {

  // Create browser window
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  // Load app
  win.loadFile(path.join(__dirname, 'index.html'))
  win.webContents.openDevTools();
}

app.on("ready", createWindow);

ipcMain.on("toMain", (event, args) => {
  if (args.type === "insert name") {
    knex('entity').insert([{first_name: args.value, last_name: 'name'}])
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
  }
  if (args.type === "delete name") {
    knex('entity').where({entity_id: args.value}).del()
    .then(() => console.log("data deleted"))
    .catch((err) => { console.log(err); throw err })
  }
  knex.select('first_name', 'entity_id').from('entity')
  .then((rows) => {
    win.webContents.send("fromMain", rows);
  })
});