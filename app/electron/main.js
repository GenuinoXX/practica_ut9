const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

let ventanaPrincipal
let segundaVentana

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

    segundaVentana = new BrowserWindow({
        width: 600,
        height: 400,
        parent: mainWindow,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    segundaVentana.loadURL("http://localhost:3001/perfil/mis_recetas");

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            app.whenReady().then(() => {
                ventanaPrincipal.show();
            });
        }
    });
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})