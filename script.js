const dialogOverlay = document.getElementById("dialogOverlay");
const dialogText = document.getElementById("dialogText");
const dialogNext = document.getElementById("dialogNext");
const bootOverlay = document.getElementById("bootOverlay");
const loginScreen = document.getElementById("loginScreen");
const desktop = document.getElementById("desktop");

const mailIcon = document.getElementById("mailIcon");
const mailWindow = document.getElementById("mailWindow");
const downloadAttachment = document.getElementById("downloadAttachment");
const downloadWindow = document.getElementById("downloadWindow");
const downloadStatus = document.getElementById("downloadStatus");
const downloadProgress = document.getElementById("downloadProgress");
const retryDownload = document.getElementById("retryDownload");
const downloadsIcon = document.getElementById("downloadsIcon");
const explorerWindow = document.getElementById("explorerWindow");
const zipFile = document.getElementById("zipFile");
const zipWindow = document.getElementById("zipWindow");
const installerFile = document.getElementById("installerFile");
const installerWindow = document.getElementById("installerWindow");
const installProgress = document.getElementById("installProgress");
const installStatus = document.getElementById("installStatus");
const clickerIcon = document.getElementById("clickerIcon");
const internetIcon = document.getElementById("internetIcon");
const internetWindow = document.getElementById("internetWindow");
const clickerWindow = document.getElementById("clickerWindow");
const earnBar = document.getElementById("earnBar");
const earnProgress = document.getElementById("earnProgress");
const earnedAmount = document.getElementById("earnedAmount");
const clock = document.getElementById("clock");

const dialogLines = [
  "I boot up windows96.",
  "Save screen. Login: 123456.",
  "An email notification pops up from the mail app on the desktop.",
  "I open it. It's an old friend I haven't talked to in a while...",
  "\"Check out this game I made.\"",
  "Inside the email is a suspicious clicker96.zip file.",
];

let dialogIndex = 0;
let earnInterval = null;
let startTime = null;
let bootState = "boot";
let popTimeout = null;

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function showDialogLine() {
  dialogText.textContent = dialogLines[dialogIndex];
}

function advanceDialog() {
  dialogIndex += 1;
  if (dialogIndex >= dialogLines.length) {
    dialogOverlay.classList.add("hidden");
    return;
  }
  showDialogLine();
}

function showWindow(windowEl) {
  windowEl.classList.remove("hidden");
}

function hideWindow(windowEl) {
  windowEl.classList.add("hidden");
}

function startDownloadSequence() {
  showWindow(downloadWindow);
  retryDownload.classList.add("hidden");
  downloadProgress.style.width = "0%";
  downloadStatus.textContent = "Downloading clicker96.zip...";

  setTimeout(() => {
    downloadProgress.style.width = "45%";
    downloadStatus.textContent = "Stutter detected...";
  }, 800);

  setTimeout(() => {
    downloadProgress.style.width = "65%";
    downloadStatus.textContent = "Download failed. Connection lost.";
    retryDownload.classList.remove("hidden");
  }, 1600);
}

function retryDownloadSequence() {
  retryDownload.classList.add("hidden");
  downloadStatus.textContent = "Retrying...";
  downloadProgress.style.width = "15%";

  setTimeout(() => {
    downloadProgress.style.width = "100%";
    downloadStatus.textContent = "Download complete. clicker96.zip saved.";
    downloadsIcon.classList.remove("hidden");
  }, 1200);
}

function startInstallSequence() {
  showWindow(installerWindow);
  installProgress.style.width = "0%";
  installStatus.textContent = "Writing files to desktop.";

  setTimeout(() => {
    installProgress.style.width = "65%";
    installStatus.textContent = "Registering Clicker96...";
  }, 700);

  setTimeout(() => {
    installProgress.style.width = "100%";
    installStatus.textContent = "Install complete. Clicker96 is ready.";
    clickerIcon.classList.remove("hidden");
  }, 1400);
}

function startEarning() {
  const duration = 5 * 60 * 1000;
  startTime = Date.now();

  if (earnInterval) {
    clearInterval(earnInterval);
  }

  earnInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const earned = progress * 1;

    earnProgress.style.width = `${progress * 100}%`;
    earnedAmount.textContent = `$${earned.toFixed(2)}`;

    if (progress >= 1) {
      clearInterval(earnInterval);
      earnInterval = null;
    }
  }, 1000);
}

function nudgeProgressBar() {
  if (!startTime) {
    return;
  }
  startTime -= 1000;
  earnBar.classList.add("pop");
  if (popTimeout) {
    clearTimeout(popTimeout);
  }
  popTimeout = setTimeout(() => {
    earnBar.classList.remove("pop");
  }, 200);
}

function handleBootAdvance() {
  if (bootState === "boot") {
    bootState = "login";
    loginScreen.classList.remove("hidden");
    return;
  }

  if (bootState === "login") {
    bootState = "done";
    bootOverlay.classList.add("hidden");
    desktop.classList.remove("hidden");
    dialogOverlay.classList.remove("hidden");
    showDialogLine();
  }
}

function handleBootInput(event) {
  if (bootState === "done") {
    return;
  }

  if (event.type === "keydown") {
    if (event.key !== " " && event.key !== "Enter") {
      return;
    }
  }

  handleBootAdvance();
}

bootOverlay.addEventListener("click", handleBootAdvance);
document.addEventListener("keydown", handleBootInput);

dialogNext.addEventListener("click", advanceDialog);

mailIcon.addEventListener("click", () => {
  showWindow(mailWindow);
});

downloadAttachment.addEventListener("click", () => {
  startDownloadSequence();
});

retryDownload.addEventListener("click", () => {
  retryDownloadSequence();
});

downloadsIcon.addEventListener("click", () => {
  showWindow(explorerWindow);
});

internetIcon.addEventListener("click", () => {
  showWindow(internetWindow);
});

zipFile.addEventListener("click", () => {
  showWindow(zipWindow);
});

installerFile.addEventListener("click", () => {
  startInstallSequence();
});

clickerIcon.addEventListener("click", () => {
  showWindow(clickerWindow);
  startEarning();
});

earnBar.addEventListener("click", nudgeProgressBar);

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const targetId = event.currentTarget.dataset.close;
    const windowEl = document.getElementById(targetId);
    hideWindow(windowEl);
  });
});

updateClock();
setInterval(updateClock, 1000);
