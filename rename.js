const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'apps', 'web', 'src'),
  path.join(__dirname, 'apps', 'web', 'index.html'),
  path.join(__dirname, 'apps', 'web', 'package.json'),
];

const replacements = [
  { regex: /KAPSERFX IT SOLUTIONS EST/g, replacement: 'BrokerCoreSolution' },
  { regex: /KAPSERFX IT SOLUTIONS/g, replacement: 'BrokerCoreSolution' },
  { regex: /KAPSERFX/g, replacement: 'BROKERCORESOLUTION' },
  { regex: /KasperFX/g, replacement: 'BrokerCoreSolution' },
  { regex: /KapserFX/g, replacement: 'BrokerCoreSolution' },
  { regex: /kasperfx/gi, replacement: 'brokercoresolution' },
  { regex: /kapserfx/gi, replacement: 'brokercoresolution' },
  { regex: /Kasper-Capital/gi, replacement: 'brokercoresolution' },
  { regex: /kasper-capital/gi, replacement: 'brokercoresolution' },
  { regex: /Kasper/g, replacement: 'BrokerCore' },
  { regex: /Kapser/g, replacement: 'BrokerCore' },
  { regex: /kasper/gi, replacement: 'brokercore' },
  { regex: /kapser/gi, replacement: 'brokercore' },
];

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  
  const stats = fs.statSync(dirPath);
  if (stats.isFile()) {
    processFile(dirPath);
    return;
  }

  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  // Only process text files
  const ext = path.extname(filePath).toLowerCase();
  if (!['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css', '.md'].includes(ext) && ext !== '') {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const r of replacements) {
    content = content.replace(r.regex, r.replacement);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

targetDirs.forEach(processDirectory);
console.log('Done.');
