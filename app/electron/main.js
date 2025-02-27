const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

let ventanaPrincipal

app.whenReady().then(() => {
    ventanaPrincipal = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    ventanaPrincipal.loadURL("http://localhost:3001")
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})