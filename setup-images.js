#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🖼️  Setting up image asset directories...\n");

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
    console.log(`✅ Created: ${dir}`);
  } else {
    console.log(`📁 Exists: ${dir}`);
  }
});

console.log("\n🎯 Image asset directories ready!");
console.log("\n📝 Usage examples:");
console.log('   <img src="/images/hero/kitchen-hero.jpg" alt="Kitchen" />');
console.log(
  '   <Image src="/images/logos/logo.svg" alt="Logo" width={200} height={100} />'
);
console.log("\n💡 Add your image files to the appropriate subdirectories");
