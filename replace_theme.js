const fs = require('fs');

const files = [
    'c:/Users/shlokui/Desktop/CollegeProject/index.html',
    'c:/Users/shlokui/Desktop/CollegeProject/css/styles.css',
    'c:/Users/shlokui/Desktop/CollegeProject/js/app.js'
];

const replacements = [
    { pattern: /#111417/gi, replacement: '#2D4159' },
    { pattern: /#1a1d21/gi, replacement: '#59253A' },
    { pattern: /#2a2d32/gi, replacement: '#78244C' },
    { pattern: /#3d4148/gi, replacement: '#895061' },
    { pattern: /#CCFF00/gi, replacement: '#0677A1' },
    { pattern: /#b8e600/gi, replacement: '#0677A1' },
    { pattern: /#e0ff66/gi, replacement: '#78244C' },
    { pattern: /#00ff88/gi, replacement: '#78244C' },
    { pattern: /rgba\(\s*204\s*,\s*255\s*,\s*0\s*,/gi, replacement: 'rgba(6, 119, 161,' },
    { pattern: /rgba\(\s*204\s*,\s*255\s*,\s*0\s*\)/gi, replacement: 'rgba(6, 119, 161)' },
    { pattern: /rgba\(\s*0\s*,\s*255\s*,\s*136\s*,/gi, replacement: 'rgba(120, 36, 76,' },
    { pattern: /rgba\(\s*0\s*,\s*255\s*,\s*136\s*\)/gi, replacement: 'rgba(120, 36, 76)' },
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        replacements.forEach(r => {
            content = content.replace(r.pattern, r.replacement);
        });
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
