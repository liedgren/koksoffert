#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const imageDirs = [
  "public/images/icons",
  "public/images/logos",
  "public/images/hero",
  "public/images/backgrounds",
  "public/images/ui",
];

// Create directories
imageDirs.forEach((dir) => {
  const fullPath = path.join(__dirname, dir);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});
