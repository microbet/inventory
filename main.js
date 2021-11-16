const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

var knex = require("knex")({
  client:"sqlite3",
  connection: {
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
  let result = knex.select("first_name").from("entity")
    result.then(function(rows) {
      win.webContents.send("fromMain", rows[0].first_name);
  })
});