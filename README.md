# Tauri drum-machine

** ***Important! [Node](https://nodejs.org/en/download), [pnpm](https://pnpm.io/installation), [Microsoft Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/), WebView2 and [Rust](https://www.rust-lang.org/tools/install) must be installed to run this project.*** **
<br>
<br>
*On Windows 10 (Version 1803 and later with all updates applied) and Windows 11, the WebView2 runtime is distributed as part of the operating system.*
<br>
<br>
Node version: **18.12.1**
<br>
pnpm version: **8.15.6**
<br>

*Metronome sound by Druminfected*

⚠️ This project is under construction ⚠️

## **--- Init ---**
These first commands will install all the needed dependences.
<br>
<br>
**-> pnpx husky init**
<br>
**-> pnpm i**
<br>
## **--- Starting dev server ---**
This command will open a new window with the application and the web dev console
<br>
<br>
**-> pnpm start**
<br>
<br>
## **--- Make a build ---**
Build destination: ./src-tauri/target/release/bundle
<br>
<br>
**-> pnpm run package**
<br>
<br>
If you want to just get the web build, you can get the output in ./.vite/renderer/ after running the script above
