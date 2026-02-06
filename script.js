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
const mailSender = document.getElementById("mailSender");
const downloadAttachment = document.getElementById("downloadAttachment");
const houseAttachment = document.getElementById("houseAttachment");
const downloadWindow = document.getElementById("downloadWindow");
const downloadStatus = document.getElementById("downloadStatus");
const downloadProgress = document.getElementById("downloadProgress");
const retryDownload = document.getElementById("retryDownload");
const downloadsIcon = document.getElementById("downloadsIcon");
const explorerWindow = document.getElementById("explorerWindow");
const downloadList = document.getElementById("downloadList");
const zipWindow = document.getElementById("zipWindow");
const installerFile = document.getElementById("installerFile");
const installerWindow = document.getElementById("installerWindow");
const installProgress = document.getElementById("installProgress");
const installStatus = document.getElementById("installStatus");
const clickerIcon = document.getElementById("clickerIcon");
const internetIcon = document.getElementById("internetIcon");
const casinoIcon = document.getElementById("casinoIcon");
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
const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastBody = document.getElementById("toastBody");
const confirmCloseWindow = document.getElementById("confirmCloseWindow");
const confirmCloseYes = document.getElementById("confirmCloseYes");
const confirmCloseNo = document.getElementById("confirmCloseNo");
const comboMeter = document.getElementById("comboMeter");
const comboValue = document.getElementById("comboValue");
const comboFill = document.getElementById("comboFill");
const casinoWindow = document.getElementById("casinoWindow");
const casinoBetInput = document.getElementById("casinoBetInput");
const casinoCoinflip = document.getElementById("casinoCoinflip");
const casinoBlackjack = document.getElementById("casinoBlackjack");
const casinoDouble = document.getElementById("casinoDouble");
const casinoStatus = document.getElementById("casinoStatus");
const iconsContainer = document.querySelector(".icons");
const levelEstimator = document.getElementById("level-estimator");
const levelBarTuner = document.getElementById("level-bar-tuner");
const levelAutoClick = document.getElementById("level-auto-click");
const levelMultiWindow = document.getElementById("level-multi-window");

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
let comboMultiplier = 1;
let comboClicks = 0;
let comboTimeout = null;
let comboDrainInterval = null;
let comboRemaining = 10000;
let mailStage = 0;
let totalClicks = 0;
let blackjackPending = 0;
let downloadRetryCount = 0;
let upgrades = {
  estimator: 0,
  barTuner: 0,
  autoClick: 0,
  multiWindow: 0,
};
const wrongPasswordMessages = [
  "Access denied. Try again.",
  "Password mismatch.",
  "Invalid login credentials.",
  "Hmm... that didn't work.",
];

const gridSize = { x: 88, y: 92 };
const accuracyLevels = ["low", "medium", "high", "precise"];
const iconDefaults = {
  mailIcon: { x: 0, y: 0 },
  internetIcon: { x: 0, y: 1 },
  downloadsIcon: { x: 0, y: 2 },
  clickerIcon: { x: 0, y: 3 },
  casinoIcon: { x: 0, y: 4 },
  trashIcon: { x: 0, y: 5 },
};
const upgradeConfigs = {
  estimator: { max: 3, base: 1, scale: 2, levelEl: levelEstimator },
  "bar-tuner": { max: null, base: 1, scale: 1.4, levelEl: levelBarTuner },
  "auto-click": { max: 5, base: 3, scale: 1.8, levelEl: levelAutoClick },
  "multi-window": { max: null, base: 6, scale: 1.6, levelEl: levelMultiWindow },
};

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
  downloadRetryCount = 0;
  retryDownload.classList.add("hidden");
  downloadProgress.style.width = "0%";
  downloadStatus.textContent = "Downloading clicker96.zip...";

  setTimeout(() => {
    downloadProgress.style.width = "30%";
    downloadStatus.textContent = "Stutter detected...";
  }, 1500);

  setTimeout(() => {
    downloadProgress.style.width = "45%";
    downloadStatus.textContent = "Download failed. Connection lost.";
    retryDownload.classList.remove("hidden");
  }, 3000);
}

function retryDownloadSequence() {
  retryDownload.classList.add("hidden");
  downloadRetryCount += 1;
  downloadStatus.textContent = "Retrying...";
  downloadProgress.style.width = "10%";

  if (downloadRetryCount < 2) {
    setTimeout(() => {
      downloadProgress.style.width = "50%";
      downloadStatus.textContent = "Download failed again.";
      retryDownload.classList.remove("hidden");
    }, 2000);
    return;
  }

  setTimeout(() => {
    downloadProgress.style.width = "100%";
    downloadStatus.textContent = "Download complete. clicker96.zip saved.";
    addDownloadFile();
  }, 2500);
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
    if (clickerIcon.classList.contains("hidden")) {
      clickerIcon.classList.remove("hidden");
      ensureIconPlacement(clickerIcon);
    } else {
      spawnClickerIcon();
    }
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
    if (upgrades.autoClick > 0) {
      startTime -= upgrades.autoClick * 200;
    }
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
      handleFriendFollowup();
      handleHouseMail();
    }
  }, 1000);
}

function updateEstimate(duration, elapsed) {
  const remaining = Math.max(duration - elapsed, 0);
  const accuracyIndex = Math.min(getEstimateLevel(), accuracyLevels.length - 1);
  const baseNoise =
    accuracyIndex === 0 ? 0.35 : accuracyIndex === 1 ? 0.2 : accuracyIndex === 2 ? 0.12 : 0.05;
  const variance = (Math.random() * 2 - 1) * baseNoise;
  const noisyRemaining = remaining * (1 + variance);
  const minutes = Math.floor(noisyRemaining / 60000);
  const seconds = Math.floor((noisyRemaining % 60000) / 1000);
  timeEstimate.textContent = `~${minutes}m ${seconds}s`;
}

function getEstimateLevel() {
  return upgrades.estimator;
}

function nudgeProgressBar() {
  if (!startTime) {
    return;
  }
  totalClicks += 1;
  updateCombo();
  const tunerBoost = 1 + upgrades.barTuner * 0.05;
  startTime -= 1000 * comboMultiplier * tunerBoost;
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
  comboValue.classList.remove("shake");
  void comboValue.offsetWidth;
  comboValue.classList.add("shake");
  maybeAward("clicker", "Click Starter", "You started clicking.");
}

function updateCombo() {
  comboClicks = Math.min(comboClicks + 1, 100);
  comboMultiplier = Math.min(1 + comboClicks * 0.01, 2);
  comboRemaining = 10000;
  comboMeter.classList.remove("hidden");
  comboValue.textContent = `${comboMultiplier.toFixed(2)}x`;
  comboFill.style.width = "100%";
  if (comboDrainInterval) {
    clearInterval(comboDrainInterval);
  }
  comboDrainInterval = setInterval(() => {
    comboRemaining -= 100;
    const percentage = Math.max(comboRemaining / 10000, 0);
    comboFill.style.width = `${percentage * 100}%`;
    if (comboRemaining <= 0) {
      clearInterval(comboDrainInterval);
      resetCombo();
    }
  }, 100);
  if (comboTimeout) {
    clearTimeout(comboTimeout);
  }
  comboTimeout = setTimeout(resetCombo, 10000);
}

function resetCombo() {
  comboClicks = 0;
  comboMultiplier = 1;
  comboRemaining = 10000;
  comboMeter.classList.add("hidden");
  comboFill.style.width = "0%";
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
  refreshUpgrades();
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
    upgrades = {
      estimator: 0,
      barTuner: 0,
      autoClick: 0,
      multiWindow: 0,
    };
    updateMoneyDisplay();
    renderDownloads();
    renderTrash();
    return false;
  }
  totalMoney = data.totalMoney ?? 0;
  downloads = data.downloads ?? [];
  trash = data.trash ?? [];
  achievements = data.achievements ?? [];
  upgrades = data.upgrades ?? upgrades;
  upgrades.estimator = Number(upgrades.estimator) || 0;
  upgrades.barTuner = Number(upgrades.barTuner) || 0;
  upgrades.autoClick = Number(upgrades.autoClick) || 0;
  upgrades.multiWindow = Number(upgrades.multiWindow) || 0;
  mailStage = data.mailStage ?? 0;
  updateMoneyDisplay();
  renderDownloads();
  renderTrash();
  if (downloads.length > 0) {
    downloadsIcon.classList.remove("hidden");
    ensureIconPlacement(downloadsIcon);
  }
  setMailContent();
  return true;
}

function saveCurrentSlot() {
  const data = {
    totalMoney,
    downloads,
    trash,
    achievements,
    upgrades,
    mailStage,
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
    upgrades = {
      estimator: 0,
      barTuner: 0,
      autoClick: 0,
      multiWindow: 0,
    };
    mailStage = 0;
    downloadsIcon.classList.add("hidden");
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
  if (value !== "123456") {
    const message =
      wrongPasswordMessages[Math.floor(Math.random() * wrongPasswordMessages.length)];
    loginStatus.textContent = message;
    return;
  }
  loginStatus.textContent = "Welcome back.";
  proceedToDesktop();
}

function addDownloadFile() {
  const count = downloads.length + 1;
  const name = count === 1 ? "clicker96.zip" : `clicker96 (${count}).zip`;
  downloads.push({ id: Date.now(), name });
  if (downloadsIcon.classList.contains("hidden")) {
    downloadsIcon.classList.remove("hidden");
    ensureIconPlacement(downloadsIcon);
  }
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
  titleOverlay.classList.remove("hidden");
  desktop.classList.add("hidden");
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
    registerIcon(icon, index);
  });
}

function registerIcon(icon, index = 0) {
  icon.style.position = "absolute";
  if (!icon.dataset.gridX) {
    const defaults = iconDefaults[icon.id];
    const column = defaults ? defaults.x : 0;
    const row = defaults ? defaults.y : index;
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
  placeIcon(icon, gridX, gridY, true);
}

function getMaxRows() {
  if (!iconsContainer) {
    return 6;
  }
  return Math.max(1, Math.floor(iconsContainer.clientHeight / gridSize.y) - 1);
}

function getMaxCols() {
  if (!iconsContainer) {
    return 3;
  }
  return Math.max(1, Math.floor(iconsContainer.clientWidth / gridSize.x) - 1);
}

function getKey(x, y) {
  return `${x},${y}`;
}

function buildOccupancy(excludeIcon) {
  const map = new Map();
  document.querySelectorAll(".icon").forEach((icon) => {
    if (icon === excludeIcon) {
      return;
    }
    if (icon.classList.contains("hidden")) {
      return;
    }
    const x = Number(icon.dataset.gridX || 0);
    const y = Number(icon.dataset.gridY || 0);
    map.set(getKey(x, y), icon);
  });
  return map;
}

function findNextFree(startX, startY, occupancy) {
  const maxCols = getMaxCols();
  const maxRows = getMaxRows();
  for (let x = startX; x <= maxCols; x += 1) {
    for (let y = startY; y <= maxRows; y += 1) {
      if (!occupancy.has(getKey(x, y))) {
        return { x, y };
      }
    }
    startY = 0;
  }
  return { x: maxCols + 1, y: 0 };
}

function setIconPosition(icon, x, y) {
  icon.dataset.gridX = String(x);
  icon.dataset.gridY = String(y);
  icon.style.left = `${x * gridSize.x}px`;
  icon.style.top = `${y * gridSize.y}px`;
}

function placeIcon(icon, gridX, gridY, allowPush) {
  const occupancy = buildOccupancy(icon);
  const key = getKey(gridX, gridY);
  if (occupancy.has(key)) {
    if (allowPush) {
      const occupant = occupancy.get(key);
      const next = findNextFree(gridX, gridY + 1, occupancy);
      setIconPosition(occupant, next.x, next.y);
      occupancy.delete(key);
      occupancy.set(getKey(next.x, next.y), occupant);
      setIconPosition(icon, gridX, gridY);
      return;
    }
    const next = findNextFree(gridX, gridY + 1, occupancy);
    setIconPosition(icon, next.x, next.y);
    return;
  }
  setIconPosition(icon, gridX, gridY);
}

function ensureIconPlacement(icon) {
  const defaults = iconDefaults[icon.id] || { x: 0, y: 0 };
  placeIcon(icon, defaults.x, defaults.y, false);
}

function initIconGrid() {
  document.querySelectorAll(".icon").forEach((icon) => {
    if (!icon.classList.contains("hidden")) {
      ensureIconPlacement(icon);
    }
  });
}

function spawnClickerIcon() {
  if (!iconsContainer) {
    return;
  }
  const count = document.querySelectorAll(".icon.clicker-clone").length + 2;
  const icon = document.createElement("button");
  icon.className = "icon clicker-clone";
  icon.innerHTML = `<span class=\"icon-image clicker\"></span>Clicker96 (${count})`;
  icon.addEventListener("click", () => {
    showWindow(clickerWindow);
    if (!earnInterval) {
      startEarning();
    }
  });
  iconsContainer.appendChild(icon);
  registerIcon(icon, count);
  placeIcon(icon, iconDefaults.clickerIcon.x, iconDefaults.clickerIcon.y, false);
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
  if (mailStage >= 1) {
    setMailContent();
    return;
  }
  mailBadge.classList.add("hidden");
  mailBody.textContent = "Inbox empty. No new mail yet.";
  downloadAttachment.classList.add("hidden");
  houseAttachment.classList.add("hidden");
  if (emailTimer) {
    clearTimeout(emailTimer);
  }
  emailTimer = setTimeout(() => {
    if (mailStage < 1) {
      mailStage = 1;
      hasEmail = true;
      mailBadge.classList.remove("hidden");
      setMailContent();
      showToast("New Mail", "Old Friend sent clicker96.zip");
      saveCurrentSlot();
    }
  }, 5000);
}

function handleFriendFollowup() {
  if (mailStage >= 2) {
    return;
  }
  mailStage = 2;
  hasEmail = true;
  mailBadge.classList.remove("hidden");
  setMailContent();
  showToast("New Mail", "Old Friend: Pretty cool right?");
  saveCurrentSlot();
}

function handleHouseMail() {
  if (mailStage >= 3 || totalMoney < 5) {
    return;
  }
  mailStage = 3;
  hasEmail = true;
  mailBadge.classList.remove("hidden");
  casinoIcon.classList.remove("hidden");
  ensureIconPlacement(casinoIcon);
  setMailContent();
  showToast("New Mail", "The House is inviting you in.");
  saveCurrentSlot();
}

function setMailContent() {
  if (mailStage === 0) {
    mailSender.textContent = "System";
    mailBody.textContent = "Inbox empty. No new mail yet.";
    downloadAttachment.classList.add("hidden");
    houseAttachment.classList.add("hidden");
    return;
  }
  if (mailStage === 1) {
    mailSender.textContent = "Old Friend";
    mailBody.textContent =
      "Check out this game I made. It's a little suspicious, but it works. The zip is attached.";
    downloadAttachment.classList.remove("hidden");
    houseAttachment.classList.add("hidden");
    return;
  }
  if (mailStage === 2) {
    mailSender.textContent = "Old Friend";
    mailBody.textContent = "What do you think? Pretty cool right?";
    downloadAttachment.classList.add("hidden");
    houseAttachment.classList.add("hidden");
    return;
  }
  if (mailStage >= 3) {
    mailSender.textContent = "The House";
    mailBody.textContent =
      "The House is open. Care to test your luck? Attached is a new game.";
    downloadAttachment.classList.add("hidden");
    houseAttachment.classList.remove("hidden");
    casinoIcon.classList.remove("hidden");
    ensureIconPlacement(casinoIcon);
  }
}

function refreshUpgrades() {
  document.querySelectorAll(".upgrade").forEach((button) => {
    const key = button.dataset.upgrade;
    const config = upgradeConfigs[key];
    const level = getUpgradeLevel(key);
    const max = config.max;
    const cost = getUpgradeCost(key);
    button.dataset.cost = String(cost);
    button.textContent = `Buy - $${cost}`;
    const isMaxed = max !== null && level >= max;
    button.disabled = isMaxed || totalMoney < cost;
    const levelText = max === null ? `LVL ${level}/∞` : `LVL ${level}/${max}`;
    config.levelEl.textContent = levelText;
  });
}

function applyUpgrade(key) {
  if (key === "estimator") {
    upgrades.estimator = Math.min(upgrades.estimator + 1, 3);
  }
  if (key === "bar-tuner") {
    upgrades.barTuner += 1;
  }
  if (key === "auto-click") {
    upgrades.autoClick = Math.min(upgrades.autoClick + 1, 5);
  }
  if (key === "multi-window") {
    upgrades.multiWindow += 1;
  }
  saveCurrentSlot();
  refreshUpgrades();
  showToast("Upgrade", "Upgrade installed.");
}

function handleUpgradeClick(event) {
  const button = event.currentTarget;
  const cost = getUpgradeCost(button.dataset.upgrade);
  const config = upgradeConfigs[button.dataset.upgrade];
  const level = getUpgradeLevel(button.dataset.upgrade);
  if (config.max !== null && level >= config.max) {
    return;
  }
  if (totalMoney < cost) {
    return;
  }
  totalMoney -= cost;
  updateMoneyDisplay();
  applyUpgrade(button.dataset.upgrade);
}

function getUpgradeLevel(key) {
  if (key === "estimator") {
    return upgrades.estimator;
  }
  if (key === "bar-tuner") {
    return upgrades.barTuner;
  }
  if (key === "auto-click") {
    return upgrades.autoClick;
  }
  if (key === "multi-window") {
    return upgrades.multiWindow;
  }
  return 0;
}

function getUpgradeCost(key) {
  const config = upgradeConfigs[key];
  const level = getUpgradeLevel(key);
  return Math.ceil(config.base * Math.pow(config.scale, level));
}

function getBetAmount() {
  const raw = Number(casinoBetInput.value);
  if (!Number.isFinite(raw) || raw <= 0) {
    casinoStatus.textContent = "Enter a valid bet amount.";
    return null;
  }
  if (raw > totalMoney) {
    casinoStatus.textContent = "Not enough funds.";
    return null;
  }
  return Math.floor(raw);
}

function resolveSimpleBet(label, winChance = 0.5) {
  const bet = getBetAmount();
  if (!bet) {
    return;
  }
  blackjackPending = 0;
  casinoDouble.classList.add("hidden");
  const win = Math.random() < winChance;
  totalMoney += win ? bet : -bet;
  updateMoneyDisplay();
  saveCurrentSlot();
  casinoStatus.textContent = win
    ? `${label}: You won $${bet}.`
    : `${label}: You lost $${bet}.`;
}

function resolveBlackjack() {
  const bet = blackjackPending || getBetAmount();
  if (!bet) {
    return;
  }
  if (bet > totalMoney) {
    casinoStatus.textContent = "Not enough funds for the double.";
    blackjackPending = 0;
    casinoDouble.classList.add("hidden");
    return;
  }
  const win = Math.random() < 0.5;
  totalMoney += win ? bet : -bet;
  updateMoneyDisplay();
  saveCurrentSlot();
  if (win) {
    blackjackPending = bet * 2;
    casinoStatus.textContent = `Blackjack win! Double to $${blackjackPending}?`;
    casinoDouble.classList.remove("hidden");
  } else {
    blackjackPending = 0;
    casinoDouble.classList.add("hidden");
    casinoStatus.textContent = `Blackjack lost $${bet}.`;
  }
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

houseAttachment.addEventListener("click", () => {
  casinoIcon.classList.remove("hidden");
  ensureIconPlacement(casinoIcon);
  showWindow(casinoWindow);
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

installerFile.addEventListener("click", () => {
  startInstallSequence();
});

casinoIcon.addEventListener("click", () => {
  showWindow(casinoWindow);
});

casinoCoinflip.addEventListener("click", () => {
  resolveSimpleBet("50/50");
});

casinoBlackjack.addEventListener("click", () => {
  resolveBlackjack();
});

casinoDouble.addEventListener("click", () => {
  resolveBlackjack();
});

clickerIcon.addEventListener("click", () => {
  showWindow(clickerWindow);
  if (!earnInterval) {
    startEarning();
  }
});

document.querySelectorAll(".upgrade").forEach((button) => {
  button.addEventListener("click", handleUpgradeClick);
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

confirmCloseYes.addEventListener("click", () => {
  hideWindow(confirmCloseWindow);
  hideWindow(clickerWindow);
  if (earnInterval) {
    clearInterval(earnInterval);
    earnInterval = null;
  }
  startTime = null;
  earnProgress.style.width = "0%";
  resetCombo();
});

confirmCloseNo.addEventListener("click", () => {
  hideWindow(confirmCloseWindow);
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const targetId = event.currentTarget.dataset.close;
    const windowEl = document.getElementById(targetId);
    if (targetId === "clickerWindow") {
      showWindow(confirmCloseWindow);
      return;
    }
    hideWindow(windowEl);
    if (targetId === "settingsWindow") {
      titleOverlay.classList.remove("hidden");
      desktop.classList.add("hidden");
    }
  });
});

document.querySelectorAll(".window").forEach((windowEl) => {
  windowEl.addEventListener("mousedown", () => {
    focusWindow(windowEl);
  });
});

updateClock();
setInterval(updateClock, 1000);
refreshTitleAction();
loadSlot();
setupWindowDragging();
setupIconDragging();
initIconGrid();
renderTaskbarWindows();
refreshUpgrades();
