$files = @(
    "c:\Users\shlokui\Desktop\CollegeProject\index.html",
    "c:\Users\shlokui\Desktop\CollegeProject\css\styles.css",
    "c:\Users\shlokui\Desktop\CollegeProject\js\app.js"
)
foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace '#111417', '#2D4159'
        $content = $content -replace '#1a1d21', '#59253A'
        $content = $content -replace '#2a2d32', '#78244C'
        $content = $content -replace '#3d4148', '#895061'
        $content = $content -replace '#CCFF00', '#0677A1'
        $content = $content -replace '#b8e600', '#0677A1'
        $content = $content -replace '#e0ff66', '#78244C'
        $content = $content -replace '#00ff88', '#78244C'
        $content = $content -replace 'rgba\(\s*204\s*,\s*255\s*,\s*0\s*,', 'rgba(6, 119, 161,'
        $content = $content -replace 'rgba\(\s*204\s*,\s*255\s*,\s*0\s*\)', 'rgba(6, 119, 161)'
        $content = $content -replace 'rgba\(\s*0\s*,\s*255\s*,\s*136\s*,', 'rgba(120, 36, 76,'
        $content = $content -replace 'rgba\(\s*0\s*,\s*255\s*,\s*136\s*\)', 'rgba(120, 36, 76)'
        Set-Content -Path $file -Value $content -NoNewline
        Write-Output "Updated $file"
    }
}
