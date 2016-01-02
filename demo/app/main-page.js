/**********************************************************************************
 * (c) 2016, Master Technology
 * Licensed under the MIT license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 0.0.1                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

var ZXing = require('nativescript-zxing');
var imageSource = require('image-source');

var img, txt;
exports.pageLoaded = function(args) {
    var page = args.object;
    img = page.getViewById('img');
    txt = page.getViewById('txt');

};


exports.click = function() {
    var zx = new ZXing();
    var text = txt.text || "Demo by Master Technology";
    var newImg = zx.createBarcode({encode: text});

    img.imageSource = imageSource.fromNativeSource(newImg);

};