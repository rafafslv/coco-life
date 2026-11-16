# Coco Life

A playful browser-world prototype: customize a character, explore a rotating circular neighborhood, enter cozy places, and take a little car for a drive.

## Run locally

```bash
npm install
npm run dev
```

## Controls

- **WASD / arrow keys**: move around a place
- **Click or tap**: move to a spot, select a building, or use the map arrows
- **E / Space**: interact with a nearby object
- **R**: rotate the neighborhood ring
- **Esc**: close a panel or leave a place

The prototype is a single-player sandbox. It stores only game preferences and progress in this browser's local storage. No account, chat, analytics, or networked player data is used.

## Tech

Phaser 3 + TypeScript + Vite. The first slice uses original vector-drawn art so it can run immediately while the project's separately created artwork is organized and exported into the repository.

## Deploy

The GitHub Actions workflow builds the game and publishes `dist/` to GitHub Pages after Pages is configured to use **GitHub Actions** as its source.
