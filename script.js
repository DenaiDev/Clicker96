const bootOverlay = document.getElementById("bootOverlay");
const titleOverlay = document.getElementById("titleOverlay");
const loginScreen = document.getElementById("loginScreen");
const loginButton = document.getElementById("loginButton");
const loginBackButton = document.getElementById("loginBackButton");
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
const toastActionButton = document.getElementById("toastActionButton");
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
const casinoHit = document.getElementById("casinoHit");
const casinoStand = document.getElementById("casinoStand");
const casinoCards = document.getElementById("casinoCards");
const casinoStatus = document.getElementById("casinoStatus");
const iconsContainer = document.querySelector(".icons");
const decorationsLayer = document.getElementById("decorationsLayer");
const shopTabs = document.getElementById("shopTabs");
const songShopList = document.getElementById("songShopList");
const achievementList = document.getElementById("achievementList");
const desktopSettingsTabs = document.getElementById("desktopSettingsTabs");
const desktopSettingsIcon = document.getElementById("desktopSettingsIcon");
const desktopSettingsWindow = document.getElementById("desktopSettingsWindow");
const audioStatus = document.getElementById("audioStatus");
const toggleAudioButton = document.getElementById("toggleAudioButton");
const logoutButton = document.getElementById("logoutButton");
const masterVolumeInput = document.getElementById("masterVolumeInput");
const bgVolumeInput = document.getElementById("bgVolumeInput");
const sfxVolumeInput = document.getElementById("sfxVolumeInput");
const openAchievementsWindow = document.getElementById("openAchievementsWindow");
const achievementsWindow = document.getElementById("achievementsWindow");
const antivirusIcon = document.getElementById("antivirusIcon");
const antivirusWindow = document.getElementById("antivirusWindow");
const antivirusStatus = document.getElementById("antivirusStatus");
const virusPipeWindow = document.getElementById("virusPipeWindow");
const pipeGrid = document.getElementById("pipeGrid");
const pipeStatus = document.getElementById("pipeStatus");
const pipeTimer = document.getElementById("pipeTimer");
const pipeRotate = document.getElementById("pipeRotate");
const pipeCheck = document.getElementById("pipeCheck");
const cosmeticShopList = document.getElementById("cosmeticShopList");
const openCosmetics = document.getElementById("openCosmetics");
const cosmeticsWindow = document.getElementById("cosmeticsWindow");
const ownedCosmetics = document.getElementById("ownedCosmetics");
const jukeboxIcon = document.getElementById("jukeboxIcon");
const jukeboxWindow = document.getElementById("jukeboxWindow");
const jukeboxTrackList = document.getElementById("jukeboxTrackList");
const jukeboxNowPlaying = document.getElementById("jukeboxNowPlaying");
const jukeboxDisc = document.getElementById("jukeboxDisc");
const jukeboxProgress = document.getElementById("jukeboxProgress");
const jukeboxTimeCurrent = document.getElementById("jukeboxTimeCurrent");
const jukeboxTimeDuration = document.getElementById("jukeboxTimeDuration");
const jukeboxStop = document.getElementById("jukeboxStop");
const iconContextMenu = document.getElementById("iconContextMenu");
const deleteIconButton = document.getElementById("deleteIconButton");
const desktopContextMenu = document.getElementById("desktopContextMenu");
const newNoteButton = document.getElementById("newNoteButton");
const refreshDesktopButton = document.getElementById("refreshDesktopButton");
const notepadWindow = document.getElementById("notepadWindow");
const notepadText = document.getElementById("notepadText");
const levelEstimator = document.getElementById("level-estimator");
const levelBarTuner = document.getElementById("level-bar-tuner");
const levelAutoClick = document.getElementById("level-auto-click");
const levelMultiWindow = document.getElementById("level-multi-window");
const levelPayoutBoost = document.getElementById("level-payout-boost");
const levelTimeReducer = document.getElementById("level-time-reducer");
const levelDoubleTap = document.getElementById("level-double-tap");
const doubleTapName = document.getElementById("doubleTapName");

const clickerInstances = new Map();
let clickerInstanceId = 0;
let pendingCloseWindow = null;
let popTimeout = null;
let totalMoney = 0;
let currentSlot = 1;
let bootState = "boot";
let downloads = [];
let trash = [];
let trashedApps = [];
let openedWindows = new Set();
let achievements = [];
let cosmetics = { owned: [], placed: {}, positions: {}, background: "default" };
let lastToastTimeout = null;
let hasEmail = false;
let emailTimer = null;
let windowZ = 10;
let windowOpenCount = 0;
let comboMultiplier = 1;
let comboClicks = 0;
let comboTimeout = null;
let comboDrainInterval = null;
let comboRemaining = 10000;
let mailStage = 0;
let totalClicks = 0;
let blackjackState = null;
let downloadRetryCount = 0;
let casinoBets = 0;
let iconKeyCounter = 0;
let isLoadingSlot = false;
let isBootstrapping = true;
let unlockedSongs = ["w96-ambient"];
let currentTrack = null;
let audioEnabled = true;
let masterVolume = 1;
let sfxVolume = 0.4;
let musicVolume = 0.5;
let achievementFilter = "all";
let virusState = { pendingIconId: null, activeNodeWindowId: null, nodeHp: 0, kills: 0, threatPending: false };
let virusInterval = null;
let virusJitterTimeout = null;
let pipeGame = null;
let pendingDesktopContextPos = null;
let activeNoteIcon = null;
let noteCounter = 0;
let contextMenuTargetEl = null;
let jukeboxUiInterval = null;
let upgrades = {
  estimator: 0,
  barTuner: 0,
  autoClick: 0,
  multiWindow: 0,
  payoutBoost: 0,
  timeReducer: 0,
  doubleTap: 0,
  antivirus: 0,
  antivirusAutoSolve: 0,
};
const wrongPasswordMessages = [
  "Access denied. Try again.",
  "Password mismatch.",
  "Invalid login credentials.",
  "Hmm... that didn't work.",
];

const secretPasswords = {
  sans: {
    message: "You feel like a bad time is approaching.",
    achievementId: "sans",
    achievementTitle: "Sans?",
    achievementBody: "You typed a suspicious password.",
    unlockSong: "sans-theme",
  },
};

const gridSize = { x: 88, y: 92 };
const accuracyLevels = ["low", "medium", "high", "precise"];
const iconDefaults = {
  mailIcon: { x: 0, y: 0 },
  internetIcon: { x: 0, y: 1 },
  downloadsIcon: { x: 0, y: 2 },
  clickerIcon: { x: 0, y: 3 },
  casinoIcon: { x: 0, y: 4 },
  jukeboxIcon: { x: 0, y: 5 },
  desktopSettingsIcon: { x: 0, y: 6 },
  antivirusIcon: { x: 0, y: 7 },
  trashIcon: { x: 0, y: 8 },
};
const upgradeConfigs = {
  estimator: { max: 3, base: 1, scale: 2, levelEl: levelEstimator },
  "bar-tuner": { max: null, base: 1, scale: 1.4, levelEl: levelBarTuner },
  "auto-click": { max: 5, base: 3, scale: 1.8, levelEl: levelAutoClick },
  "multi-window": { max: null, base: 6, scale: 1.6, levelEl: levelMultiWindow },
  "payout-boost": { max: null, base: 5, scale: 2, levelEl: levelPayoutBoost },
  "time-reducer": { max: 25, base: 20, scale: 1.6, levelEl: levelTimeReducer },
  "double-tap": { max: 5, base: 120, scale: 3.5, levelEl: levelDoubleTap },
  antivirus: { max: 1, base: 180, scale: 1, levelEl: null },
  "antivirus-autosolve": { max: 1, base: 420, scale: 1, levelEl: null },
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
  { id: "sans", title: "Sans?", description: "You entered a secret password." },
  { id: "jukebox-on", title: "DJ", description: "Played your first music track." },
  { id: "cleaner", title: "Cleaner", description: "Destroyed your first virus node." },
  { id: "network-purge", title: "Network Purge", description: "Cleared the pipe threat event." },
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


const songCatalog = [
  { id: "w96-ambient", title: "Windows96 Ambient", cost: 0, source: null, unlockedByDefault: true },
  { id: "crt-dream", title: "CRT Dream", cost: 14, source: null },
  { id: "dialup-disco", title: "Dialup Disco", cost: 22, source: null },
  { id: "sans-theme", title: "Sans' Theme", cost: 0, source: null, secret: true },
];

const audioAssets = {
  click: null,
  windowOpen: null,
  windowClose: null,
  success: null,
  error: null,
};

const audioCache = new Map();

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function showWindow(windowEl) {
  if (!windowEl.dataset.positioned) {
    const width = windowEl.offsetWidth || 340;
    const height = windowEl.offsetHeight || 240;
    const centerX = Math.max(16, (window.innerWidth - width) / 2);
    const centerY = Math.max(32, (window.innerHeight - height) / 2 - 40);
    const offset = (windowOpenCount % 8) * 24;
    windowEl.style.left = `${centerX + offset}px`;
    windowEl.style.top = `${centerY + offset}px`;
    windowEl.dataset.positioned = "true";
    windowOpenCount += 1;
  }
  windowEl.classList.remove("hidden");
  openedWindows.add(windowEl.id);
  focusWindow(windowEl);
  renderTaskbarWindows();
  playSfx("windowOpen");
}

function hideWindow(windowEl) {
  windowEl.classList.add("hidden");
  if (windowEl.id === "virusPipeWindow" && pipeGame && pipeGame.timer) {
    clearInterval(pipeGame.timer);
  }
  if (windowEl.id === "notepadWindow") {
    activeNoteIcon = null;
  }
  openedWindows.delete(windowEl.id);
  renderTaskbarWindows();
  playSfx("windowClose");
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

function getAudio(path, volume = 1) {
  if (!path) {
    return null;
  }
  const cacheKey = `${path}|${volume}`;
  if (!audioCache.has(cacheKey)) {
    const audio = new Audio(path);
    audio.volume = Math.max(0, Math.min(1, volume * masterVolume));
    audioCache.set(cacheKey, audio);
  }
  return audioCache.get(cacheKey);
}

function playSfx(type) {
  if (!audioEnabled) {
    return;
  }
  const path = audioAssets[type];
  if (!path) {
    return;
  }
  const audio = getAudio(path, sfxVolume);
  if (audio) { audio.volume = Math.max(0, Math.min(1, sfxVolume * masterVolume)); }
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function getSong(songId) {
  return songCatalog.find((song) => song.id === songId);
}

function isSongUnlocked(songId) {
  return unlockedSongs.includes(songId);
}

function unlockSong(songId) {
  if (!songId || isSongUnlocked(songId)) {
    return;
  }
  unlockedSongs.push(songId);
  const song = getSong(songId);
  showToast("New Disc", song ? `${song.title} unlocked.` : "New song unlocked.");
  if (jukeboxIcon.classList.contains("hidden")) {
    jukeboxIcon.classList.remove("hidden");
    ensureIconPlacement(jukeboxIcon);
  }
  saveCurrentSlot();
  renderSongShop();
  renderJukeboxTracks();
}

function playSong(songId) {
  if (!audioEnabled || !isSongUnlocked(songId)) {
    return;
  }
  const song = getSong(songId);
  if (!song) {
    return;
  }
  if (currentTrack && currentTrack.audio) {
    currentTrack.audio.pause();
    currentTrack.audio.currentTime = 0;
  }
  const audio = song.source ? getAudio(song.source, musicVolume) : null;
  if (audio) { audio.volume = Math.max(0, Math.min(1, musicVolume * masterVolume)); }
  currentTrack = { id: songId, audio };
  jukeboxNowPlaying.textContent = song.title;
  if (audio) {
    audio.loop = false;
    audio.onended = () => {
      stopSong();
    };
    audio.play().catch(() => {});
  }
  startJukeboxUiTimer();
  updateJukeboxPlaybackUI();
  maybeAward("jukebox-on", "DJ", "Played your first music track.");
  saveCurrentSlot();
  renderJukeboxTracks();
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function updateJukeboxPlaybackUI() {
  const audio = currentTrack ? currentTrack.audio : null;
  const current = audio ? audio.currentTime : 0;
  const duration = audio && Number.isFinite(audio.duration) ? audio.duration : 0;
  if (jukeboxTimeCurrent) {
    jukeboxTimeCurrent.textContent = formatTime(current);
  }
  if (jukeboxTimeDuration) {
    jukeboxTimeDuration.textContent = formatTime(duration);
  }
  if (jukeboxProgress) {
    const pct = duration > 0 ? Math.min((current / duration) * 100, 100) : 0;
    jukeboxProgress.style.width = `${pct}%`;
  }
  if (jukeboxDisc) {
    jukeboxDisc.classList.toggle("spinning", !!(audio && !audio.paused));
  }
}

function stopJukeboxUiTimer() {
  if (jukeboxUiInterval) {
    clearInterval(jukeboxUiInterval);
    jukeboxUiInterval = null;
  }
}

function startJukeboxUiTimer() {
  stopJukeboxUiTimer();
  jukeboxUiInterval = setInterval(updateJukeboxPlaybackUI, 250);
  updateJukeboxPlaybackUI();
}

function stopSong() {
  if (currentTrack && currentTrack.audio) {
    currentTrack.audio.pause();
    currentTrack.audio.currentTime = 0;
  }
  currentTrack = null;
  stopJukeboxUiTimer();
  if (jukeboxNowPlaying) {
    jukeboxNowPlaying.textContent = "None";
  }
  updateJukeboxPlaybackUI();
  saveCurrentSlot();
  renderJukeboxTracks();
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
      placeInstalledIcon(clickerIcon, iconDefaults.clickerIcon.x);
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
  const tapMultiplier = 1 + Math.min(upgrades.doubleTap, 4);
  instance.startTime -= 1000 * comboMultiplier * tunerBoost * tapMultiplier;
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
  startVirusCycle();
}

function updateMoneyDisplay() {
  const formatted = `$${totalMoney.toFixed(2)}`;
  moneyDisplay.textContent = formatted;
  refreshUpgrades();
  renderCosmeticShop();
  renderOwnedCosmetics();
  renderSongShop();
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
    trashedApps = [];
    achievements = [];
    cosmetics = { owned: [], placed: {}, positions: {}, background: "default" };
    upgrades = {
      estimator: 0,
      barTuner: 0,
      autoClick: 0,
      multiWindow: 0,
      payoutBoost: 0,
      timeReducer: 0,
      doubleTap: 0,
      antivirus: 0,
      antivirusAutoSolve: 0,
    };
    casinoBets = 0;
    upgrades.doubleTap = 0;
    unlockedSongs = ["w96-ambient"];
    currentTrack = null;
    audioEnabled = true;
    masterVolume = 1;
    sfxVolume = 0.4;
    musicVolume = 0.5;
    virusState = { pendingIconId: null, activeNodeWindowId: null, nodeHp: 0, kills: 0, threatPending: false };
    clearPendingVirusJitter();
    updateMoneyDisplay();
    renderDownloads();
    renderTrash();
    renderCosmetics();
    renderAchievements();
    applyDesktopState(null);
    jukeboxIcon.classList.remove("hidden");
    if (isSongUnlocked("w96-ambient")) {
      playSong("w96-ambient");
    }
    isLoadingSlot = false;
    return false;
  }
  totalMoney = data.totalMoney ?? 0;
  downloads = data.downloads ?? [];
  trash = data.trash ?? [];
  trashedApps = data.trashedApps ?? [];
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
  upgrades.doubleTap = Number(upgrades.doubleTap) || 0;
  upgrades.antivirus = Number(upgrades.antivirus) || 0;
  upgrades.antivirusAutoSolve = Number(upgrades.antivirusAutoSolve) || 0;
  mailStage = data.mailStage ?? 0;
  casinoBets = data.casinoBets ?? 0;
  unlockedSongs = data.unlockedSongs ?? ["w96-ambient"];
  currentTrack = null;
  audioEnabled = data.audioEnabled ?? true;
  masterVolume = data.masterVolume ?? 1;
  sfxVolume = data.sfxVolume ?? 0.4;
  musicVolume = data.musicVolume ?? 0.5;
  virusState = data.virusState ?? virusState;
  updateMoneyDisplay();
  renderDownloads();
  renderTrash();
  renderCosmetics();
  renderAchievements();
  applyDesktopState(data.desktopState);
  if (upgrades.antivirus > 0 && antivirusIcon && antivirusIcon.classList.contains("hidden")) {
    antivirusIcon.classList.remove("hidden");
    placeInstalledIcon(antivirusIcon, 0);
  }
  if (!data.desktopState && unlockedSongs.length > 0) {
    jukeboxIcon.classList.remove("hidden");
    ensureIconPlacement(jukeboxIcon);
  }
  if (downloads.length > 0 && downloadsIcon.classList.contains("hidden")) {
    downloadsIcon.classList.remove("hidden");
    placeInstalledIcon(downloadsIcon, 0);
  }
  setMailContent();
  renderSongShop();
  renderJukeboxTracks();
  updateAudioStatus();
  if (data.currentTrackId && isSongUnlocked(data.currentTrackId)) {
    playSong(data.currentTrackId);
  } else if (isSongUnlocked("w96-ambient")) {
    playSong("w96-ambient");
  }
  isLoadingSlot = false;
  return true;
}

function saveCurrentSlot() {
  const data = {
    totalMoney,
    downloads,
    trash,
    trashedApps,
    achievements,
    cosmetics,
    upgrades,
    mailStage,
    casinoBets,
    unlockedSongs,
    currentTrackId: currentTrack ? currentTrack.id : null,
    audioEnabled,
    masterVolume,
    sfxVolume,
    musicVolume,
    virusState,
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
    trashedApps = [];
    achievements = [];
    cosmetics = { owned: [], placed: {}, positions: {}, background: "default" };
    upgrades = {
      estimator: 0,
      barTuner: 0,
      autoClick: 0,
      multiWindow: 0,
      payoutBoost: 0,
      timeReducer: 0,
      doubleTap: 0,
      antivirus: 0,
      antivirusAutoSolve: 0,
    };
    mailStage = 0;
    casinoBets = 0;
    upgrades.doubleTap = 0;
    unlockedSongs = ["w96-ambient"];
    currentTrack = null;
    audioEnabled = true;
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

function processSecretPassword(value) {
  const key = value.toLowerCase();
  if (!secretPasswords[key]) {
    return false;
  }
  const secret = secretPasswords[key];
  loginStatus.textContent = secret.message;
  maybeAward(secret.achievementId, secret.achievementTitle, secret.achievementBody);
  unlockSong(secret.unlockSong);
  return true;
}

function handleLogin() {
  const value = passwordInput.value.trim();
  if (value.length < 1 || value.length > 25) {
    loginStatus.textContent = "Password must be between 1 and 25 characters.";
    return;
  }
  if (processSecretPassword(value)) {
    return;
  }
  if (value !== "123456") {
    const message =
      wrongPasswordMessages[Math.floor(Math.random() * wrongPasswordMessages.length)];
    loginStatus.textContent = message;
    playSfx("error");
    return;
  }
  loginStatus.textContent = "Welcome back.";
  playSfx("success");
  proceedToDesktop();
}

function addDownloadFile() {
  const count = downloads.length + 1;
  const name = count === 1 ? "clicker96.zip" : `clicker96 (${count}).zip`;
  downloads.push({ id: Date.now(), name });
  if (downloadsIcon.classList.contains("hidden")) {
    downloadsIcon.classList.remove("hidden");
    placeInstalledIcon(downloadsIcon, 0);
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
  trashedApps.forEach((item) => {
    const li = document.createElement("li");
    const row = document.createElement("div");
    row.className = "trash-app-row";
    const title = document.createElement("span");
    title.textContent = `${item.label} (app)`;
    const restore = document.createElement("button");
    restore.className = "retry";
    restore.textContent = "Restore";
    restore.addEventListener("click", () => {
      restoreAppFromTrash(item.id);
    });
    row.appendChild(title);
    row.appendChild(restore);
    li.appendChild(row);
    trashList.appendChild(li);
  });
  const hasAny = trash.length > 0 || trashedApps.length > 0;
  trashStatus.textContent = hasAny
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
  trashedApps = [];
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


function openNoteIcon(icon) {
  activeNoteIcon = icon;
  if (notepadText) {
    notepadText.value = icon.dataset.noteContent || "";
  }
  showWindow(notepadWindow);
}

function createNoteIcon(state = {}, placeFromPointer = null) {
  if (!iconsContainer) {
    return null;
  }
  noteCounter += 1;
  const icon = document.createElement("button");
  icon.className = "icon note-icon";
  icon.dataset.deletable = "true";
  icon.dataset.noteId = state.noteId || `note-${Date.now()}-${noteCounter}`;
  icon.dataset.noteContent = state.content || "";
  icon.innerHTML = `<span class="icon-image text"></span>${state.label || `Note ${noteCounter}`}`;
  icon.addEventListener("click", () => {
    if (wasIconDragged(icon)) {
      return;
    }
    openNoteIcon(icon);
  });
  if (state.x !== undefined && state.y !== undefined) {
    icon.dataset.gridX = String(state.x);
    icon.dataset.gridY = String(state.y);
  }
  iconsContainer.appendChild(icon);
  registerIcon(icon);
  if (placeFromPointer) {
    const rect = iconsContainer.getBoundingClientRect();
    const gx = Math.max(0, Math.round((placeFromPointer.x - rect.left) / gridSize.x));
    const gy = Math.max(0, Math.round((placeFromPointer.y - rect.top) / gridSize.y));
    placeIcon(icon, gx, gy, false);
  } else if (state.x !== undefined && state.y !== undefined) {
    placeIcon(icon, Number(state.x), Number(state.y), false);
  } else {
    placeInstalledIcon(icon, 1);
  }
  if (!isLoadingSlot && !isBootstrapping) {
    saveCurrentSlot();
  }
  return icon;
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
    event.preventDefault();
    icon.dataset.dragging = "false";
    const rect = icon.getBoundingClientRect();
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
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
      if (!moved) {
        return;
      }
      icon.style.left = `${moveEvent.clientX - halfW}px`;
      icon.style.top = `${moveEvent.clientY - halfH}px`;
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

function openIconContextMenu(icon, x, y, mode = "trash-app") {
  if (!iconContextMenu) {
    return;
  }
  contextMenuTargetEl = icon;
  iconContextMenu.dataset.targetKey = icon.dataset.iconKey || "";
  iconContextMenu.dataset.mode = mode;
  if (deleteIconButton) {
    deleteIconButton.textContent = mode === "store-decoration" ? "Store Decoration" : "Delete App";
  }
  closeDesktopContextMenu();
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
  delete iconContextMenu.dataset.mode;
  contextMenuTargetEl = null;
}

function openDesktopContextMenu(x, y) {
  if (!desktopContextMenu) {
    return;
  }
  pendingDesktopContextPos = { x, y };
  desktopContextMenu.style.left = `${x}px`;
  desktopContextMenu.style.top = `${y}px`;
  desktopContextMenu.classList.remove("hidden");
}

function closeDesktopContextMenu() {
  if (!desktopContextMenu) {
    return;
  }
  desktopContextMenu.classList.add("hidden");
}

function refreshDesktopIcons() {
  const icons = Array.from(document.querySelectorAll(".icon:not(.hidden)"));
  if (desktop) {
    desktop.classList.add("desktop-refreshing");
  }
  icons.forEach((icon) => icon.classList.add("refresh-flash"));
  setTimeout(() => {
    icons.forEach((icon) => icon.classList.remove("refresh-flash"));
    if (desktop) {
      desktop.classList.remove("desktop-refreshing");
    }

    const forced = new Set();
    if (virusState.pendingIconId) {
      const pending = document.getElementById(virusState.pendingIconId);
      if (pending && !pending.classList.contains("hidden")) {
        forced.add(pending);
      }
    }
    document.querySelectorAll(".icon.infected:not(.hidden)").forEach((icon) => {
      forced.add(icon);
    });
    forced.forEach((icon) => {
      jitterIcon(icon, 2);
    });
  }, 220);
}

function trashAppIcon(icon) {
  const appRecord = {
    id: `app-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    iconId: icon.id || null,
    label: icon.textContent.trim(),
    className: icon.className,
    datasetGridX: Number(icon.dataset.gridX || 0),
    datasetGridY: Number(icon.dataset.gridY || 0),
    isClone: icon.classList.contains("clicker-clone"),
    isNote: icon.classList.contains("note-icon"),
    noteContent: icon.dataset.noteContent || "",
  };
  trashedApps.push(appRecord);
  if (icon.classList.contains("clicker-clone")) {
    icon.remove();
  } else {
    icon.classList.add("hidden");
  }
  renderTrash();
  saveCurrentSlot();
}

function restoreAppFromTrash(appId) {
  const idx = trashedApps.findIndex((item) => item.id === appId);
  if (idx === -1) {
    return;
  }
  const app = trashedApps.splice(idx, 1)[0];
  if (app.isNote) {
    createNoteIcon({
      x: app.datasetGridX,
      y: app.datasetGridY,
      label: app.label,
      content: app.noteContent,
      noteId: app.id,
    });
  } else if (app.isClone) {
    const icon = document.createElement("button");
    icon.className = app.className || "icon clicker-clone";
    icon.dataset.deletable = "true";
    icon.dataset.gridX = String(app.datasetGridX);
    icon.dataset.gridY = String(app.datasetGridY);
    icon.innerHTML = `<span class="icon-image clicker"></span>${app.label}`;
    icon.addEventListener("click", () => {
      if (wasIconDragged(icon)) {
        return;
      }
      openClickerInstance();
    });
    iconsContainer.appendChild(icon);
    registerIcon(icon);
    placeInstalledIcon(icon, app.datasetGridX);
  } else if (app.iconId) {
    const icon = document.getElementById(app.iconId);
    if (icon) {
      icon.classList.remove("hidden");
      placeInstalledIcon(icon, app.datasetGridX);
    }
  }
  renderTrash();
  saveCurrentSlot();
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
    icon = contextMenuTargetEl;
  }
  if (!icon) {
    closeIconContextMenu();
    return;
  }
  if (iconContextMenu.dataset.mode === "store-decoration") {
    const itemId = icon.dataset.cosmeticId;
    if (itemId) {
      removeCosmetic(itemId);
    }
  } else {
    trashAppIcon(icon);
  }
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
  if (!isLoadingSlot && !isBootstrapping) {
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

function findNextFreeFrom(startX, startY, occupancy) {
  const maxCols = getMaxCols();
  const maxRows = getMaxRows();
  for (let x = startX; x <= maxCols; x += 1) {
    for (let y = x === startX ? startY : 0; y <= maxRows; y += 1) {
      if (!occupancy.has(getKey(x, y))) {
        return { x, y };
      }
    }
  }
  for (let x = 0; x < startX; x += 1) {
    for (let y = 0; y <= maxRows; y += 1) {
      if (!occupancy.has(getKey(x, y))) {
        return { x, y };
      }
    }
  }
  return { x: maxCols + 1, y: 0 };
}

function findNextFree(occupancy) {
  return findNextFreeFrom(0, 0, occupancy);
}

function findInstallSpot(preferredX, occupancy) {
  const clampedX = Math.max(0, Math.min(preferredX, getMaxCols()));
  return findNextFreeFrom(clampedX, 0, occupancy);
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

function placeInstalledIcon(icon, preferredColumn = 0) {
  const occupancy = buildOccupancy(icon);
  const spot = findInstallSpot(preferredColumn, occupancy);
  setIconPosition(icon, spot.x, spot.y);
}

function ensureIconPlacement(icon) {
  const defaults = iconDefaults[icon.id] || { x: 0, y: 0 };
  placeIcon(icon, defaults.x, defaults.y, false);
}

function collectDesktopState() {
  const baseIcons = {};
  const clickerClones = [];
  const notes = [];
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
    } else if (icon.classList.contains("note-icon")) {
      notes.push({
        ...state,
        label: icon.textContent.trim(),
        content: icon.dataset.noteContent || "",
        noteId: icon.dataset.noteId || "",
      });
    }
  });
  return { baseIcons, clickerClones, notes };
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
  document.querySelectorAll(".icon.clicker-clone, .icon.note-icon").forEach((icon) => {
    icon.remove();
  });
  const clones = state?.clickerClones ?? [];
  clones.forEach((cloneState, index) => {
    createClickerIconClone(cloneState, index + 2);
  });
  const notes = state?.notes ?? [];
  notes.forEach((noteState) => {
    createNoteIcon(noteState);
  });
  Object.keys(iconDefaults).forEach((id) => {
    const icon = document.getElementById(id);
    if (!icon) {
      return;
    }
    const saved = baseIcons[id];
    if (saved) {
      icon.classList.toggle("hidden", saved.hidden);
      setIconPosition(icon, Number(saved.x) || 0, Number(saved.y) || 0);
      return;
    }

    // Fallback for legacy/incomplete desktopState: avoid global repacking.
    const defaults = iconDefaults[id] || { x: 0, y: 0 };
    const existingX = Number(icon.dataset.gridX);
    const existingY = Number(icon.dataset.gridY);
    const x = Number.isFinite(existingX) ? existingX : defaults.x;
    const y = Number.isFinite(existingY) ? existingY : defaults.y;

    if (id === "downloadsIcon") {
      icon.classList.toggle("hidden", downloads.length === 0);
    }
    if (id === "casinoIcon") {
      icon.classList.toggle("hidden", mailStage < 3);
    }
    if (id === "antivirusIcon") {
      icon.classList.toggle("hidden", upgrades.antivirus < 1);
    }

    setIconPosition(icon, x, y);
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
  placeInstalledIcon(icon, iconDefaults.clickerIcon.x);
}

function showToast(title, body, options = {}) {
  toastTitle.textContent = title;
  toastBody.textContent = body;
  if (toastActionButton) {
    if (options.actionLabel && options.onAction) {
      toastActionButton.textContent = options.actionLabel;
      toastActionButton.classList.remove("hidden");
      toastActionButton.onclick = () => {
        options.onAction();
        if (!options.sticky) {
          toast.classList.add("hidden");
        }
      };
    } else {
      toastActionButton.classList.add("hidden");
      toastActionButton.onclick = null;
    }
  }
  toast.classList.remove("hidden");
  if (lastToastTimeout) {
    clearTimeout(lastToastTimeout);
  }
  if (!options.sticky) {
    lastToastTimeout = setTimeout(() => {
      toast.classList.add("hidden");
    }, options.duration || 4000);
  }
}


function setVolume(kind, value) {
  const clamped = Math.max(0, Math.min(1, Number(value) || 0));
  if (kind === "master") {
    masterVolume = clamped;
  }
  if (kind === "bg") {
    musicVolume = clamped;
    if (currentTrack && currentTrack.audio) {
      currentTrack.audio.volume = musicVolume * masterVolume;
    }
  }
  if (kind === "sfx") {
    sfxVolume = clamped;
  }
  updateAudioStatus();
  saveCurrentSlot();
}

function getWindowForIcon(iconId) {
  const map = {
    mailIcon: mailWindow,
    internetIcon: internetWindow,
    downloadsIcon: explorerWindow,
    clickerIcon: clickerWindow,
    casinoIcon: casinoWindow,
    jukeboxIcon: jukeboxWindow,
    desktopSettingsIcon: desktopSettingsWindow,
    trashIcon: trashWindow,
    antivirusIcon: antivirusWindow,
  };
  return map[iconId] || null;
}

function jitterIcon(icon, times = 2) {
  if (!icon) return;
  let count = 0;
  const tick = () => {
    icon.classList.remove("infected");
    void icon.offsetWidth;
    icon.classList.add("infected");
    setTimeout(() => {
      icon.classList.remove("infected");
    }, 260);
    count += 1;
    if (count < times) {
      setTimeout(tick, 2000);
    }
  };
  tick();
}

function clearPendingVirusJitter() {
  if (virusJitterTimeout) {
    clearTimeout(virusJitterTimeout);
    virusJitterTimeout = null;
  }
}

function schedulePendingVirusJitter(iconId) {
  clearPendingVirusJitter();
  const run = () => {
    if (!virusState.pendingIconId || virusState.pendingIconId !== iconId) {
      clearPendingVirusJitter();
      return;
    }
    const icon = document.getElementById(iconId);
    if (icon && !icon.classList.contains("hidden")) {
      jitterIcon(icon, 1);
    }
    const nextDelay = 5000 + Math.floor(Math.random() * 5001);
    virusJitterTimeout = setTimeout(run, nextDelay);
  };
  run();
}

function pickVirusIcon() {
  const candidates = Array.from(document.querySelectorAll(".icon:not(.hidden)"))
    .filter((el) => el.id && el.id !== "antivirusIcon");
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function startVirusCycle() {
  if (virusInterval) clearInterval(virusInterval);
  if (virusState.pendingIconId) {
    schedulePendingVirusJitter(virusState.pendingIconId);
  }
  virusInterval = setInterval(() => {
    if (virusState.pendingIconId) {
      return;
    }
    const icon = pickVirusIcon();
    if (!icon) return;
    if (upgrades.antivirus > 0) {
      showToast("Antivirus", `Virus detected in ${icon.textContent.trim()} and eliminated.`);
      if (antivirusStatus) {
        antivirusStatus.textContent = `Last action: cleaned ${icon.textContent.trim()}.`;
      }
      return;
    }
    virusState.pendingIconId = icon.id;
    schedulePendingVirusJitter(icon.id);
    saveCurrentSlot();
  }, 300000);
}

function maybeSpawnVirusNode(windowEl) {
  if (!windowEl || !virusState.pendingIconId || upgrades.antivirus > 0) {
    return;
  }
  if (virusState.activeNodeWindowId && virusState.activeNodeWindowId !== windowEl.id) {
    return;
  }
  const body = windowEl.querySelector(".window-body");
  if (!body || body.querySelector(".virus-node")) return;
  const node = document.createElement("button");
  node.type = "button";
  node.className = "virus-node";
  node.title = "Corrupted node";
  node.style.left = `${20 + Math.floor(Math.random() * 160)}px`;
  node.style.top = `${20 + Math.floor(Math.random() * 90)}px`;
  node.dataset.hp = "3";
  node.addEventListener("click", () => {
    const hp = Number(node.dataset.hp || 0) - 1;
    if (hp > 0) {
      node.dataset.hp = String(hp);
      return;
    }
    node.remove();
    totalMoney += 1;
    updateMoneyDisplay();
    const infectedIcon = virusState.pendingIconId
      ? document.getElementById(virusState.pendingIconId)
      : null;
    if (infectedIcon) {
      infectedIcon.classList.remove("infected");
    }
    virusState.pendingIconId = null;
    clearPendingVirusJitter();
    virusState.activeNodeWindowId = null;
    virusState.kills += 1;
    maybeAward("cleaner", "Cleaner", "Destroyed your first virus node.");
    if (virusState.kills >= 3 && !virusState.threatPending) {
      triggerThreatEvent();
    }
    saveCurrentSlot();
  });
  body.style.position = "relative";
  body.appendChild(node);
  virusState.activeNodeWindowId = windowEl.id;
}

function triggerThreatEvent() {
  virusState.threatPending = true;
  showToast("Threat Escalation", "Critical network threat detected.", {
    sticky: true,
    actionLabel: "Eliminate Threat",
    onAction: () => {
      showWindow(virusPipeWindow);
      startPipeGame();
    },
  });
  if (upgrades.antivirusAutoSolve > 0) {
    setTimeout(() => {
      completeThreatEvent(true);
    }, 800);
  }
}

function completeThreatEvent(auto = false) {
  virusState.threatPending = false;
  virusState.kills = 0;
  totalMoney += 3;
  updateMoneyDisplay();
  showToast("Threat Cleared", auto ? "Antivirus auto-resolved the network threat." : "Threat eliminated. +$3 reward.");
  maybeAward("network-purge", "Network Purge", "Cleared the pipe threat event.");
  hideWindow(virusPipeWindow);
  pipeGame = null;
  saveCurrentSlot();
}

function pipeConnections(cell) {
  if (!cell || !cell.type) return [];
  if (cell.type === "line") return cell.rot % 180 === 0 ? ["up", "down"] : ["left", "right"];
  if (cell.type === "corner") {
    const r = ((cell.rot % 360) + 360) % 360;
    if (r === 0) return ["up", "right"];
    if (r === 90) return ["right", "down"];
    if (r === 180) return ["down", "left"];
    return ["left", "up"];
  }
  return [];
}

function randomPipeEndpoints(size) {
  const start = {
    x: Math.floor(Math.random() * size),
    y: Math.floor(Math.random() * size),
  };
  let end = { x: start.x, y: start.y };
  let safety = 0;
  while (safety < 200) {
    end = {
      x: Math.floor(Math.random() * size),
      y: Math.floor(Math.random() * size),
    };
    const distance = Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
    if (distance >= 5) {
      break;
    }
    safety += 1;
  }
  return { start, end };
}

function pipeCellGlyph(cell) {
  if (!cell) {
    return "+";
  }
  const rot = ((cell.rot || 0) % 360 + 360) % 360;
  if (cell.type === "line") {
    return rot % 180 === 0 ? "│" : "─";
  }
  if (cell.type === "corner") {
    if (rot === 0) return "└";
    if (rot === 90) return "┌";
    if (rot === 180) return "┐";
    return "┘";
  }
  return "+";
}

function startPipeGame() {
  const size = 6;
  const endpoints = randomPipeEndpoints(size);
  const start = endpoints.start;
  const end = endpoints.end;
  pipeGame = { size, start, end, selectedType: "line", selectedIndex: null, cells: Array(size * size).fill(null), timeLeft: 60, timer: null };
  renderPipeGrid();
  if (pipeGame.timer) clearInterval(pipeGame.timer);
  pipeGame.timer = setInterval(() => {
    if (!pipeGame) return;
    pipeGame.timeLeft -= 1;
    pipeTimer.textContent = `Time: ${pipeGame.timeLeft}s`;
    if (pipeGame.timeLeft <= 0) {
      clearInterval(pipeGame.timer);
      totalMoney -= 3;
      updateMoneyDisplay();
      showToast("Threat Failed", "Time expired. You lost $3.");
      hideWindow(virusPipeWindow);
      pipeGame = null;
      saveCurrentSlot();
    }
  }, 1000);
  pipeTimer.textContent = "Time: 60s";
}

function renderPipeGrid() {
  if (!pipeGrid || !pipeGame) return;
  pipeGrid.innerHTML = "";
  for (let i = 0; i < pipeGame.cells.length; i += 1) {
    const x = i % pipeGame.size;
    const y = Math.floor(i / pipeGame.size);
    const btn = document.createElement("button");
    btn.className = "pipe-cell";
    const cell = pipeGame.cells[i];
    if (pipeGame.selectedIndex === i) btn.classList.add("selected");
    if (x === pipeGame.start.x && y === pipeGame.start.y) {
      btn.classList.add("start");
      btn.textContent = "S";
      btn.disabled = true;
    } else if (x === pipeGame.end.x && y === pipeGame.end.y) {
      btn.classList.add("end");
      btn.textContent = "E";
      btn.disabled = true;
    } else {
      btn.textContent = pipeCellGlyph(cell);
    }
    btn.addEventListener("click", () => {
      pipeGame.selectedIndex = i;
      if (!(x === pipeGame.start.x && y === pipeGame.start.y) && !(x === pipeGame.end.x && y === pipeGame.end.y)) {
        const existing = pipeGame.cells[i];
        const nextRot = existing && existing.type === pipeGame.selectedType ? existing.rot || 0 : 0;
        pipeGame.cells[i] = { type: pipeGame.selectedType, rot: nextRot };
      }
      renderPipeGrid();
    });
    btn.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (x === pipeGame.start.x && y === pipeGame.start.y) {
        return;
      }
      if (x === pipeGame.end.x && y === pipeGame.end.y) {
        return;
      }
      pipeGame.cells[i] = null;
      if (pipeGame.selectedIndex === i) {
        pipeGame.selectedIndex = null;
      }
      renderPipeGrid();
    });
    pipeGrid.appendChild(btn);
  }
}

function checkPipeSolved() {
  if (!pipeGame) return false;
  const dirs = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };
  const opp = { up:"down", down:"up", left:"right", right:"left" };
  const queue = [{ x: pipeGame.start.x, y: pipeGame.start.y, from: null }];
  const seen = new Set();
  while (queue.length) {
    const cur = queue.shift();
    const key = `${cur.x},${cur.y}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (cur.x === pipeGame.end.x && cur.y === pipeGame.end.y) return true;
    const idx = cur.y * pipeGame.size + cur.x;
    let conns = [];
    if (cur.x === pipeGame.start.x && cur.y === pipeGame.start.y) conns = ["up", "down", "left", "right"];
    else if (cur.x === pipeGame.end.x && cur.y === pipeGame.end.y) conns = ["up", "down", "left", "right"];
    else conns = pipeConnections(pipeGame.cells[idx]);
    for (const d of conns) {
      const [dx,dy] = dirs[d];
      const nx=cur.x+dx, ny=cur.y+dy;
      if (nx<0||ny<0||nx>=pipeGame.size||ny>=pipeGame.size) continue;
      const nidx = ny*pipeGame.size+nx;
      let nconns=[];
      if (nx===pipeGame.end.x&&ny===pipeGame.end.y) nconns=["up","down","left","right"];
      else if (nx===pipeGame.start.x&&ny===pipeGame.start.y) nconns=["up","down","left","right"];
      else nconns = pipeConnections(pipeGame.cells[nidx]);
      if (nconns.includes(opp[d])) queue.push({x:nx,y:ny,from:opp[d]});
    }
  }
  return false;
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
    upgrades.timeReducer +
    upgrades.doubleTap +
    upgrades.antivirus +
    upgrades.antivirusAutoSolve
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
  el.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    openIconContextMenu(el, event.clientX, event.clientY, "store-decoration");
  });
  enableDecorationDragging(el);
  return el;
}

function enableDecorationDragging(el) {
  el.addEventListener("mousedown", (event) => {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
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
    if (achievementFilter === "unlocked" && !unlocked) return;
    if (achievementFilter === "locked" && unlocked) return;
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

function setupDesktopSettingsTabs() {
  if (!desktopSettingsTabs) {
    return;
  }
  desktopSettingsTabs.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      desktopSettingsTabs.querySelectorAll(".tab").forEach((other) => {
        other.classList.toggle("active", other === tab);
      });
      document.querySelectorAll("[data-settings-content]").forEach((panel) => {
        panel.classList.toggle("hidden", panel.dataset.settingsContent !== tab.dataset.settingsTab);
      });
    });
  });
}

function updateAudioStatus() {
  if (!audioStatus) {
    return;
  }
  const state = audioEnabled ? "enabled" : "muted";
  audioStatus.textContent = `Audio ${state} · Master ${(masterVolume * 100).toFixed(0)}% · BG ${(musicVolume * 100).toFixed(0)}% · SFX ${(sfxVolume * 100).toFixed(0)}%`;
  if (masterVolumeInput) masterVolumeInput.value = String(masterVolume.toFixed(2));
  if (bgVolumeInput) bgVolumeInput.value = String(musicVolume.toFixed(2));
  if (sfxVolumeInput) sfxVolumeInput.value = String(sfxVolume.toFixed(2));
}

function renderSongShop() {
  if (!songShopList) {
    return;
  }
  songShopList.innerHTML = "";
  songCatalog.forEach((song) => {
    const li = document.createElement("li");
    li.className = "cosmetic-item";
    const info = document.createElement("div");
    const sourceLabel = song.source ? "configured" : "(set source later)";
    info.innerHTML = `<strong>${song.title}</strong><p class="small">Disc source: ${sourceLabel}</p>`;
    const button = document.createElement("button");
    button.className = "retry";
    if (isSongUnlocked(song.id)) {
      button.textContent = "Unlocked";
      button.disabled = true;
    } else if (song.secret) {
      button.textContent = "???";
      button.disabled = true;
    } else {
      button.textContent = `Buy - $${song.cost}`;
      button.disabled = totalMoney < song.cost;
      button.addEventListener("click", () => {
        if (totalMoney < song.cost) {
          return;
        }
        totalMoney -= song.cost;
        updateMoneyDisplay();
        unlockSong(song.id);
      });
    }
    li.appendChild(info);
    li.appendChild(button);
    songShopList.appendChild(li);
  });
}

function renderJukeboxTracks() {
  if (!jukeboxTrackList) {
    return;
  }
  jukeboxTrackList.innerHTML = "";
  const tracks = songCatalog.filter((song) => isSongUnlocked(song.id));
  if (tracks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tracks unlocked yet.";
    jukeboxTrackList.appendChild(li);
    return;
  }
  tracks.forEach((song) => {
    const li = document.createElement("li");
    li.className = "cosmetic-item";
    const info = document.createElement("div");
    info.innerHTML = `<strong>${song.title}</strong>`;
    const button = document.createElement("button");
    button.className = "retry";
    const isCurrent = currentTrack && currentTrack.id === song.id;
    button.textContent = isCurrent ? "Stop" : "Play";
    button.classList.toggle("playing-stop", !!isCurrent);
    button.addEventListener("click", () => {
      const active = currentTrack && currentTrack.id === song.id;
      if (active) {
        stopSong();
      } else {
        playSong(song.id);
      }
    });
    li.appendChild(info);
    li.appendChild(button);
    jukeboxTrackList.appendChild(li);
  });
  if (jukeboxNowPlaying) {
    const song = currentTrack ? getSong(currentTrack.id) : null;
    jukeboxNowPlaying.textContent = song ? song.title : "W96 Ambient";
  }
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
  if (casinoIcon.classList.contains("hidden")) {
    casinoIcon.classList.remove("hidden");
    placeInstalledIcon(casinoIcon, 0);
  }
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
    if (casinoIcon.classList.contains("hidden")) {
      casinoIcon.classList.remove("hidden");
      placeInstalledIcon(casinoIcon, 0);
    }
  }
}

function refreshUpgrades() {
  const tapNames = ["Double-Tap", "Triple-Tap", "Quadra-Tap", "Penta-Tap", "Penta-Tap MAX"];
  const tapLevel = Math.max(0, Math.min(upgrades.doubleTap, 4));
  if (doubleTapName) {
    doubleTapName.textContent = tapNames[tapLevel];
  }
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
    if (config.levelEl) {
      config.levelEl.textContent = levelText;
    }
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
  if (key === "double-tap") {
    upgrades.doubleTap = Math.min(upgrades.doubleTap + 1, 5);
  }
  if (key === "antivirus") {
    upgrades.antivirus = 1;
    if (antivirusIcon && antivirusIcon.classList.contains("hidden")) {
      antivirusIcon.classList.remove("hidden");
      placeInstalledIcon(antivirusIcon, 0);
    }
  }
  if (key === "antivirus-autosolve") {
    upgrades.antivirusAutoSolve = 1;
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
  if (key === "double-tap") {
    return upgrades.doubleTap;
  }
  if (key === "antivirus") {
    return upgrades.antivirus;
  }
  if (key === "antivirus-autosolve") {
    return upgrades.antivirusAutoSolve;
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

function buildDeck() {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["♠", "♥", "♦", "♣"];
  const deck = [];
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      deck.push({ rank, suit });
    });
  });
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function drawCard(state) {
  const card = state.deck.pop();
  return card || { rank: "A", suit: "♠" };
}

function handValue(hand) {
  let total = 0;
  let aces = 0;
  hand.forEach((card) => {
    if (["J", "Q", "K"].includes(card.rank)) {
      total += 10;
    } else if (card.rank === "A") {
      total += 11;
      aces += 1;
    } else {
      total += Number(card.rank);
    }
  });
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
}

function formatHand(hand, hideSecond = false) {
  return hand
    .map((card, index) => {
      if (hideSecond && index === 1) {
        return "[??]";
      }
      return `[${card.rank}${card.suit}]`;
    })
    .join(" ");
}

function renderBlackjackBoard(revealDealer = false) {
  if (!blackjackState) {
    casinoCards.textContent = "";
    return;
  }
  const playerScore = handValue(blackjackState.player);
  const dealerScore = handValue(blackjackState.dealer);
  const dealerLine = revealDealer
    ? `Dealer: ${formatHand(blackjackState.dealer)} (${dealerScore})`
    : `Dealer: ${formatHand(blackjackState.dealer, true)} (?)`;
  const playerLine = `You: ${formatHand(blackjackState.player)} (${playerScore})`;
  casinoCards.textContent = `${dealerLine} | ${playerLine}`;
}

function finishBlackjack(result, returnFactor = 0) {
  casinoHit.classList.add("hidden");
  casinoStand.classList.add("hidden");
  const bet = blackjackState ? blackjackState.bet : 0;
  totalMoney = Number(totalMoney) || 0;
  if (result === "win") {
    const returned = Math.round(bet * returnFactor * 100) / 100;
    totalMoney += returned;
    casinoStatus.textContent = `Blackjack win! Returned $${returned.toFixed(2)}.`;
  } else if (result === "push") {
    totalMoney += bet;
    casinoStatus.textContent = "Push. Your bet was returned.";
  } else {
    casinoStatus.textContent = `Dealer wins. You lost $${bet}.`;
  }
  updateMoneyDisplay();
  saveCurrentSlot();
  renderBlackjackBoard(true);
  blackjackState = null;
}

function dealerTurn() {
  if (!blackjackState) {
    return;
  }
  while (handValue(blackjackState.dealer) < 17) {
    blackjackState.dealer.push(drawCard(blackjackState));
  }
  const playerScore = handValue(blackjackState.player);
  const dealerScore = handValue(blackjackState.dealer);
  if (dealerScore > 21 || playerScore > dealerScore) {
    finishBlackjack("win", 2);
    return;
  }
  if (dealerScore === playerScore) {
    finishBlackjack("push");
    return;
  }
  finishBlackjack("lose");
}

function startBlackjackRound() {
  const bet = getBetAmount();
  if (!bet) {
    return;
  }
  totalMoney -= bet;
  casinoBets += 1;
  if (casinoBets >= 5) {
    maybeAward("casino-regular", "Casino Regular", "Placed 5 casino bets.");
  }
  blackjackState = {
    bet,
    deck: buildDeck(),
    player: [],
    dealer: [],
  };
  blackjackState.player.push(drawCard(blackjackState), drawCard(blackjackState));
  blackjackState.dealer.push(drawCard(blackjackState), drawCard(blackjackState));
  casinoHit.classList.remove("hidden");
  casinoStand.classList.remove("hidden");
  const playerScore = handValue(blackjackState.player);
  const dealerScore = handValue(blackjackState.dealer);
  updateMoneyDisplay();
  renderBlackjackBoard(false);
  if (playerScore === 21 && dealerScore === 21) {
    finishBlackjack("push");
    return;
  }
  if (playerScore === 21) {
    finishBlackjack("win", 2.5);
    return;
  }
  if (dealerScore === 21) {
    finishBlackjack("lose");
    return;
  }
  casinoStatus.textContent = "Blackjack started. Hit or stand.";
}

function hitBlackjack() {
  if (!blackjackState) {
    casinoStatus.textContent = "Start a blackjack round first.";
    return;
  }
  blackjackState.player.push(drawCard(blackjackState));
  const playerScore = handValue(blackjackState.player);
  renderBlackjackBoard(false);
  if (playerScore > 21) {
    finishBlackjack("lose");
  }
}

function standBlackjack() {
  if (!blackjackState) {
    casinoStatus.textContent = "Start a blackjack round first.";
    return;
  }
  dealerTurn();
}

function resolveSimpleBet(label, winChance = 0.5) {
  const bet = getBetAmount();
  if (!bet) {
    return;
  }
  blackjackState = null;
  casinoHit.classList.add("hidden");
  casinoStand.classList.add("hidden");
  casinoCards.textContent = "";
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
  if (!blackjackState) {
    startBlackjackRound();
    return;
  }
  hitBlackjack();
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
  if (casinoIcon.classList.contains("hidden")) {
    casinoIcon.classList.remove("hidden");
    placeInstalledIcon(casinoIcon, 0);
  }
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

jukeboxIcon.addEventListener("click", () => {
  if (wasIconDragged(jukeboxIcon)) {
    return;
  }
  showWindow(jukeboxWindow);
});

desktopSettingsIcon.addEventListener("click", () => {
  if (wasIconDragged(desktopSettingsIcon)) {
    return;
  }
  showWindow(desktopSettingsWindow);
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
  startBlackjackRound();
});

casinoHit.addEventListener("click", () => {
  hitBlackjack();
});

casinoStand.addEventListener("click", () => {
  standBlackjack();
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

if (jukeboxStop) {
  jukeboxStop.addEventListener("click", () => {
    stopSong();
  });
}

if (toggleAudioButton) {
  toggleAudioButton.addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    updateAudioStatus();
    if (!audioEnabled) {
      stopSong();
    }
    saveCurrentSlot();
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    stopSong();
    if (virusInterval) { clearInterval(virusInterval); virusInterval = null; }
    clearPendingVirusJitter();
    desktop.classList.add("hidden");
    openLoginScreen();
  });
}


if (loginBackButton) {
  loginBackButton.addEventListener("click", () => {
    loginScreen.classList.add("hidden");
    titleOverlay.classList.remove("hidden");
  });
}

if (openAchievementsWindow && achievementsWindow) {
  openAchievementsWindow.addEventListener("click", () => {
    showWindow(achievementsWindow);
  });
}

document.querySelectorAll("[data-ach-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    achievementFilter = button.dataset.achFilter;
    document.querySelectorAll("[data-ach-filter]").forEach((other) => {
      other.classList.toggle("active", other === button);
    });
    renderAchievements();
  });
});

document.querySelectorAll("[data-audio-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.dataset.audioStep;
    const delta = Number(button.dataset.step || 0);
    const map = { master: masterVolume, bg: musicVolume, sfx: sfxVolume };
    setVolume(kind, map[kind] + delta);
  });
});

if (masterVolumeInput) {
  masterVolumeInput.addEventListener("change", () => setVolume("master", masterVolumeInput.value));
}
if (bgVolumeInput) {
  bgVolumeInput.addEventListener("change", () => setVolume("bg", bgVolumeInput.value));
}
if (sfxVolumeInput) {
  sfxVolumeInput.addEventListener("change", () => setVolume("sfx", sfxVolumeInput.value));
}

if (antivirusIcon) {
  antivirusIcon.addEventListener("click", () => {
    if (wasIconDragged(antivirusIcon)) return;
    showWindow(antivirusWindow);
  });
}

if (pipeRotate) {
  pipeRotate.addEventListener("click", () => {
    if (!pipeGame || pipeGame.selectedIndex === null) return;
    const cell = pipeGame.cells[pipeGame.selectedIndex];
    if (!cell) return;
    cell.rot = ((cell.rot || 0) + 90) % 360;
    renderPipeGrid();
  });
}

if (notepadText) {
  notepadText.addEventListener("input", () => {
    if (!activeNoteIcon) {
      return;
    }
    activeNoteIcon.dataset.noteContent = notepadText.value;
    saveCurrentSlot();
  });
}

if (pipeCheck) {
  pipeCheck.addEventListener("click", () => {
    if (checkPipeSolved()) {
      completeThreatEvent(false);
    } else {
      pipeStatus.textContent = "Path incomplete. Keep connecting pipes.";
    }
  });
}

document.querySelectorAll("[data-pipe-type]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!pipeGame) return;
    pipeGame.selectedType = button.dataset.pipeType;
    document.querySelectorAll("[data-pipe-type]").forEach((other) => {
      other.classList.toggle("active", other === button);
    });
  });
});

document.querySelectorAll(".icon").forEach((iconEl) => {
  iconEl.addEventListener("click", () => {
    if (!iconEl.id || virusState.pendingIconId !== iconEl.id) return;
    const windowEl = getWindowForIcon(iconEl.id);
    setTimeout(() => maybeSpawnVirusNode(windowEl), 120);
  });
});


if (desktop) {
  desktop.addEventListener("contextmenu", (event) => {
    const isOnIcon = event.target.closest(".icon");
    const isOnWindow = event.target.closest(".window");
    const isOnDecoration = event.target.closest(".decoration");
    if (isOnIcon || isOnWindow || isOnDecoration) {
      return;
    }
    event.preventDefault();
    closeIconContextMenu();
    openDesktopContextMenu(event.clientX, event.clientY);
  });
}

if (newNoteButton) {
  newNoteButton.addEventListener("click", () => {
    if (pendingDesktopContextPos) {
      createNoteIcon({}, pendingDesktopContextPos);
    } else {
      createNoteIcon();
    }
    closeDesktopContextMenu();
  });
}

if (refreshDesktopButton) {
  refreshDesktopButton.addEventListener("click", () => {
    refreshDesktopIcons();
    closeDesktopContextMenu();
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
  if (iconContextMenu && !iconContextMenu.classList.contains("hidden")) {
    if (!event.target.closest("#iconContextMenu")) {
      closeIconContextMenu();
    }
  }
  if (desktopContextMenu && !desktopContextMenu.classList.contains("hidden")) {
    if (!event.target.closest("#desktopContextMenu")) {
      closeDesktopContextMenu();
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest("button") || event.target.closest(".icon")) {
    playSfx("click");
  }
});

updateClock();
setInterval(updateClock, 1000);
refreshTitleAction();
setupWindowDragging();
setupIconDragging();
loadSlot();
isBootstrapping = false;
renderTaskbarWindows();
refreshUpgrades();
registerClickerInstance(clickerWindow);
renderCosmetics();
renderAchievements();
renderSongShop();
renderJukeboxTracks();
setupShopTabs();
setupDesktopSettingsTabs();
updateAudioStatus();
