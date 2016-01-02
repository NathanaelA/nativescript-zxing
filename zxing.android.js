/*************************************************************************************
 * (c) 2016, Master Technology
 * Licensed under the APACHE license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 0.0.1                                      Nathan@master-technology.com
 ************************************************************************************/
"use strict";

/* global android, com, java, javax, global */

function NativeZXing() {
    if (!this instanceof NativeZXing) { // jshint ignore:line
        //noinspection JSValidateTypes
        return new NativeZXing();
    }
}

NativeZXing.prototype.createBarcode = function(options) {
	var encode="NOTHING", width=100, height=100, format = this.QR_CODE;
	if (options) {
        if (options.encode) {
            encode = options.encode;
        }
        if (options.width) {
            width = options.width;
        }
        if (options.height) {
            height = options.height;
        }
        if (options.format) {
            format = options.format;
        }
    }
    var hints = null;
    var writer = new com.google.zxing.MultiFormatWriter();
    var result = writer.encode(encode, format, width, height, hints);
    width = result.getWidth();
    height = result.getHeight();
    var pixels = [];
    for (var y=0;y<height;y++) {
        var offset = y*width;
        for (var x=0;x<width;x++) {
            pixels[offset+x] = result.get(x,y) ? 0xFF000000 : 0xFFFFFFFF;  // Black : White
        }
    }
    var bitmap = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
    bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
    return bitmap;
};


// Create Mapping to make this simpler to choose a barcode type.
NativeZXing.QR_CODE = NativeZXing.prototype.QR_CODE = com.google.zxing.BarcodeFormat.QR_CODE;
NativeZXing.EAN_8 = NativeZXing.prototype.EAN_8 = com.google.zxing.BarcodeFormat.EAN_8;
NativeZXing.UPC_E = NativeZXing.prototype.UPC_E = com.google.zxing.BarcodeFormat.UPC_E;
NativeZXing.EAN_13 = NativeZXing.prototype.EAN_13 = com.google.zxing.BarcodeFormat.EAN_13;
NativeZXing.UPC_A = NativeZXing.prototype.UPC_A = com.google.zxing.BarcodeFormat.UPC_A;
NativeZXing.CODE_39 = NativeZXing.prototype.CODE_39 = com.google.zxing.BarcodeFormat.CODE_39;
NativeZXing.CODE_93 = NativeZXing.prototype.CODE_93 = com.google.zxing.BarcodeFormat.CODE_93;
NativeZXing.CODE_128 = NativeZXing.prototype.CODE_128 = com.google.zxing.BarcodeFormat.CODE_128;
NativeZXing.ITF = NativeZXing.prototype.ITF = com.google.zxing.BarcodeFormat.ITF;
NativeZXing.PDF_417 = NativeZXing.prototype.PDF_417 = com.google.zxing.BarcodeFormat.PDF_417;
NativeZXing.CODABAR = NativeZXing.prototype.CODABAR = com.google.zxing.BarcodeFormat.CODABAR;
NativeZXing.DATA_MATRIX = NativeZXing.prototype.DATA_MATRIX = com.google.zxing.BarcodeFormat.DATA_MATRIX;
NativeZXing.AZTEC = NativeZXing.prototype.AZTEC = com.google.zxing.BarcodeFormat.AZTEC;

module.exports = NativeZXing;
