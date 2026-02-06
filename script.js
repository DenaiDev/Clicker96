const bootOverlay = document.getElementById("bootOverlay");
const titleOverlay = document.getElementById("titleOverlay");
const loginScreen = document.getElementById("loginScreen");
const loginButton = document.getElementById("loginButton");
const passwordInput = document.getElementById("passwordInput");
const loginStatus = document.getElementById("loginStatus");
const startButton = document.getElementById("startButton");
const switchSlotButton = document.getElementById("switchSlotButton");
const settingsButton = document.getElementById("settingsButton");
const exitButton = document.getElementById("exitButton");
const slotLabel = document.getElementById("slotLabel");
const titleStatus = document.getElementById("titleStatus");
const desktop = document.getElementById("desktop");

const mailIcon = document.getElementById("mailIcon");
const mailBadge = document.getElementById("mailBadge");
const mailWindow = document.getElementById("mailWindow");
const mailBody = document.getElementById("mailBody");
const downloadAttachment = document.getElementById("downloadAttachment");
const downloadWindow = document.getElementById("downloadWindow");
const downloadStatus = document.getElementById("downloadStatus");
const downloadProgress = document.getElementById("downloadProgress");
const retryDownload = document.getElementById("retryDownload");
const downloadsIcon = document.getElementById("downloadsIcon");
const explorerWindow = document.getElementById("explorerWindow");
const downloadList = document.getElementById("downloadList");
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
const clock = document.getElementById("clock");
const moneyDisplay = document.getElementById("moneyDisplay");
const settingsWindow = document.getElementById("settingsWindow");
const settingsSlotLabel = document.getElementById("settingsSlotLabel");
const deleteSaveButton = document.getElementById("deleteSaveButton");
const settingsStatus = document.getElementById("settingsStatus");
const trashIcon = document.getElementById("trashIcon");
const trashWindow = document.getElementById("trashWindow");
const trashList = document.getElementById("trashList");
const trashStatus = document.getElementById("trashStatus");
const taskbarWindows = document.getElementById("taskbarWindows");
const timeEstimate = document.getElementById("timeEstimate");
const estimateAccuracy = document.getElementById("estimateAccuracy");
const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastBody = document.getElementById("toastBody");

let earnInterval = null;
let startTime = null;
let popTimeout = null;
let totalMoney = 0;
let currentSlot = 1;
let bootState = "boot";
let downloads = [];
let trash = [];
let openedWindows = new Set();
let achievements = [];
let lastToastTimeout = null;
let hasEmail = false;
let emailTimer = null;
let windowZ = 10;

const gridSize = { x: 88, y: 92 };
const accuracyLevels = ["low", "medium", "high", "precise"];

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function showWindow(windowEl) {
  windowEl.classList.remove("hidden");
  openedWindows.add(windowEl.id);
  focusWindow(windowEl);
  renderTaskbarWindows();
}

function hideWindow(windowEl) {
  windowEl.classList.add("hidden");
  openedWindows.delete(windowEl.id);
  renderTaskbarWindows();
}

function renderTaskbarWindows() {
  taskbarWindows.innerHTML = "";
  const windows = Array.from(openedWindows);
  if (windows.length === 0) {
    return;
  }
  const labels = windows.map((id) => {
    const header = document.querySelector(`#${id} .window-header span`);
    return header ? header.textContent : id;
  });
  const displayCount = Math.min(labels.length, 9);
  for (let i = 0; i < displayCount; i += 1) {
    const badge = document.createElement("button");
    badge.className = "taskbar-window";
    badge.textContent = labels[i];
    badge.type = "button";
    badge.addEventListener("click", () => {
      const windowEl = document.getElementById(windows[i]);
      if (windowEl) {
        showWindow(windowEl);
      }
    });
    taskbarWindows.appendChild(badge);
  }
  if (labels.length > 9) {
    const extra = document.createElement("div");
    extra.className = "taskbar-window more";
    const hiddenCount = labels.length - 9;
    extra.textContent = hiddenCount > 99 ? "99+" : String(hiddenCount);
    taskbarWindows.appendChild(extra);
  }
}

function focusWindow(windowEl) {
  windowZ += 1;
  windowEl.style.zIndex = String(windowZ);
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
    addDownloadFile();
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
    maybeAward("installer", "Installer", "Clicker96 installed.");
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

    earnProgress.style.width = `${progress * 100}%`;
    updateEstimate(duration, elapsed);

    if (progress >= 1) {
      totalMoney += 1;
      updateMoneyDisplay();
      saveCurrentSlot();
      startTime = Date.now();
      earnProgress.style.width = "0%";
      maybeAward("first-dollar", "First Dollar", "Earned your first $1.");
    }
  }, 1000);
}

function updateEstimate(duration, elapsed) {
  const remaining = Math.max(duration - elapsed, 0);
  const accuracyIndex = Math.min(getEstimateLevel(), accuracyLevels.length - 1);
  const accuracy = accuracyLevels[accuracyIndex];
  const noise = 1 + (accuracyIndex === 0 ? 0.25 : accuracyIndex === 1 ? 0.15 : accuracyIndex === 2 ? 0.08 : 0.03);
  const noisyRemaining = remaining * noise;
  const minutes = Math.floor(noisyRemaining / 60000);
  const seconds = Math.floor((noisyRemaining % 60000) / 1000);
  timeEstimate.textContent = `~${minutes}m ${seconds}s`;
  estimateAccuracy.textContent = accuracy;
}

function getEstimateLevel() {
  return 0;
}

function nudgeProgressBar() {
  if (!startTime) {
    return;
  }
  startTime -= 1000;
  const rotate = Math.floor(Math.random() * 7) - 3;
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
  scheduleEmail();
}

function updateMoneyDisplay() {
  const formatted = `$${totalMoney.toFixed(2)}`;
  moneyDisplay.textContent = formatted;
}

function currentSlotKey() {
  return `clicker96_save_slot_${currentSlot}`;
}

function getSlotData() {
  const raw = localStorage.getItem(currentSlotKey());
  if (!raw) {
    return null;
  }
  return JSON.parse(raw);
}

function loadSlot() {
  const data = getSlotData();
  if (!data) {
    totalMoney = 0;
    downloads = [];
    trash = [];
    achievements = [];
    updateMoneyDisplay();
    renderDownloads();
    renderTrash();
    return false;
  }
  totalMoney = data.totalMoney ?? 0;
  downloads = data.downloads ?? [];
  trash = data.trash ?? [];
  achievements = data.achievements ?? [];
  updateMoneyDisplay();
  renderDownloads();
  renderTrash();
  return true;
}

function saveCurrentSlot() {
  const data = {
    totalMoney,
    downloads,
    trash,
    achievements,
  };
  localStorage.setItem(currentSlotKey(), JSON.stringify(data));
  refreshTitleAction();
}

function startGameAction() {
  const exists = !!getSlotData();
  if (!exists) {
    totalMoney = 0;
    downloads = [];
    trash = [];
    achievements = [];
    updateMoneyDisplay();
    saveCurrentSlot();
  } else {
    loadSlot();
  }
  openLoginScreen();
}

function switchSlot() {
  currentSlot = currentSlot === 3 ? 1 : currentSlot + 1;
  slotLabel.textContent = String(currentSlot);
  settingsSlotLabel.textContent = String(currentSlot);
  refreshTitleAction();
}

function refreshTitleAction() {
  const exists = !!getSlotData();
  startButton.textContent = exists ? "Continue" : "New Game";
  titleStatus.textContent = exists
    ? "Save detected."
    : "No save data found for this slot.";
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

function addDownloadFile() {
  const count = downloads.length + 1;
  const name = count === 1 ? "clicker96.zip" : `clicker96 (${count}).zip`;
  downloads.push({ id: Date.now(), name });
  downloadsIcon.classList.remove("hidden");
  renderDownloads();
  saveCurrentSlot();
}

function renderDownloads() {
  downloadList.innerHTML = "";
  downloads.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "file";
    button.innerHTML = `<span class="file-icon zip"></span>${item.name}`;
    button.addEventListener("click", () => {
      showWindow(zipWindow);
    });
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      moveToTrash(item.id, "download");
    });
    li.appendChild(button);
    downloadList.appendChild(li);
  });
}

function renderTrash() {
  trashList.innerHTML = "";
  trash.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "file";
    button.innerHTML = `<span class="file-icon zip"></span>${item.name}`;
    button.addEventListener("click", () => {
      showWindow(trashWindow);
    });
    li.appendChild(button);
    trashList.appendChild(li);
  });
  trashStatus.textContent = trash.length
    ? "Right-click the Trash icon to empty."
    : "Trash is empty.";
}

function moveToTrash(id, type) {
  if (type === "download") {
    const index = downloads.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    const [removed] = downloads.splice(index, 1);
    trash.push(removed);
    renderDownloads();
    renderTrash();
    saveCurrentSlot();
  }
}

function emptyTrash() {
  trash = [];
  renderTrash();
  saveCurrentSlot();
}

function deleteSaveData() {
  localStorage.removeItem(currentSlotKey());
  loadSlot();
  refreshTitleAction();
  settingsStatus.textContent = "Save data deleted.";
}

function openSettings() {
  titleOverlay.classList.add("hidden");
  desktop.classList.remove("hidden");
  showWindow(settingsWindow);
  settingsSlotLabel.textContent = String(currentSlot);
}

function setupWindowDragging() {
  const headers = document.querySelectorAll(".window-header");
  headers.forEach((header) => {
    header.addEventListener("mousedown", (event) => {
      if (event.target.closest("button")) {
        return;
      }
      const windowEl = header.closest(".window");
      if (!windowEl) {
        return;
      }
      focusWindow(windowEl);
      const rect = windowEl.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      function onMove(moveEvent) {
        windowEl.style.left = `${moveEvent.clientX - offsetX}px`;
        windowEl.style.top = `${moveEvent.clientY - offsetY}px`;
      }

      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      }

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  });
}

function setupIconDragging() {
  const icons = document.querySelectorAll(".icon");
  icons.forEach((icon, index) => {
    icon.style.position = "absolute";
    if (!icon.dataset.gridX) {
      const column = 0;
      const row = index;
      icon.dataset.gridX = String(column);
      icon.dataset.gridY = String(row);
    }
    snapIcon(icon);

    icon.addEventListener("mousedown", (event) => {
      if (event.button !== 0) {
        return;
      }
      const rect = icon.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      function onMove(moveEvent) {
        icon.style.left = `${moveEvent.clientX - offsetX}px`;
        icon.style.top = `${moveEvent.clientY - offsetY}px`;
      }

      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        snapIcon(icon);
      }

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  });
}

function snapIcon(icon) {
  const left = parseFloat(icon.style.left);
  const top = parseFloat(icon.style.top);
  const gridX = Number.isFinite(left)
    ? Math.max(0, Math.round(left / gridSize.x))
    : Number(icon.dataset.gridX || 0);
  const gridY = Number.isFinite(top)
    ? Math.max(0, Math.round(top / gridSize.y))
    : Number(icon.dataset.gridY || 0);
  icon.dataset.gridX = String(gridX);
  icon.dataset.gridY = String(gridY);
  icon.style.left = `${gridX * gridSize.x}px`;
  icon.style.top = `${gridY * gridSize.y}px`;
}

function showToast(title, body) {
  toastTitle.textContent = title;
  toastBody.textContent = body;
  toast.classList.remove("hidden");
  if (lastToastTimeout) {
    clearTimeout(lastToastTimeout);
  }
  lastToastTimeout = setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
}

function maybeAward(id, title, body) {
  if (achievements.includes(id)) {
    return;
  }
  achievements.push(id);
  saveCurrentSlot();
  showToast(title, body);
}

function scheduleEmail() {
  if (hasEmail) {
    return;
  }
  mailBadge.classList.add("hidden");
  downloadAttachment.classList.add("hidden");
  mailBody.textContent = "Inbox empty. No new mail yet.";
  if (emailTimer) {
    clearTimeout(emailTimer);
  }
  emailTimer = setTimeout(() => {
    hasEmail = true;
    mailBadge.classList.remove("hidden");
    downloadAttachment.classList.remove("hidden");
    mailBody.textContent =
      "Check out this game I made. It's a little suspicious, but it works. The zip is attached.";
    showToast("New Mail", "Old Friend sent clicker96.zip");
  }, 5000);
}

bootOverlay.addEventListener("click", handleBootAdvance);
setTimeout(() => {
  if (bootState === "boot") {
    handleBootAdvance();
  }
}, 1000);

startButton.addEventListener("click", startGameAction);
switchSlotButton.addEventListener("click", switchSlot);
settingsButton.addEventListener("click", openSettings);
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
  if (hasEmail) {
    mailBadge.classList.add("hidden");
    hasEmail = false;
  }
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

deleteSaveButton.addEventListener("click", deleteSaveData);

trashIcon.addEventListener("click", () => {
  showWindow(trashWindow);
});

trashIcon.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  emptyTrash();
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const targetId = event.currentTarget.dataset.close;
    const windowEl = document.getElementById(targetId);
    hideWindow(windowEl);
    if (targetId === "settingsWindow") {
      titleOverlay.classList.remove("hidden");
      desktop.classList.add("hidden");
    }
  });
});

updateClock();
setInterval(updateClock, 1000);
refreshTitleAction();
loadSlot();
setupWindowDragging();
setupIconDragging();
renderTaskbarWindows();
