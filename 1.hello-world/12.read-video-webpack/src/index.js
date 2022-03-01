import DBR from "dynamsoft-javascript-barcode";

/** LICENSE ALERT - README
 * 
 * The library requires a license to work.
 * If the license is not specified, a free public trial license will be used by default which is the case in this sample.
 * Note that network connection is required for the public license to work.
 * For more info, please check https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=8.8.7&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 */

/* When using your own license, uncomment the following line and specify your license. */

// DBR.BarcodeReader.license = "YOUR-ORGANIZATION-ID or YOUR-HANDSHAKECODE or AN-OFFLINE-LICENSE or ANY-OTHER-TYPE-OF-SUPPORTED-LICENSE-STRING";

/** LICENSE ALERT - THE END */

DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.7/dist/";

let pScanner = null;
if (document.getElementById('readBarcode')) {
    document.getElementById('readBarcode').onclick = async function() {
        try {
            pScanner = pScanner || await DBR.BarcodeScanner.createInstance();
            pScanner.onFrameRead = results => {
                console.log("Barcodes on one frame:");
                for (let result of results) {
                    console.log(result.barcodeFormatString + ": " + result.barcodeText);
                }
            };
            pScanner.onUnduplicatedRead = (txt, result) => {
                alert(txt);
                console.log("Unique Code Found: " + result);
            }
            await pScanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    };
}