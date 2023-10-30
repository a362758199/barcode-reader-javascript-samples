# Hello World Sample for React with Hooks

[React](https://reactjs.org/) is a JavaScript library meant explicitly for creating interactive UIs. Follow this guide to learn how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into a React application. Note that in this sample we will use `TypeScript` and [Hooks](https://reactjs.org/docs/hooks-intro.html). Also, there is another sample `react` defining components as classes in React.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/react-hooks/build/">Hello World in React with Hooks - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/react-hooks">Hello World in React with Hooks - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `react 18.2.0` used in the example below.

## Create the sample project

### Create a Bootstrapped Raw React Application with TypeScript

```cmd
npx create-react-app my-app --template typescript
```

### **CD** to the root directory of the application and install necessary libraries

```cmd
cd my-app
npm install dynamsoft-utility
npm install dynamsoft-capture-vision-router
npm install dynamsoft-camera-enhancer
```

## Start to implement

### Add files "dbr.ts", "cvr.ts" and "dce.ts" under "/src/" to configure libraries

```typescript
// dbr.ts
import { BarcodeReaderModule } from "@dynamsoft/dynamsoft-barcode-reader";
BarcodeReaderModule.engineResourcePath = "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-barcode-reader@10.0.20-dev-20231020180049/dist/";
```

```typescript
// cvr.ts
import { CaptureVisionRouter, LicenseManager } from '@dynamsoft/dynamsoft-capture-vision-router';
CaptureVisionRouter.engineResourcePath = 'https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-capture-vision-router@2.0.20-dev-20231027145739/dist/';
LicenseManager.initLicense('DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9');
// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CaptureVisionRouter.preloadModule(['DBR']).catch((ex) => {
  let errMsg;
  if (ex?.message.includes('network connection error')) {
    errMsg =
      'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
  } else {
    errMsg = ex.message || ex;
  }
  console.error(errMsg);
  alert(errMsg);
});
```

```typescript
// dce.ts
import { CameraView } from "@dynamsoft/dynamsoft-camera-enhancer";
CameraView.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.0/dist/";
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePath` tells the library where to get the necessary resources at runtime.

### Build directory structure

* Create a directory "components" under "/src/", and then create another three directories "HelloWorld", "VideoCapture" and "ImageCapture" under "/src/components/".

### Create and edit the `VideoCapture` component

* Create `VideoCapture.tsx` and `VideoCapture.css` under "/src/components/VideoCapture/". The `VideoCapture` component helps decode barcodes via camera.

* In `VideoCapture.tsx`, add code for initializing and destroying some instances.

```tsx
import React, { useEffect, useRef } from "react";
import { EnumCapturedResultItemType } from "@dynamsoft/dynamsoft-core";
import { DecodedBarcodesResult } from "@dynamsoft/dynamsoft-barcode-reader";
import {
  CameraEnhancer,
  CameraView,
} from "@dynamsoft/dynamsoft-camera-enhancer";
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from "@dynamsoft/dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "@dynamsoft/dynamsoft-utility";
import "./VideoCapture.css";

function VideoCapture() {
  const pInit = useRef(
    null as Promise<{
      cameraView: CameraView;
      cameraEnhancer: CameraEnhancer;
      router: CaptureVisionRouter;
    }> | null
  );
  const pDestroy = useRef(null as Promise<void> | null);

  const init = async (): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    router: CaptureVisionRouter;
  }> => {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      elRef.current!.innerText = "";
      elRef.current!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const router = await CaptureVisionRouter.createInstance();
      router.setInput(cameraEnhancer);

      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (
        result: DecodedBarcodesResult
      ) => {
        for (let item of result.barcodesResultItems) {
          console.log(item.text);
        }
      };
      router.addResultReceiver(resultReceiver);

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification(
        EnumCapturedResultItemType.CRIT_BARCODE,
        true
      ); // Filter out unchecked barcodes.
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication(
        EnumCapturedResultItemType.CRIT_BARCODE,
        true
      );
      filter.setDuplicateForgetTime(
        EnumCapturedResultItemType.CRIT_BARCODE,
        3000
      );
      await router.addResultFilter(filter);

      // Open camera and start scanning single barcode.
      await cameraEnhancer.open();
      await router.startCapturing("ReadSingleBarcode");
      return {
        cameraView,
        cameraEnhancer,
        router,
      };
    } catch (ex: any) {
      let errMsg;
      if (ex?.message.includes("network connection error")) {
        errMsg =
          "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message || ex;
      }
      console.error(errMsg);
      alert(errMsg);
      throw ex;
    }
  };

  const destroy = async (): Promise<void> => {
    if (pInit.current) {
      const { cameraView, cameraEnhancer, router } = await pInit.current;
      router.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
  };
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (pDestroy.current) {
        await pDestroy.current;
        pInit.current = init();
      } else {
        pInit.current = init();
      }
    })();

    return () => {
      (async () => {
        await (pDestroy.current = destroy());
        console.log("VideoCapture Component Unmount");
      })();
    };
  }, []);

  return <div ref={elRef} className="div-ui-container"></div>;
}

export default VideoCapture;
```

> Note:
>
> * The component should never update (check the code for `shouldComponentUpdate()`) so that events bound to the UI stay valid.

* Define the style of the element in `VideoCapture.css`

```css
.div-ui-container {
  width: 100%;
  height: 70vh;
}
```

### Create and edit the `ImageCapture` component

* Create `ImageCapture.tsx` and `ImageCapture.css` under "/src/components/ImageCapture/". The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.tsx`, add code for initializing and destroying the `CaptureVisionRouter` instance.

```tsx
import React, { useRef, useEffect } from "react";
import { BarcodeResultItem } from "@dynamsoft/dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "@dynamsoft/dynamsoft-capture-vision-router";
import "./ImageCapture.css";

function ImageCapture() {
  const pInit = useRef(null as null | Promise<CaptureVisionRouter>);
  const pDestroy = useRef(null as null | Promise<void>);

  const init = async (): Promise<CaptureVisionRouter> => {
    const router = await CaptureVisionRouter.createInstance();
    return router;
  };

  const destroy = async (): Promise<void> => {
    if (pInit.current) {
      const router = (await pInit.current)!;
      router.dispose();
    }
  };

  const decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const router = (await pInit.current)!;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await router.capture(
        e.target.files![0],
        "ReadBarcodes_SpeedFirst"
      );
      let texts = "";
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + "\n";
      }
      if (texts !== "") alert(texts);
      if (!result.items.length) alert("No barcode found");
    } catch (ex: any) {
      if (ex.message.indexOf("network connection error")) {
        let customMsg =
          "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
        console.log(customMsg);
        alert(customMsg);
      }
      throw ex;
    }
    e.target.value = "";
  };

  useEffect(() => {
    (async () => {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (pDestroy) {
        await pDestroy;
        pInit.current = init();
      } else {
        pInit.current = init();
      }
    })();

    return () => {
      (async () => {
        await (pDestroy.current = destroy());
        console.log("ImageCapture Component Unmount");
      })();
    };
  }, []);

  return (
    <div className="div-image-capture">
      <input
        type="file"
        accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
        onChange={decodeImg}
      />
    </div>
  );
}

export default ImageCapture;
```

* Define the style of the element in `ImageCapture.css`

```css
.div-image-capture {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid black;
}
```

### Create and edit the `HelloWorld` component

* Create `HelloWorld.tsx` and `HelloWorld.css` under "/src/components/HelloWorld/". The `HelloWorld` component offers buttons to switch components between `VideoCapture` and `ImageCapture`;

* Add following code to `HelloWorld.tsx`.

```tsx
import React, { useState } from "react";
import "../../dbr"; // import side effects. The license, engineResourcePath, so on.
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import "../../dce"; // import side effects. The license, engineResourcePath, so on.
import VideoCapture from "../VideoCapture/VideoCapture";
import ImageCapture from "../ImageCapture/ImageCapture";
import "./HelloWorld.css";

function HelloWorld() {
  let [bShowVideoCapture, setBShowVideoCapture] = useState(true);
  let [bShowImageCapture, setBShowImageCapture] = useState(false);

  const showVideoCapture = () => {
    setBShowVideoCapture(true);
    setBShowImageCapture(false);
  };

  const showImageCapture = () => {
    setBShowVideoCapture(false);
    setBShowImageCapture(true);
  };

  return (
    <div className="div-hello-world">
      <h1>Hello World for React(Hooks)</h1>
      <div>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: bShowVideoCapture ? "rgb(255,174,55)" : "white",
          }}
          onClick={showVideoCapture}
        >
          Decode Video
        </button>
        <button
          style={{
            backgroundColor: bShowImageCapture ? "rgb(255,174,55)" : "white",
          }}
          onClick={showImageCapture}
        >
          Decode Image
        </button>
      </div>
      <div className="container">
        {bShowVideoCapture ? <VideoCapture></VideoCapture> : ""}
        {bShowImageCapture ? <ImageCapture></ImageCapture> : ""}
      </div>
    </div>
  );
}

export default HelloWorld;
```

* Define the style of the element in `HelloWorld.css`

```css
.div-hello-world {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #455A64;
}

h1 {
    font-size: 1.5em;
}

button {
    font-size: 1.5rem;
    margin: 1.5vh 0;
    border: 1px solid black;
    background-color: white;
    color: black;
}

.container {
    margin: 2vmin auto;
    text-align: center;
    font-size: medium;
    width: 80vw;
}
```

### Add the `HelloWorld` component to `App.tsx`

Edit the file `App.tsx` to be like this

```jsx
import HelloWorld from './components/HelloWorld/HelloWorld';
import './App.css';

function App() {
  return (
    <div className="App">
      <HelloWorld></HelloWorld>
    </div>
  );
}

export default App;
```

* Try running the project.

```cmd
npm start
```

If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Image Decode` button and select the image you want to decode. Once barcodes are found, the results will show in a dialog. 

## Development server

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Build

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).