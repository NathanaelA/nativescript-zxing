/**********************************************************************************
 * (c) 2016-2019, Master Technology
 * Licensed under the APACHE license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 0.0.3                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

/* global android, getElementById, UIImageWriteToSavedPhotosAlbum */

var ZXing = require('nativescript-zxing');
var imageSource = require('image-source');
var fs = require('file-system');
var utils = require('utils/utils');


var img, txt, page;
exports.pageLoaded = function(args) {
	page = args.object;
	img = page.getElementById('img');
	txt = page.getElementById('txt');
};


exports.encode = function() {
	var zx = new ZXing();
	var text = txt.text || "Demo by Master Technology";
	var newImg = zx.createBarcode({encode: text});

	img.imageSource = imageSource.fromNativeSource(newImg);
	var save = getElementById('save');
	save.isEnabled = true;
};

exports.save = function() {
	var folder;
	if (global.android) {
		folder = android.os.Environment.getExternalStoragePublicDirectory (android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath() + "/";
		var path = fs.path.join(folder, "zxingdemo001.jpg");
		var saved = img.imageSource.saveToFile(path, "jpeg");

	} else {
		UIImageWriteToSavedPhotosAlbum(img.imageSource.ios, null, null, null);
	}
};

exports.load = function() {
	var items;
	var imagepicker = require("nativescript-imagepicker");

	var context = imagepicker.create({
		mode: "single"
	});
	context.authorize()
	.then(function() {
		return context.present();
	})
	.then(function(selection) {
		selection.forEach(function(selected) {
			if (global.android) {
				processAndroidBarCode(selected);
			} else {
				processiOSBarCode(selected);
			}
		});
	}).catch(function (e) {
		console.log(e, e.stack);
	});
};

function processAndroidBarCode(uri) {
	var source;
	console.log("Loading: ", uri.android);
	var is = imageSource.fromFile(uri.android);
	source = is.android;

	finishProcessingBarCode(source);

	is.android.recycle();
	is.android = null;
	is = null;
}

function processiOSBarCode(selected) {
	console.log(selected);
	var imgPromise = selected.getImageAsync(function(v, err) {
		if (err) { console.log("Error: ", err); return; }
		if (v && v.CGImage) {
			finishProcessingBarCode(v.CGImage);
		}
	});
}


function finishProcessingBarCode(source) {
	var zxing = new ZXing();

	var results = zxing.decodeBarcode(source, {tryHarder: true, formats: [zxing.QR_CODE,zxing.CODE_128]});

	var resultLabel = page.getElementById("results");
	if (results !== null) {
		resultLabel.text = results.format + " = " + results.barcode;
	} else {
		resultLabel.text = "Not found";
	}

}