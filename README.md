# NativeScript ZXing

This is a NativeScript cross platform ZXing library for IOS and Android.

## License

My code is (c)2016, Master Technology.  Everything is LICENSED under the APACHE 2.0 License, including libraries.

I do contract work; so if you have a module you want built for NativeScript (or pretty much any other language) feel free to contact me (nathan@master-technology.com).

## Installation 

Run `tns plugin add nativescript-zxing` in your ROOT directory of your project.

## Limitations
* This plugin currently only supports creating a barcode.

## Usage

```js
var ZXing = require('nativescript-zxing');

var zx = new ZXing();
var img = zx.createBarcode({encode: "Text", height: 100, width: 100, format: ZXing.QR_CODE});

// Do something with the image
```
This creates a barcode image of 100x100 with the "Text" encoded into the QR Code barcode type.
On iOS this will return a UImage which can be assigned to a NativeScript Image; on Android it will return a Bitmap which also can be assigned to a Image.

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

## Authors
* Nathanael Anderson

## Help

This would be cool if this could become a full featured plugin, I will accept pull requests that improve this and assign credit.  All code needs to be Apache 2.0 licensed.
