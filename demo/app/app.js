var application = require("application");
/*var le = require('nativescript-liveedit');
le.addRestartFile('zxing.js');
le.addRestartFile('main-page.js');*/
require('nativescript-dom');

application.mainModule = "main-page";
application.cssFile = "./app.css";
application.start();
