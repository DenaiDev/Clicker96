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
