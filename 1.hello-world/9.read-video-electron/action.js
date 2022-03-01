window.onload = function () {
    /** LICENSE ALERT - README
     * 
     * The library requires a license to work.
     * If the license is not specified, a free public trial license will be used by default which is the case in this sample.
     * Note that network connection is required for the public license to work.
     * For more info, please check https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=8.8.7&utm_source=github#specify-the-license or contact support@dynamsoft.com.
     */

    /* When using your own license, uncomment the following line and specify your license. */

    // Dynamsoft.DBR.BarcodeReader.license = "YOUR-ORGANIZATION-ID or YOUR-HANDSHAKECODE or AN-OFFLINE-LICENSE or ANY-OTHER-TYPE-OF-SUPPORTED-LICENSE-STRING";

    /** LICENSE ALERT - THE END */

    Dynamsoft.DBR.BarcodeReader.loadWasm();
    let pScanner = null;
    document.getElementById('readBarcode').onclick = async () => {
        try {
            pScanner = pScanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();
            pScanner.onFrameRead = results => {
                if (results.length) {
                    console.log(results);
                }
            };
            pScanner.onUnduplicatedRead = (txt, result) => {
                alert(txt, result);
            };
            document.getElementById("barcodeScannerUI").appendChild(pScanner.getUIElement());
            await pScanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    };
}