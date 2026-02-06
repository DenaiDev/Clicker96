const bootOverlay = document.getElementById("bootOverlay");
const titleOverlay = document.getElementById("titleOverlay");
const loginScreen = document.getElementById("loginScreen");
const loginButton = document.getElementById("loginButton");
const passwordInput = document.getElementById("passwordInput");
const loginStatus = document.getElementById("loginStatus");
const playButton = document.getElementById("playButton");
const continueButton = document.getElementById("continueButton");
const switchSlotButton = document.getElementById("switchSlotButton");
const settingsButton = document.getElementById("settingsButton");
const exitButton = document.getElementById("exitButton");
const slotLabel = document.getElementById("slotLabel");
const titleStatus = document.getElementById("titleStatus");
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
const totalAmount = document.getElementById("totalAmount");
const clock = document.getElementById("clock");
const moneyDisplay = document.getElementById("moneyDisplay");

let earnInterval = null;
let startTime = null;
let popTimeout = null;
let totalMoney = 0;
let currentSlot = 1;
let bootState = "boot";

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
      totalMoney += 1;
      updateMoneyDisplay();
      saveCurrentSlot();
      startTime = Date.now();
      earnProgress.style.width = "0%";
      earnedAmount.textContent = "$0.00";
    }
  }, 1000);
}

function nudgeProgressBar() {
  if (!startTime) {
    return;
  }
  startTime -= 1000;
  const rotate = Math.floor(Math.random() * 11) - 5;
  earnBar.classList.remove("pop");
  void earnBar.offsetWidth;
  earnBar.style.setProperty("--pop-rotate", `${rotate}deg`);
  earnBar.classList.add("pop");
  if (popTimeout) {
    clearTimeout(popTimeout);
  }
  popTimeout = setTimeout(() => {
    earnBar.classList.remove("pop");
  }, 200);
}

function handleBootAdvance() {
  bootState = "done";
  bootOverlay.classList.add("hidden");
  titleOverlay.classList.remove("hidden");
}

function openLoginScreen() {
  titleOverlay.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  passwordInput.value = "";
  loginStatus.textContent = "Enter password to continue.";
  passwordInput.focus();
}

function proceedToDesktop() {
  loginScreen.classList.add("hidden");
  desktop.classList.remove("hidden");
}

function updateMoneyDisplay() {
  const formatted = `$${totalMoney.toFixed(2)}`;
  moneyDisplay.textContent = formatted;
  totalAmount.textContent = formatted;
}

function currentSlotKey() {
  return `clicker96_save_slot_${currentSlot}`;
}

function loadSlot() {
  const raw = localStorage.getItem(currentSlotKey());
  if (!raw) {
    totalMoney = 0;
    updateMoneyDisplay();
    return false;
  }
  const data = JSON.parse(raw);
  totalMoney = data.totalMoney ?? 0;
  updateMoneyDisplay();
  return true;
}

function saveCurrentSlot() {
  const data = {
    totalMoney,
  };
  localStorage.setItem(currentSlotKey(), JSON.stringify(data));
}

function startNewGame() {
  totalMoney = 0;
  updateMoneyDisplay();
  saveCurrentSlot();
  openLoginScreen();
}

function continueGame() {
  const exists = loadSlot();
  titleStatus.textContent = exists
    ? "Save loaded."
    : "No save found. Starting a new one.";
  if (!exists) {
    saveCurrentSlot();
  }
  openLoginScreen();
}

function switchSlot() {
  currentSlot = currentSlot === 3 ? 1 : currentSlot + 1;
  slotLabel.textContent = String(currentSlot);
  titleStatus.textContent = "Switched save slot.";
}

function handleLogin() {
  const value = passwordInput.value.trim();
  if (value.length !== 6) {
    loginStatus.textContent = "Password must be 6 digits.";
    return;
  }
  loginStatus.textContent = "Welcome back.";
  proceedToDesktop();
}

bootOverlay.addEventListener("click", handleBootAdvance);
setTimeout(() => {
  if (bootState === "boot") {
    handleBootAdvance();
  }
}, 1000);

playButton.addEventListener("click", startNewGame);
continueButton.addEventListener("click", continueGame);
switchSlotButton.addEventListener("click", switchSlot);
settingsButton.addEventListener("click", () => {
  titleStatus.textContent = "Settings coming soon.";
});
exitButton.addEventListener("click", () => {
  titleStatus.textContent = "Exit is disabled in the demo.";
});

loginButton.addEventListener("click", handleLogin);
passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleLogin();
  }
});

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
  if (!earnInterval) {
    startEarning();
  }
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
loadSlot();
