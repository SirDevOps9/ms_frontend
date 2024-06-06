# MicrotecBackend Front apps

## Table of Contents
1. [Setting Up](#setting-up)
2. [Proxy Configuration](#proxy-configuration)
3. [Custom Commands](#custom-commands)
4. [Serving](#serving)
5. [Publishing](#publishing)
6. [SSL Configuration](#ssl-configuration)
7. [DNS Configuration](#dns-configuration)

## Setting Up <a name="setting-up"></a>

### Install Dependencies
Before starting, make sure to install the project dependencies by running: `npm i --f`

## Proxy Configuration <a name="proxy-configuration"></a>

### Setting Up Proxy
If you have a `proxy.js` file for handling redirects, ensure it's properly configured to intercept requests. Typically, this file would be located in the root of your project. You can then start the proxy server using:

## Custom Commands <a name="custom-commands"></a>

### To Add a new Project
Please run `ng g application {projectname} --standalone false`

### To Add new Library
Please run `ng g lib {libraryname} --standalone false`

### To Generate a new Component or Service
Please use Angular Files Extension: [Angular Files Extension](https://marketplace.visualstudio.com/items?itemName=alexiv.vscode-angular2-files)

## Serving <a name="serving"></a>

**Important:** If you are working with identity auth, please don't use any other ports other than 4300 for client verification.

### Run All Projects
Run `npm run start:all` to run all projects. Navigate to [http://localhost:4300/](http://localhost:4300/). The application will automatically reload if you change any of the source files.

### Run Specific Projects

#### Admin Portal
Navigate to [http://localhost:4300/adminportal](http://localhost:4300/adminportal). The application will automatically reload if you change any of the source files.

#### Business Owners
Navigate to [http://localhost:4300/businessowners](http://localhost:4300/businessowners). The application will automatically reload if you change any of the source files.

### Run ERP Projects
Run `npm run start:erp` to run all ERP Projects.

#### Accounting
Navigate to [https://develop.localhost.com:4400/accounting](https://develop.localhost.com:4400/accounting). The application will automatically reload if you change any of the source files.

#### HR
Navigate to [https://develop.localhost.com:4400/hr](https://develop.localhost.com:4400/hr). The application will automatically reload if you change any of the source files.

#### ERP Home
Navigate to [https://develop.localhost.com:4400/erp](https://develop.localhost.com:4400/erp). The application will automatically reload if you change any of the source files.

## Publishing <a name="publishing"></a>

### Building Business Owners
Run `npm run build:business-owners`

### Building Admin Portal
Run `npm run build:adminportal`

### Building Accounting
Run `npm run build:accounting`

### Building ERP Home
Run `npm run build:erphome`

### Building HR
Run `npm run build:hr`

## SSL Configuration <a name="ssl-configuration"></a>

### Step 1: Install Certificate
Open the SSL folder next to the projects folder in our repository. Right-click on `localhost.crt` and click "Install Certificate".

### Step 2: Select Local Machine
Select "Local Machine" and hit "Next".

### Step 3: Select Certificate Store
Select "Place all certificates in the following store" and hit "Next".

### Step 4: Select Trusted Root Certificate Authorities
Select "Browse" and select "Trusted Root Certificate Authorities". Hit "Next".

### Step 5: Finish
Then finish and next.

## DNS Configuration <a name="dns-configuration"></a>

### Step 1: Open Hosts File
Open `C:\Windows\System32\drivers\etc` folder.

### Step 2: Add Hosts Entry
Open `hosts` file and add this line at the end: "127.0.0.1 develop.localhost.com" without the quotes.

### Step 3: Save File
Save the file.
