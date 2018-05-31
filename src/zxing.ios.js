/**********************************************************************************
 * (c) 2016-2017, Master Technology
 *
 * Licensed under the APACHE license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 0.0.4                                      Nathan@master-technology.com
 *********************************************************************************/
"use strict";

/* global ZXBarcodeFormat, ZXMultiFormatWriter, interop, UIImage, ZXImage, ZXCGImageLuminanceSource, ZXBinaryBitmap, ZXHybridBinarizer, ZXDecodeHints, ZXMultiFormatReader */

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
        if (typeof options.format !== "undefined") {
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

NativeZXing.prototype.decodeBarcode = function(bitmap, options) {
    if (bitmap === null)
    {
        return null;
    }

    var source = ZXCGImageLuminanceSource.alloc().initWithCGImage(bitmap);
    var hybBitmap = ZXBinaryBitmap.binaryBitmapWithBinarizer(ZXHybridBinarizer.binarizerWithSource(source));

    source = null;

    var hints = ZXDecodeHints.hints();

    if (options && options.formats) {
        for (var i=0;i<options.formats.length;i++) {
            hints.addPossibleFormat(options.formats[i]);
        }
    }

    if (options && options.tryHarder) {
        hints.tryHarder = true;
    }

    if (options && options.characterSet) {
        hints.encoding = options.characterSet;
    }


    var error = new interop.Reference();
    var reader = ZXMultiFormatReader.reader();
    try
    {
        var results = {};
        var result = reader.decodeHintsError(hybBitmap, hints, error);
        if (result) {
            hybBitmap = null;

            results.format = this._getBarcodeFormatText(result.barcodeFormat);
            results.barcode = result.text.toString();

            return results;
        } else {
            console.log("Err", error.localizedDescription().toString());
        }
    }
    catch (err)
    {
        // console.log(err);
    }
    return null;

};

NativeZXing.prototype._getBarcodeFormatText = function(id) {
    switch (id) {
        case NativeZXing.QR_CODE: return 'QR_CODE';
        case NativeZXing.EAN_8: return 'EAN_8';
        case NativeZXing.UPC_E: return 'UPC_E';
        case NativeZXing.EAN_13: return 'EAN_13';
        case NativeZXing.UPC_A: return 'UPC_A';
        case NativeZXing.CODE_39: return 'CODE_39';
        case NativeZXing.CODE_93: return 'CODE_93';
        case NativeZXing.CODE_128: return 'CODE_128';
        case NativeZXing.ITF: return 'ITF';
        case NativeZXing.PDF_417: return 'PDF_417';
        case NativeZXing.CODABAR: return 'CODABAR';
        case NativeZXing.DATA_MATRIX: return 'DATA_MATRIX';
        case NativeZXing.AZTEC: return 'AZTEC';
        default: return 'UNKNOWN';
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
