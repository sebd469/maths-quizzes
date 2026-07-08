# Arkanoid JS Class Game

This is a simple Arkanoid / Breakout-style game made using:

- HTML
- CSS
- JavaScript

It works on GitHub Pages.

## How to use on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Go to repository **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.
7. Wait about 1 minute and open the GitHub Pages link.

## Controls

- Move paddle: Left / Right arrows or A / D
- Launch ball: Space
- Restart after game over: Space

## Easy edits

In `script.js`, you can change the number of rows and columns here:

```js
const brickSettings = {
  rows: 6,
  cols: 10,
  width: 70,
  height: 24,
  gap: 8,
  top: 70
};
```
