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

/* global ZXBarcodeFormat, ZXMultiFormatWriter, interop, UIImage, ZXImage */

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
    var error = new interop.Reference();
    var writer = ZXMultiFormatWriter.writer();
    var result = writer.encodeFormatWidthHeightError(encode, format, width, height, error);
    
    if (result) {
        return UIImage.alloc().initWithCGImage(ZXImage.imageWithMatrix(result).cgimage);
    } else {
        return error.localizedDescription().toString();
    }
};

// Create Mapping to make this simpler to choose a barcode type.
NativeZXing.QR_CODE = NativeZXing.prototype.QR_CODE = ZXBarcodeFormat.kBarcodeFormatQRCode;
NativeZXing.EAN_8 = NativeZXing.prototype.EAN_8 = ZXBarcodeFormat.kBarcodeFormatEan8;
NativeZXing.UPC_E = NativeZXing.prototype.UPC_E = ZXBarcodeFormat.kBarcodeFormatUPCE;
NativeZXing.EAN_13 = NativeZXing.prototype.EAN_13 = ZXBarcodeFormat.kBarcodeFormatEan13;
NativeZXing.UPC_A = NativeZXing.prototype.UPC_A = ZXBarcodeFormat.kBarcodeFormatUPCA;
NativeZXing.CODE_39 = NativeZXing.prototype.CODE_39 = ZXBarcodeFormat.kBarcodeFormatCode39;
NativeZXing.CODE_93 = NativeZXing.prototype.CODE_93 = ZXBarcodeFormat.kBarcodeFormatCode93;
NativeZXing.CODE_128 = NativeZXing.prototype.CODE_128 = ZXBarcodeFormat.kBarcodeFormatCode128;
NativeZXing.ITF = NativeZXing.prototype.ITF = ZXBarcodeFormat.kBarcodeFormatITF;
NativeZXing.PDF_417 = NativeZXing.prototype.PDF_417 = ZXBarcodeFormat.kBarcodeFormatPDF417;
NativeZXing.CODABAR = NativeZXing.prototype.CODABAR = ZXBarcodeFormat.kBarcodeFormatCodabar;
NativeZXing.DATA_MATRIX = NativeZXing.prototype.DATA_MATRIX = ZXBarcodeFormat.kBarcodeFormatDataMatrix;
NativeZXing.AZTEC = NativeZXing.prototype.AZTEC = ZXBarcodeFormat.kBarcodeFormatAztec;


module.exports = NativeZXing;
