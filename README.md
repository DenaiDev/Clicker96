# Clicker96

## Running locally

You can run this as a static site.

**Option A: Open directly**
- Open `index.html` in your browser.

**Option B: Serve locally (recommended for consistent behavior)**
```bash
python -m http.server 8000
```
Then visit `http://127.0.0.1:8000/`.

## Adding assets

Place any future images, audio, or other assets in a new `assets/` folder (for example, `assets/avatars/`).
Reference them from the HTML/CSS/JS using relative paths like `assets/avatars/your-image.png`.

## Git ignore

You don’t strictly *need* a `.gitignore`, but it helps keep generated artifacts out of version control.
This repo includes a `.gitignore` to exclude screenshot artifacts and OS metadata files.

## Audio integration guide (jukebox + SFX)

The game now has audio scaffolding in `script.js` with placeholder `null` sources.

### Music tracks
- Edit `songCatalog` in `script.js`.
- For each song, set `source` to an audio file path (example: `assets/audio/w96-ambient.ogg`).
- Keep `id` stable so unlocked songs from saves still map correctly.
- `secret: true` hides a track from the shop until unlocked via secrets/achievements.

### UI sounds
- Edit `audioAssets` in `script.js` (`click`, `windowOpen`, `windowClose`, `success`, `error`).
- Set any action to `null` to intentionally make it silent.
- To mute everything from code, set `audioEnabled = false` or use the Desktop Settings > Audio toggle.

### Per-action sound behavior
- Global button/icon click SFX is handled in one document click listener.
- If you need an action to be silent, either:
  1. remove its direct `playSfx(...)` call, and/or
  2. add a guard in the global click listener for a class like `.no-sfx`.

### Supported files
Use browser-supported formats (usually `.ogg`, `.mp3`, `.wav`) and keep file sizes small for fast load times.
