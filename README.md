# MicrotecBackend Front apps 

Please Check Package.json for all our Custom Commands

# Custom Commands
To Add a new Project please run
ng g application {prjectname} --standalone false

To Add new Library
ng g lib {libraryname} --standalone false

To Generate a new Compenant or Service please use 
Angular Files Extenstion
https://marketplace.visualstudio.com/items?itemName=alexiv.vscode-angular2-files

## Serving
Please if you are working with identity auth don't use any other ports other than 4300 for client verfication 

Run `npm run start:all` to run all projects. Navigate to `http://localhost:4300/`. The application will automatically reload if you change any of the source files.

For adminportal, Navigate to `http://localhost:4300/adminportal`. The application will automatically reload if you change any of the source files.

For bussiness-owners, Navigate to `http://localhost:4300/bussinessowners`. The application will automatically reload if you change any of the source files.

For accounting, Navigate to `http://localhost:4300/accounting`. The application will automatically reload if you change any of the source files.

For hr, Navigate to `http://localhost:4300/hr`. The application will automatically reload if you change any of the source files.

For Erp home, Navigate to `http://localhost:4300/erp`. The application will automatically reload if you change any of the source files.



## Publishing
For Building bussiness-owners run `npm build:bussiness-owners`
For Building adminportal run `npm build:adminportal`
For Building accounting run `npm build:accounting`
For Building accounting run `npm build:erphome`
For Building hr run `npm build:hr`
For Building erp run `npm build:erp`

## SSL Configuration
Open the SSL folder in next to the projects folder in our repository
1- right click on localhost.crt and click install certifcate 
2- select local machine hit next
3- select place all certificates in the following store hit next
4- select browse and select Trusted Root Certificate Authorities hit next
5- then finish and next


## DNS Configuration
1- Open C:\Windows\System32\drivers\etc folder
2- open hosts file and add this line at the end "127.0.0.1 fathysub2.localhost.com" without the quotes
3- save the file 
