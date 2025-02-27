const { app, BrowserWindow } = require("electron")
const path = require("path")

function nuevaVentana() {
    let ventanaPrincipal = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    })

    ventanaPrincipal.loadURL("http://localhost:3001")
}

app.whenReady().then(() => {
    nuevaVentana()
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        nuevaVentana()
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})