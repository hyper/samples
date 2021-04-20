// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow; let loginWindow; let
	serverWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	serverWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	// Remove menu bar and load respective files
	serverWindow.setMenuBarVisibility(false);
	serverWindow.loadFile(path.join(__dirname, 'server', 'server.html'));

	mainWindow.setMenuBarVisibility(false);
	mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// Handle login event from the loginWindow
ipcMain.on('login', () => {
	loginWindow = new BrowserWindow({
		width: 1000,
		height: 800,
	});

	loginWindow.setMenuBarVisibility(false);

	// and load the index.html of the app.
	loginWindow.loadURL('https://dashboard.eqpt.io/oauth/authorize?redirect_uri=http://localhost:6789/auth/callback');
});

// Handle login-success event from the serverWindow
ipcMain.on('login-success', (_e, data) => {
	const { license, user } = data;
	if (!license || !user) return;
	// eslint-disable-next-line no-console
	console.log({ license, user });
	loginWindow.hide();

	// At this point, show task window or "Authenticated" windows
});
