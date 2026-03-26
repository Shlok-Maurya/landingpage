import os
import re

files = [
    r"c:\Users\shlokui\Desktop\CollegeProject\index.html",
    r"c:\Users\shlokui\Desktop\CollegeProject\css\styles.css",
    r"c:\Users\shlokui\Desktop\CollegeProject\js\app.js"
]

replacements = {
    r"#111417": "#2D4159",
    r"#1a1d21": "#59253A",
    r"#2a2d32": "#78244C",
    r"#3d4148": "#895061",
    r"#CCFF00": "#0677A1",
    r"#b8e600": "#0677A1",
    r"#e0ff66": "#78244C",
    r"#00ff88": "#78244C",
    r"rgba\(\s*204\s*,\s*255\s*,\s*0\s*,": "rgba(6, 119, 161,",
    r"rgba\(\s*204\s*,\s*255\s*,\s*0\s*\)": "rgba(6, 119, 161)",
    r"rgba\(\s*0\s*,\s*255\s*,\s*136\s*,": "rgba(120, 36, 76,",
    r"rgba\(\s*0\s*,\s*255\s*,\s*136\s*\)": "rgba(120, 36, 76)",
}

for file_path in files:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    for pattern, replacement in replacements.items():
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Theme colors updated successfully!")
