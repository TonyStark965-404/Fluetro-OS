# Fluetro OS

A clean (kinda) customizable WebOS. Like my other project: Fluent New Tab, this is also inspired heavily by Microsoft Fluent Design System and macOS versions before Tahoe. 

## How does it look?

### Logon/Welcome Screen:
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/929622df-43dc-413d-b0b7-55ea84c2daf5" />

### Light Mode:
<img width="1911" height="1073" alt="image" src="https://github.com/user-attachments/assets/4e42c975-74a8-4de2-9f1d-30174743a089" />

### Dark Mode:
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/fd890843-3c7b-4b63-9e4d-22feb99345e1" />

[![Give it a Try](https://img.shields.io/badge/run-os-brightgreen?style=for-the-badge)]()

## How to use?
-Just click the Run OS link and that's it

## What features does it have?
- A consistent design language, inspired by Windows 11 and MacOS 
- macOS style Top Bar with Date and weather, which also have working flyouts
- macOS style dock for apps
- Smooth and consistent animations
- Sign out and shut down screens
- Shut down feature that can actually close the Browser Tab after the sequence
- A Memo so you can note down your thoughts
- Working Paint app
- A calculator app that can do basic calculations.
- No special browser permissions needed
  
## How can I run it locally and modify it?
   Easy, just do this:
   ```bash
   git clone https://github.com/TonyStark965-404/Fluent-New-Tab.git
   cd fluetro-os
```
then open index.html in your browser to run locally
or open the folder in VS Code or any other editor to modify

## How does it work?
Fluetro OS is built with HTML, CSS and JavaScript, where the Memo content, Weather Location and user preferences (like Dark Mode and Wallpaper) are stored locally using localStorage. The weather data is fetched using Open-Meteo.
   
## Whom to Credit for the assets?
- [Mykyta Martynenko](https://unsplash.com/@prostotakphoto) on Unsplash for the Wallpapers
- [Icons8](https://icons8.com) for the "Settings" and "+" icons

## Any Features planned for the Future?
Of Course
- Games
- A working Browser (work in progress)
- The Files app to browse well... files (work in progress)
- Maybe a Music Player
  
## Are There some issues?
Yes
- There is no animation for Maximize/Restore Down
- Two of the apps are still Work in Progress, I just included them so it feels more full
- Since it doesn't require any browser permissions you have to add the Weather Location by yourself
- Weather uses emojis for icons, so it's not consistent across different operating systems.
- Paint app starts with the default theme as retro, doesn't follow OS Dark Mode and should be changed via Extras>Themes for consistency
- Calculator app only takes input through clicking the buttons
