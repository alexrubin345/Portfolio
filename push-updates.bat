@echo off
setlocal enabledelayedexpansion

echo.
echo =====================================
echo   Portfolio Update - Git Push
echo =====================================
echo.

cd /d "C:\Projects\Portfolio"

echo Checking for changes...
& "C:\Program Files\Git\bin\git.exe" status

echo.
echo =====================================
echo.

set /p message="Enter your commit message: "

if "!message!"=="" (
    echo Error: You must enter a commit message
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo.
echo Staging changes...
& "C:\Program Files\Git\bin\git.exe" add .

echo Committing changes...
& "C:\Program Files\Git\bin\git.exe" commit -m "!message!"

echo Pushing to GitHub...
& "C:\Program Files\Git\bin\git.exe" push

echo.
echo =====================================
echo   SUCCESS! Your portfolio is updated
echo =====================================
echo.
echo Your changes are now live at:
echo https://alexrubin345.github.io/Portfolio/
echo.
echo Press any key to exit...
pause >nul
