const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let preloadWindow;

app.on('ready', () => {
  // Create a preload window
  preloadWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false, // No title bar or controls
    transparent: true, // Optional: transparent background
    alwaysOnTop: true,
    webPreferences: {
      devTools: false, // Disable dev tools for the preloader
    },
  });

  // Load the preloader HTML
  preloadWindow.loadFile(path.join(__dirname, 'preloader.html'));

  // Create the main application window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Keep hidden until content is ready
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Adjust as needed
    },
  });

  // Load your Next.js app or local server
  mainWindow.loadURL('http://localhost:3000');

  // Wait for the app to be ready, then show the main window
  mainWindow.webContents.once('dom-ready', () => {
    preloadWindow.close(); // Close the preloader
    mainWindow.show(); // Show the main window
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
