# ElectronCGI Calculator Demo

Demo project for ElectronCGI using Electron for the GUI and .Net for the operations.

For more information about ElectronCGI read [this](https://www.blinkingcaret.com/2019/11/27/electroncgi-a-solution-to-cross-platform-guis-for-net-core/).

**To run the project** go to the app folder `cd NodeCalculator` and then run `npm start` (You might need to change the path to the DotNetCalculator).

**To create a rpm for Linux**:
1. Go to `cd DotNetCalculator` folder
2. Run for linux `dotnet publish --configuration release --runtime linux-x64 --self-contained false --output bin/Release/netcoreapp3.1/publish/`
3. Go to `cd NodeCalculator`
4. Run `npm run dist-linux`
5. The `.rpm` package will be available in `dist` folder
6. To install the rpm on linux use `sudo yum install {path-to-rpm-file}` or `sudo dnf install {path-to-rpm-file}` or `sudo rpm –i {path-to-rpm-file}`

**To create a setup file for Windows**:
1. Go to `cd DotNetCalculator` folder
2. Run for windows `dotnet publish --configuration release --runtime win-x64 --self-contained false --output bin/Release/netcoreapp3.1/publish/`
3. Go to `cd NodeCalculator`
4. Run `npm run dist-win`
5. The exe installation file will be available in `dist` folder
6. To install just run `/dist/Calculator Demo Setup 1.0.0.exe` file.

Some ideas how to create a kiosk app on linux:

https://www.electron.build/configuration/configuration

https://gist.github.com/voor/8215016d722da5df0caf629469fe7e80

https://help.gnome.org/admin/system-admin-guide/stable/lockdown-single-app-mode.html.en

https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/desktop_migration_and_administration_guide/single-application-ode

https://github.com/VoidVolker/kiosk/blob/master/linux_kiosk_init.sh

https://gist.github.com/anonymous/5bba6c9b6425a42b4ea1
