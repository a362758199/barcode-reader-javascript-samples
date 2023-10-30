/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

Dynamsoft.License.LicenseManager.initLicense(
  "DLS2eyJoYW5kc2hha2VDb2RlIjoiNjY2Ni03Nzc3IiwibWFpblNlcnZlclVSTCI6Imh0dHBzOi8vMTkyLjE2OC44LjEyMi9kbHMvIiwib3JnYW5pemF0aW9uSUQiOiI2NjY2IiwiY2hlY2tDb2RlIjoxNTEyMTgzMzg3fQ=="
);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.0.20&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

Dynamsoft.DCE.CameraView.engineResourcePath =
  "./node_modules/@dynamsoft/dynamsoft-camera-enhancer/dist/";
Dynamsoft.DBR.BarcodeReaderModule.engineResourcePath =
  "./node_modules/@dynamsoft/dynamsoft-barcode-reader/dist/";
Dynamsoft.CVR.CaptureVisionRouter.engineResourcePath =
  "./node_modules/@dynamsoft/dynamsoft-capture-vision-router/dist/";
(async function () {
  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
    const cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(
      cameraView
    );
    document
      .querySelector("#div-ui-container")
      .append(cameraView.getUIElement()); // Get default UI and append it to DOM.

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    const router = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    router.setInput(cameraEnhancer);

    // Define a callback for results.
    const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
    resultReceiver.onDecodedBarcodesReceived = (result) => {
      for (let item of result.barcodesResultItems) {
        console.log(item.text);
        alert(item.text);
      }
    };
    router.addResultReceiver(resultReceiver);

    // Filter out unchecked and duplicate results.
    const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
    filter.enableResultCrossVerification(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
      true
    ); // Filter out unchecked barcodes.
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
      true
    );
    filter.setDuplicateForgetTime(
      Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
      3000
    );
    await router.addResultFilter(filter);

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    await router.startCapturing("ReadSingleBarcode");
  } catch (ex) {
    let errMsg;
    if (ex.message.includes("network connection error")) {
      errMsg =
        "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
    } else {
      errMsg = ex.message || ex;
    }
    console.error(errMsg);
    alert(errMsg);
  }
})();