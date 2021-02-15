// Modules to control application life and create native browser window
const electron=require('electron')
const { app, BrowserWindow,Menu,Tray,shell } = electron
const path=require('path')




var appTray = null

function createWindow() {
  // Create the browser window.
  let area = electron.screen.getPrimaryDisplay().workAreaSize;
 
  const mainWindow = new BrowserWindow({
    width: area.width,
    height: area.height,
    x: 0,
    y: 0,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })


  let contents=mainWindow.webContents
  var trayMenuTemplate = [
    {
      label : '播放',
      click : function(){
        contents.setAudioMuted(false)
      }
    },
    {
      label : '暂停',
      click : function(){
        contents.setAudioMuted(true)
      }
    },
    {
      label: '帮助',
      click: function () {
        shell.openExternal("http://casuor.top")
       }
    },
    {
      label: '退出',
      click: function () {
        //ipc.send('close-main-window');
        app.quit();
      }
    }

  ]
    
    appTray = new Tray(path.join(__dirname, 'bull.ico'));

    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('newyear');

    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);


  mainWindow.setIgnoreMouseEvents(true)
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
