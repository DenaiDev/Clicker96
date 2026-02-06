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
const decorationsLayer = document.getElementById("decorationsLayer");
const shopTabs = document.getElementById("shopTabs");
const achievementList = document.getElementById("achievementList");
const cosmeticShopList = document.getElementById("cosmeticShopList");
const openCosmetics = document.getElementById("openCosmetics");
const cosmeticsWindow = document.getElementById("cosmeticsWindow");
const ownedCosmetics = document.getElementById("ownedCosmetics");
const iconContextMenu = document.getElementById("iconContextMenu");
const deleteIconButton = document.getElementById("deleteIconButton");
const levelEstimator = document.getElementById("level-estimator");
const levelBarTuner = document.getElementById("level-bar-tuner");
const levelAutoClick = document.getElementById("level-auto-click");
const levelMultiWindow = document.getElementById("level-multi-window");
const levelPayoutBoost = document.getElementById("level-payout-boost");
const levelTimeReducer = document.getElementById("level-time-reducer");

const clickerInstances = new Map();
let clickerInstanceId = 0;
let pendingCloseWindow = null;
let popTimeout = null;
let totalMoney = 0;
let currentSlot = 1;
let bootState = "boot";
let downloads = [];
let trash = [];
let openedWindows = new Set();
let achievements = [];
let cosmetics = { owned: [], placed: {}, positions: {}, background: "default" };
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
let casinoBets = 0;
let iconKeyCounter = 0;
let isLoadingSlot = false;
let upgrades = {
  estimator: 0,
  barTuner: 0,
  autoClick: 0,
  multiWindow: 0,
  payoutBoost: 0,
  timeReducer: 0,
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
  "payout-boost": { max: null, base: 5, scale: 2, levelEl: levelPayoutBoost },
  "time-reducer": { max: 25, base: 20, scale: 1.6, levelEl: levelTimeReducer },
};

const achievementConfigs = [
  { id: "first-dollar", title: "First Dollar", description: "Earned your first $1." },
  { id: "clicker", title: "Click Starter", description: "You started clicking." },
  { id: "installer", title: "Installer", description: "Clicker96 installed." },
  { id: "ten-bucks", title: "Double Digits", description: "Hit $10 total." },
  { id: "fifty-bucks", title: "Saver", description: "Hit $50 total." },
  { id: "hundred-bucks", title: "Big League", description: "Hit $100 total." },
  { id: "upgrade-fiend", title: "Upgrade Fiend", description: "Bought 5 upgrades." },
  { id: "decorator", title: "Decorator", description: "Bought your first cosmetic." },
  { id: "dual-wield", title: "Dual Wield", description: "Opened two Clicker96 windows." },
  { id: "casino-regular", title: "Casino Regular", description: "Placed 5 casino bets." },
  { id: "rapid-clicker", title: "Rapid Clicker", description: "Clicked the bar 25 times." },
];

const cosmeticCatalog = [
  {
    id: "neon-plant",
    title: "Neon Plant",
    description: "A glow-in-the-dark house plant.",
    cost: 8,
    type: "decor",
  },
  {
    id: "retro-poster",
    title: "Retro Poster",
    description: "A vintage gaming poster for your wall.",
    cost: 12,
    type: "decor",
  },
  {
    id: "desk-toy",
    title: "Desk Toy",
    description: "Click to spin this tiny toy.",
    cost: 6,
    type: "fidget",
  },
  {
    id: "lava-lamp",
    title: "Lava Lamp",
    description: "Slow, soothing bubbles.",
    cost: 18,
    type: "decor",
  },
  {
    id: "sunset-wallpaper",
    title: "Sunset Wallpaper",
    description: "Warm up the desktop background.",
    cost: 25,
    type: "background",
  },
];

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
    saveCurrentSlot();
  }, 1400);
}

function getEarnDuration() {
  const baseDuration = 5 * 60 * 1000;
  const reduction = Math.min(upgrades.timeReducer, 25) * 10000;
  return Math.max(baseDuration - reduction, 50000);
}

function getEarnPayout() {
  return 1 + upgrades.payoutBoost;
}

function startEarning(instance) {
  instance.startTime = Date.now();
  if (instance.interval) {
    clearInterval(instance.interval);
  }

  instance.interval = setInterval(() => {
    if (upgrades.autoClick > 0) {
      instance.startTime -= upgrades.autoClick * 200;
    }
    const duration = getEarnDuration();
    const elapsed = Date.now() - instance.startTime;
    const progress = Math.min(elapsed / duration, 1);

    instance.progress.style.width = `${progress * 100}%`;
    updateEstimate(instance.estimate, duration, elapsed);

    if (progress >= 1) {
      totalMoney += getEarnPayout();
      updateMoneyDisplay();
      saveCurrentSlot();
      instance.startTime = Date.now();
      instance.progress.style.width = "0%";
      maybeAward("first-dollar", "First Dollar", "Earned your first $1.");
      handleFriendFollowup();
      handleHouseMail();
    }
  }, 1000);
}

function updateEstimate(estimateEl, duration, elapsed) {
  if (!estimateEl) {
    return;
  }
  const remaining = Math.max(duration - elapsed, 0);
  const accuracyIndex = Math.min(getEstimateLevel(), accuracyLevels.length - 1);
  const baseNoise =
    accuracyIndex === 0 ? 0.35 : accuracyIndex === 1 ? 0.2 : accuracyIndex === 2 ? 0.12 : 0.05;
  const variance = (Math.random() * 2 - 1) * baseNoise;
  const noisyRemaining = remaining * (1 + variance);
  const minutes = Math.floor(noisyRemaining / 60000);
  const seconds = Math.floor((noisyRemaining % 60000) / 1000);
  estimateEl.textContent = `~${minutes}m ${seconds}s`;
}

function getEstimateLevel() {
  return upgrades.estimator;
}

function nudgeProgressBar(instance) {
  if (!instance.startTime) {
    return;
  }
  totalClicks += 1;
  updateCombo();
  const tunerBoost = 1 + upgrades.barTuner * 0.05;
  instance.startTime -= 1000 * comboMultiplier * tunerBoost;
  const rotate = Math.floor(Math.random() * 7) - 3;
  instance.bar.classList.remove("pop");
  void instance.bar.offsetWidth;
  instance.bar.style.setProperty("--pop-rotate", `${rotate}deg`);
  instance.bar.classList.add("pop");
  if (popTimeout) {
    clearTimeout(popTimeout);
  }
  popTimeout = setTimeout(() => {
    instance.bar.classList.remove("pop");
  }, 200);
  comboValue.classList.remove("shake");
  void comboValue.offsetWidth;
  comboValue.classList.add("shake");
  maybeAward("clicker", "Click Starter", "You started clicking.");
  if (totalClicks >= 25) {
    maybeAward("rapid-clicker", "Rapid Clicker", "Clicked the bar 25 times.");
  }
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
  renderCosmeticShop();
  renderOwnedCosmetics();
  checkMoneyAchievements();
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
  isLoadingSlot = true;
  const data = getSlotData();
  if (!data) {
    totalMoney = 0;
    downloads = [];
    trash = [];
    achievements = [];
    cosmetics = { owned: [], placed: {}, positions: {}, background: "default" };
    upgrades = {
      estimator: 0,
      barTuner: 0,
      autoClick: 0,
      multiWindow: 0,
      payoutBoost: 0,
      timeReducer: 0,
    };
    casinoBets = 0;
    updateMoneyDisplay();
    renderDownloads();
    renderTrash();
    renderCosmetics();
    renderAchievements();
    applyDesktopState(null);
    isLoadingSlot = false;
    return false;
  }
  totalMoney = data.totalMoney ?? 0;
  downloads = data.downloads ?? [];
  trash = data.trash ?? [];
  achievements = data.achievements ?? [];
  cosmetics = data.cosmetics ?? cosmetics;
  cosmetics.owned = cosmetics.owned ?? [];
  cosmetics.placed = cosmetics.placed ?? {};
  cosmetics.positions = cosmetics.positions ?? {};
  cosmetics.background = cosmetics.background ?? "default";
  upgrades = data.upgrades ?? upgrades;
  upgrades.estimator = Number(upgrades.estimator) || 0;
  upgrades.barTuner = Number(upgrades.barTuner) || 0;
  upgrades.autoClick = Number(upgrades.autoClick) || 0;
  upgrades.multiWindow = Number(upgrades.multiWindow) || 0;
  upgrades.payoutBoost = Number(upgrades.payoutBoost) || 0;
  upgrades.timeReducer = Number(upgrades.timeReducer) || 0;
  mailStage = data.mailStage ?? 0;
  casinoBets = data.casinoBets ?? 0;
  updateMoneyDisplay();
  renderDownloads();
  renderTrash();
  renderCosmetics();
  renderAchievements();
  applyDesktopState(data.desktopState);
  if (downloads.length > 0) {
    downloadsIcon.classList.remove("hidden");
    ensureIconPlacement(downloadsIcon);
  }
  setMailContent();
  isLoadingSlot = false;
  return true;
}

function saveCurrentSlot() {
  const data = {
    totalMoney,
    downloads,
    trash,
    achievements,
    cosmetics,
    upgrades,
    mailStage,
    casinoBets,
    desktopState: collectDesktopState(),
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
    cosmetics = { owned: [], placed: {}, positions: {}, background: "default" };
    upgrades = {
      estimator: 0,
      barTuner: 0,
      autoClick: 0,
      multiWindow: 0,
      payoutBoost: 0,
      timeReducer: 0,
    };
    mailStage = 0;
    casinoBets = 0;
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

function registerWindowDragging(windowEl) {
  const header = windowEl.querySelector(".window-header");
  if (!header) {
    return;
  }
  header.addEventListener("mousedown", (event) => {
    if (event.target.closest("button")) {
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
}

function setupWindowDragging() {
  document.querySelectorAll(".window").forEach((windowEl) => {
    registerWindowDragging(windowEl);
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
  if (!icon.dataset.iconKey) {
    iconKeyCounter += 1;
    icon.dataset.iconKey = `icon-${iconKeyCounter}`;
  }
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
    icon.dataset.dragging = "false";
    const rect = icon.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const startX = event.clientX;
    const startY = event.clientY;
    let moved = false;

    function onMove(moveEvent) {
      if (
        Math.abs(moveEvent.clientX - startX) > 4 ||
        Math.abs(moveEvent.clientY - startY) > 4
      ) {
        moved = true;
      }
      icon.style.left = `${moveEvent.clientX - offsetX}px`;
      icon.style.top = `${moveEvent.clientY - offsetY}px`;
    }

    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (moved) {
        icon.dataset.dragging = "true";
        snapIcon(icon);
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });

  icon.addEventListener("contextmenu", (event) => {
    if (!icon.dataset.deletable) {
      return;
    }
    event.preventDefault();
    openIconContextMenu(icon, event.clientX, event.clientY);
  });
}

function wasIconDragged(icon) {
  if (icon.dataset.dragging === "true") {
    icon.dataset.dragging = "false";
    return true;
  }
  return false;
}

function openIconContextMenu(icon, x, y) {
  if (!iconContextMenu) {
    return;
  }
  iconContextMenu.dataset.targetKey = icon.dataset.iconKey || "";
  iconContextMenu.style.left = `${x}px`;
  iconContextMenu.style.top = `${y}px`;
  iconContextMenu.classList.remove("hidden");
}

function closeIconContextMenu() {
  if (!iconContextMenu) {
    return;
  }
  iconContextMenu.classList.add("hidden");
  delete iconContextMenu.dataset.targetKey;
}

function deleteIconTarget() {
  if (!iconContextMenu) {
    return;
  }
  let icon = null;
  if (iconContextMenu.dataset.targetKey) {
    icon = document.querySelector(`[data-icon-key="${iconContextMenu.dataset.targetKey}"]`);
  }
  if (!icon) {
    closeIconContextMenu();
    return;
  }
  if (icon.classList.contains("clicker-clone")) {
    icon.remove();
  } else {
    icon.classList.add("hidden");
  }
  saveCurrentSlot();
  closeIconContextMenu();
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
  if (!isLoadingSlot) {
    saveCurrentSlot();
  }
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

function findNextFree(occupancy) {
  const maxCols = getMaxCols();
  const maxRows = getMaxRows();
  for (let x = 0; x <= maxCols; x += 1) {
    for (let y = 0; y <= maxRows; y += 1) {
      if (!occupancy.has(getKey(x, y))) {
        return { x, y };
      }
    }
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
      const next = findNextFree(occupancy);
      setIconPosition(occupant, next.x, next.y);
      occupancy.delete(key);
      occupancy.set(getKey(next.x, next.y), occupant);
      setIconPosition(icon, gridX, gridY);
      return;
    }
    const next = findNextFree(occupancy);
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

function collectDesktopState() {
  const baseIcons = {};
  const clickerClones = [];
  document.querySelectorAll(".icon").forEach((icon) => {
    const state = {
      x: Number(icon.dataset.gridX || 0),
      y: Number(icon.dataset.gridY || 0),
      hidden: icon.classList.contains("hidden"),
    };
    if (icon.id) {
      baseIcons[icon.id] = state;
    } else if (icon.classList.contains("clicker-clone")) {
      clickerClones.push({
        ...state,
        label: icon.textContent.trim(),
      });
    }
  });
  return { baseIcons, clickerClones };
}

function createClickerIconClone(state, index) {
  const icon = document.createElement("button");
  icon.className = "icon clicker-clone";
  icon.dataset.deletable = "true";
  icon.dataset.gridX = String(state?.x ?? iconDefaults.clickerIcon.x);
  icon.dataset.gridY = String(state?.y ?? iconDefaults.clickerIcon.y);
  const label = state?.label || `Clicker96 (${index})`;
  icon.innerHTML = `<span class="icon-image clicker"></span>${label}`;
  icon.addEventListener("click", () => {
    if (wasIconDragged(icon)) {
      return;
    }
    openClickerInstance();
  });
  iconsContainer.appendChild(icon);
  registerIcon(icon, index);
  placeIcon(icon, Number(icon.dataset.gridX), Number(icon.dataset.gridY), false);
}

function applyDesktopState(state) {
  const baseIcons = state?.baseIcons ?? {};
  document.querySelectorAll(".icon.clicker-clone").forEach((icon) => {
    icon.remove();
  });
  const clones = state?.clickerClones ?? [];
  clones.forEach((cloneState, index) => {
    createClickerIconClone(cloneState, index + 2);
  });
  Object.keys(iconDefaults).forEach((id) => {
    const icon = document.getElementById(id);
    if (!icon) {
      return;
    }
    const saved = baseIcons[id];
    if (saved) {
      icon.classList.toggle("hidden", saved.hidden);
      placeIcon(icon, saved.x, saved.y, false);
      return;
    }
    if (id === "downloadsIcon" && downloads.length > 0) {
      icon.classList.remove("hidden");
    }
    if (id === "casinoIcon" && mailStage >= 3) {
      icon.classList.remove("hidden");
    }
    ensureIconPlacement(icon);
  });
}

function registerClickerInstance(windowEl) {
  const bar = windowEl.querySelector('[data-clicker="bar"]');
  const progress = windowEl.querySelector('[data-clicker="progress"]');
  const estimate = windowEl.querySelector('[data-clicker="estimate"]');
  const instance = {
    id: windowEl.id,
    windowEl,
    bar,
    progress,
    estimate,
    startTime: null,
    interval: null,
  };
  if (bar) {
    bar.addEventListener("click", () => {
      nudgeProgressBar(instance);
    });
  }
  clickerInstances.set(windowEl.id, instance);
  return instance;
}

function registerWindow(windowEl) {
  windowEl.addEventListener("mousedown", () => {
    focusWindow(windowEl);
  });
}

function createClickerWindowClone() {
  const clone = clickerWindow.cloneNode(true);
  clickerInstanceId += 1;
  clone.id = `clickerWindow-${clickerInstanceId}`;
  clone.dataset.windowType = "clicker";
  const closeButton = clone.querySelector("[data-close]");
  if (closeButton) {
    closeButton.dataset.close = clone.id;
    attachCloseHandler(closeButton);
  }
  clone.classList.add("hidden");
  clone.style.left = `${240 + clickerInstances.size * 20}px`;
  clone.style.top = `${120 + clickerInstances.size * 20}px`;
  desktop.appendChild(clone);
  registerWindow(clone);
  registerWindowDragging(clone);
  return registerClickerInstance(clone);
}

function getOpenClickerCount() {
  let count = 0;
  clickerInstances.forEach((instance) => {
    if (!instance.windowEl.classList.contains("hidden")) {
      count += 1;
    }
  });
  return count;
}

function openClickerInstance() {
  const maxWindows = 1 + upgrades.multiWindow;
  const openCount = getOpenClickerCount();
  if (openCount >= maxWindows) {
    showToast("Multi-Window Buffer", "Upgrade to open more Clicker96 windows.");
    return;
  }
  let instance = null;
  clickerInstances.forEach((existing) => {
    if (!instance && existing.windowEl.classList.contains("hidden")) {
      instance = existing;
    }
  });
  if (!instance) {
    instance = createClickerWindowClone();
  }
  showWindow(instance.windowEl);
  if (!instance.interval) {
    startEarning(instance);
  }
  if (openCount + 1 >= 2) {
    maybeAward("dual-wield", "Dual Wield", "Opened two Clicker96 windows.");
  }
}

function spawnClickerIcon() {
  if (!iconsContainer) {
    return;
  }
  const count = document.querySelectorAll(".icon.clicker-clone").length + 2;
  const icon = document.createElement("button");
  icon.className = "icon clicker-clone";
  icon.dataset.deletable = "true";
  icon.innerHTML = `<span class=\"icon-image clicker\"></span>Clicker96 (${count})`;
  icon.addEventListener("click", () => {
    if (wasIconDragged(icon)) {
      return;
    }
    openClickerInstance();
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
  renderAchievements();
}

function checkMoneyAchievements() {
  if (totalMoney >= 10) {
    maybeAward("ten-bucks", "Double Digits", "Hit $10 total.");
  }
  if (totalMoney >= 50) {
    maybeAward("fifty-bucks", "Saver", "Hit $50 total.");
  }
  if (totalMoney >= 100) {
    maybeAward("hundred-bucks", "Big League", "Hit $100 total.");
  }
}

function countUpgradesPurchased() {
  return (
    upgrades.estimator +
    upgrades.barTuner +
    upgrades.autoClick +
    upgrades.multiWindow +
    upgrades.payoutBoost +
    upgrades.timeReducer
  );
}

function getCosmetic(id) {
  return cosmeticCatalog.find((item) => item.id === id);
}

function isCosmeticOwned(id) {
  return cosmetics.owned.includes(id);
}

function applyCosmeticBackground() {
  if (cosmetics.background === "sunset") {
    document.body.classList.add("cosmetic-sunset");
  } else {
    document.body.classList.remove("cosmetic-sunset");
  }
}

function createDecorationElement(item) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `decoration ${item.id}`;
  el.textContent = item.title;
  el.dataset.cosmeticId = item.id;
  el.addEventListener("click", () => {
    if (item.type === "fidget") {
      el.classList.toggle("spin");
    }
  });
  enableDecorationDragging(el);
  return el;
}

function enableDecorationDragging(el) {
  el.addEventListener("mousedown", (event) => {
    if (event.button !== 0) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    function onMove(moveEvent) {
      el.style.left = `${moveEvent.clientX - offsetX}px`;
      el.style.top = `${moveEvent.clientY - offsetY}px`;
    }

    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      const itemId = el.dataset.cosmeticId;
      if (itemId) {
        cosmetics.positions[itemId] = {
          x: parseFloat(el.style.left) || 0,
          y: parseFloat(el.style.top) || 0,
        };
        if (!isLoadingSlot) {
          saveCurrentSlot();
        }
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
}

function placeCosmetic(itemId) {
  const item = getCosmetic(itemId);
  if (!item || !isCosmeticOwned(itemId)) {
    return;
  }
  if (item.type === "background") {
    cosmetics.background = "sunset";
    applyCosmeticBackground();
    saveCurrentSlot();
    renderOwnedCosmetics();
    return;
  }
  if (!decorationsLayer) {
    return;
  }
  if (decorationsLayer.querySelector(`[data-cosmetic-id="${itemId}"]`)) {
    return;
  }
  const element = createDecorationElement(item);
  const storedPosition = cosmetics.positions[itemId];
  if (storedPosition) {
    element.style.left = `${storedPosition.x}px`;
    element.style.top = `${storedPosition.y}px`;
  } else {
    element.style.left = "320px";
    element.style.top = "120px";
  }
  decorationsLayer.appendChild(element);
  cosmetics.placed[itemId] = true;
  saveCurrentSlot();
  renderOwnedCosmetics();
}

function removeCosmetic(itemId) {
  if (itemId === "sunset-wallpaper") {
    cosmetics.background = "default";
    applyCosmeticBackground();
    saveCurrentSlot();
    renderOwnedCosmetics();
    return;
  }
  if (!decorationsLayer) {
    return;
  }
  const element = decorationsLayer.querySelector(`[data-cosmetic-id="${itemId}"]`);
  if (element) {
    element.remove();
  }
  cosmetics.placed[itemId] = false;
  cosmetics.positions[itemId] = cosmetics.positions[itemId] ?? null;
  saveCurrentSlot();
  renderOwnedCosmetics();
}

function renderCosmeticShop() {
  if (!cosmeticShopList) {
    return;
  }
  cosmeticShopList.innerHTML = "";
  cosmeticCatalog.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cosmetic-item";
    const info = document.createElement("div");
    info.innerHTML = `<strong>${item.title}</strong><p class="small">${item.description}</p>`;
    const button = document.createElement("button");
    const owned = isCosmeticOwned(item.id);
    button.className = "retry cosmetic-buy";
    button.disabled = owned || totalMoney < item.cost;
    button.textContent = owned ? "Owned" : `Buy - $${item.cost}`;
    button.addEventListener("click", () => {
      if (owned || totalMoney < item.cost) {
        return;
      }
      totalMoney -= item.cost;
      cosmetics.owned.push(item.id);
      cosmetics.placed[item.id] = false;
      cosmetics.positions[item.id] = null;
      updateMoneyDisplay();
      saveCurrentSlot();
      showToast("Cosmetic", `${item.title} added to Cosmetics.`);
      maybeAward("decorator", "Decorator", "Bought your first cosmetic.");
      renderCosmetics();
    });
    li.appendChild(info);
    li.appendChild(button);
    cosmeticShopList.appendChild(li);
  });
}

function renderOwnedCosmetics() {
  if (!ownedCosmetics) {
    return;
  }
  ownedCosmetics.innerHTML = "";
  if (cosmetics.owned.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No cosmetics purchased yet.";
    ownedCosmetics.appendChild(empty);
    return;
  }
  cosmetics.owned.forEach((itemId) => {
    const item = getCosmetic(itemId);
    if (!item) {
      return;
    }
    const li = document.createElement("li");
    li.className = "cosmetic-item";
    const info = document.createElement("div");
    info.innerHTML = `<strong>${item.title}</strong><p class="small">${item.description}</p>`;
    const button = document.createElement("button");
    button.className = "retry cosmetic-toggle";
    if (item.type === "background") {
      const active = cosmetics.background === "sunset";
      button.textContent = active ? "Disable" : "Apply";
      button.addEventListener("click", () => {
        if (active) {
          removeCosmetic(item.id);
        } else {
          placeCosmetic(item.id);
        }
      });
    } else {
      const placed = cosmetics.placed[item.id];
      button.textContent = placed ? "Remove" : "Place";
      button.addEventListener("click", () => {
        if (placed) {
          removeCosmetic(item.id);
        } else {
          placeCosmetic(item.id);
        }
      });
    }
    li.appendChild(info);
    li.appendChild(button);
    ownedCosmetics.appendChild(li);
  });
}

function renderCosmetics() {
  applyCosmeticBackground();
  renderCosmeticShop();
  renderOwnedCosmetics();
  if (decorationsLayer) {
    cosmetics.owned.forEach((itemId) => {
      const item = getCosmetic(itemId);
      if (item && item.type !== "background" && cosmetics.placed[itemId]) {
        placeCosmetic(itemId);
      }
    });
  }
}

function renderAchievements() {
  if (!achievementList) {
    return;
  }
  achievementList.innerHTML = "";
  achievementConfigs.forEach((achievement) => {
    const li = document.createElement("li");
    const unlocked = achievements.includes(achievement.id);
    li.className = `achievement ${unlocked ? "unlocked" : "locked"}`;
    const title = document.createElement("strong");
    title.textContent = achievement.title;
    const desc = document.createElement("p");
    desc.className = "small";
    desc.textContent = unlocked ? achievement.description : "???";
    li.appendChild(title);
    li.appendChild(desc);
    achievementList.appendChild(li);
  });
}

function setActiveShopTab(tabId) {
  if (!shopTabs) {
    return;
  }
  shopTabs.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabId);
  });
  document.querySelectorAll("[data-tab-content]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.tabContent !== tabId);
  });
}

function setupShopTabs() {
  if (!shopTabs) {
    return;
  }
  shopTabs.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveShopTab(tab.dataset.tab);
    });
  });
  const active = shopTabs.querySelector(".tab.active");
  setActiveShopTab(active ? active.dataset.tab : "upgrades");
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
  if (key === "payout-boost") {
    upgrades.payoutBoost += 1;
  }
  if (key === "time-reducer") {
    upgrades.timeReducer = Math.min(upgrades.timeReducer + 1, 25);
  }
  saveCurrentSlot();
  refreshUpgrades();
  showToast("Upgrade", "Upgrade installed.");
  if (countUpgradesPurchased() >= 5) {
    maybeAward("upgrade-fiend", "Upgrade Fiend", "Bought 5 upgrades.");
  }
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
  if (key === "payout-boost") {
    return upgrades.payoutBoost;
  }
  if (key === "time-reducer") {
    return upgrades.timeReducer;
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
  casinoBets += 1;
  if (casinoBets >= 5) {
    maybeAward("casino-regular", "Casino Regular", "Placed 5 casino bets.");
  }
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
  casinoBets += 1;
  if (casinoBets >= 5) {
    maybeAward("casino-regular", "Casino Regular", "Placed 5 casino bets.");
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

function attachCloseHandler(button) {
  button.addEventListener("click", (event) => {
    const targetId = event.currentTarget.dataset.close;
    const windowEl = document.getElementById(targetId);
    if (!windowEl) {
      return;
    }
    if (windowEl.dataset.windowType === "clicker") {
      pendingCloseWindow = windowEl;
      showWindow(confirmCloseWindow);
      return;
    }
    hideWindow(windowEl);
    if (targetId === "settingsWindow") {
      titleOverlay.classList.remove("hidden");
      desktop.classList.add("hidden");
    }
  });
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
  if (wasIconDragged(mailIcon)) {
    return;
  }
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
  if (wasIconDragged(downloadsIcon)) {
    return;
  }
  showWindow(explorerWindow);
});

internetIcon.addEventListener("click", () => {
  if (wasIconDragged(internetIcon)) {
    return;
  }
  showWindow(internetWindow);
});

installerFile.addEventListener("click", () => {
  startInstallSequence();
});

casinoIcon.addEventListener("click", () => {
  if (wasIconDragged(casinoIcon)) {
    return;
  }
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
  if (wasIconDragged(clickerIcon)) {
    return;
  }
  openClickerInstance();
});

document.querySelectorAll(".upgrade").forEach((button) => {
  button.addEventListener("click", handleUpgradeClick);
});

if (openCosmetics) {
  openCosmetics.addEventListener("click", () => {
    showWindow(cosmeticsWindow);
  });
}

deleteSaveButton.addEventListener("click", deleteSaveData);

trashIcon.addEventListener("click", () => {
  if (wasIconDragged(trashIcon)) {
    return;
  }
  showWindow(trashWindow);
});

trashIcon.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  emptyTrash();
});

confirmCloseYes.addEventListener("click", () => {
  hideWindow(confirmCloseWindow);
  if (!pendingCloseWindow) {
    return;
  }
  const instance = clickerInstances.get(pendingCloseWindow.id);
  if (instance && instance.interval) {
    clearInterval(instance.interval);
    instance.interval = null;
  }
  if (instance) {
    instance.startTime = null;
    instance.progress.style.width = "0%";
  }
  hideWindow(pendingCloseWindow);
  pendingCloseWindow = null;
  resetCombo();
});

confirmCloseNo.addEventListener("click", () => {
  hideWindow(confirmCloseWindow);
  pendingCloseWindow = null;
});

document.querySelectorAll("[data-close]").forEach((button) => {
  attachCloseHandler(button);
});

document.querySelectorAll(".window").forEach((windowEl) => {
  registerWindow(windowEl);
});

if (deleteIconButton) {
  deleteIconButton.addEventListener("click", deleteIconTarget);
}

document.addEventListener("click", (event) => {
  if (!iconContextMenu || iconContextMenu.classList.contains("hidden")) {
    return;
  }
  if (event.target.closest("#iconContextMenu")) {
    return;
  }
  closeIconContextMenu();
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
registerClickerInstance(clickerWindow);
renderCosmetics();
renderAchievements();
setupShopTabs();
