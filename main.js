const { app, BrowserWindow,Menu } = require('electron');


function createWindow () {   
	Menu.setApplicationMenu(null);
  // 创建浏览器窗口
  let win = new BrowserWindow({
		width: 1024,
		height: 600,
		allowRunningInsecureContent: true,
		webPreferences: {
      nodeIntegration: true
    }
	});
	
  // 然后加载 app 的 index.html.
  win.loadFile('index.html');
	
	
	// 打开开发者工具
  //win.webContents.openDevTools();
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
})