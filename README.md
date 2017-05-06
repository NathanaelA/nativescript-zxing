[![npm](https://img.shields.io/npm/v/nativescript-zxing.svg)](https://www.npmjs.com/package/nativescript-zxing)
[![npm](https://img.shields.io/npm/l/nativescript-zxing.svg)](https://www.npmjs.com/package/nativescript-zxing)
[![npm](https://img.shields.io/npm/dt/nativescript-zxing.svg?label=npm%20d%2fls)](https://www.npmjs.com/package/nativescript-zxing)

# NativeScript ZXing

This is a NativeScript cross platform ZXing library for IOS and Android.

## License

My code is (c)2016, Master Technology.  Everything is LICENSED under the APACHE 2.0 License, including libraries, meaning you are free to include this in any type of program -- However for entities that need a support contract, changes, enhancements and/or a commercial license please contact me at [http://nativescript.tools](http://nativescript.tools).

I also do contract work; so if you have a module you want built or sponsored for NativeScript (or any other software projects) feel free to contact me [nathan@master-technology.com](mailto://nathan@master-technology.com).

[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg?style=plastic)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=HN8DDMWVGBNQL&lc=US&item_name=Nathanael%20Anderson&item_number=nativescript%2dzxing&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3ax%3aNonHosted)
[![Patreon](https://img.shields.io/badge/Pledge-Patreon-brightgreen.svg?style=plastic)](https://www.patreon.com/NathanaelA)

## Installation 

Run `tns plugin add nativescript-zxing` in your ROOT directory of your project.


## Usage

### Creating a Barcode
```js
var ZXing = require('nativescript-zxing');

var zx = new ZXing();
var img = zx.createBarcode({encode: "Text", height: 100, width: 100, format: ZXing.QR_CODE});

// Do something with the image
```
This creates a barcode image of 100x100 with the "Text" encoded into the QR Code barcode type.
On iOS this will return a UImage which can be assigned to a NativeScript Image; on Android it will return a Bitmap which also can be assigned to a Image. (See Demo)


### Decoding a Barcode
```js
var ZXing = require('nativescript-zxing');
var zx = new ZXing();

// Options are TOTALLY optional
var options = {tryHarder: true, formats: [ZXing.QR_CODE, ZXing.ITF]};

var results = zx.decodeBarcode(source, options);
if (!results) {
    console.log("Unable to decode barcode");
} else {
    console.log("Barcode format", results.format);
    console.log("Barcode value", results.barcode);
}

```
Please note:
* The Options are totally optional, if you don't pass in any options it will attempt to decode all known barcode formats.
If you do pass in the valid formats; the iOS side actually will ONLY use the formats specified; the Android side will still do some auto-detection.
* The tryHarder option will cause the decoding to use a more CPU intensive routine; which **might** find more barcodes.
* The formats; is just a simple array of any of the supported barcode types listed below.

The source image for Android must be a bitmap; the source image for iOS must be a CGImage. (See Demo)
 
 
## Demo
 
 Please see the demo source [https://github.com/NathanaelA/nativescript-zxing/tree/master/demo](https://github.com/NathanaelA/nativescript-zxing/tree/master/demo) for how to read, write and convert between image formats.
 In addition when you SAVE on Android it might take a few minutes before the media indexer will actually see the new image to put it in the image picker.
   

## Supported Barcode Types

ZXing supports the following Barcode types:
* QR_CODE
* UPC_A
* UPC_E
* AZTEC
* CODABAR
* CODE_39
* CODE_93
* CODE_128
* DATA_MATRIX
* EAN_8
* EAN_13
* ITF
* MAXICODE
* PDF_417


