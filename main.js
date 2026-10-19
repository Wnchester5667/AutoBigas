const { app, BrowserWindow } = require("electron");
const fs = require("fs");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 850,
        minWidth: 900,
        minHeight: 650,
        title: "Autobigas.Connect",
        backgroundColor: "#f4f7f6",
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Hanapin ang index.html (sa root folder o sa loob ng www/)
    let htmlFile = "index.html";
    if (!fs.existsSync(htmlFile) && fs.existsSync("www/index.html")) {
        htmlFile = "www/index.html";
    }

    mainWindow.loadFile(htmlFile);

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.whenReady().then(function () {
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});