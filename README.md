# Person Form Prototype

A clickable prototype of the redesigned person form. It's plain HTML, CSS and JavaScript, with nothing to install or build.

## Run it

Open `index.html` in a browser. It needs an internet connection only to load the Roboto font. Without one, it falls back to a system font.

The layout is designed for wide desktop screens (around 1720px).

## Files

| File | What it holds |
|---|---|
| `index.html` | The page layout and form fields |
| `styles.css` | Shared styles (most layout styles are inline in `index.html`) |
| `app.js` | The children table, the Trail / Comments tabs, and the sample trail and comment data |

## What works

- **Children:** choosing Yes shows the children table, where you can add and remove rows.
- **Right panel:** switch between the Trail and Comments tabs.
- **Trail stages:** the form starts at Draft. To preview a later stage, add it to the URL, for example `index.html?stage=State%20Recommended`. The stage names are listed at the top of `app.js`.

## What doesn't work yet

This is a design prototype with no backend, so nothing is saved. Save, Post, Change photo, record navigation and the lookup fields don't do anything, and selecting a Satsang Place doesn't fill in the place hierarchy.

## Placeholder content

All form values, dates and comments are sample data. The person photo and document thumbnail are grey placeholder boxes.
