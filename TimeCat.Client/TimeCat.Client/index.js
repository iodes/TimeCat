const { app, BrowserWindow } = require('electron');

let mainWindow;

async function main()
{
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hiddenInset',
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  await mainWindow.webContents.loadFile('frontend/index.html');
}

app.on('ready', main);
app.on('activate', main);

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') return;

  app.quit();
});
