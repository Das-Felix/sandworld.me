const { app, BrowserWindow, ipcMain } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: false,
      }
    });  
    win.loadFile('./display/index.html');
}

app.whenReady().then(() => {
    createWindow();
});

ipcMain.on('exit', () => {
  app.exit();
});
