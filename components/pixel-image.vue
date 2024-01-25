<script setup lang="ts">
import {Pixel} from "~/utils/models/pixel";
import '~/assets/styles/components/pixel-image.scss'

const props = defineProps({
  isFullPage: {
    type: Boolean,
    default: false,
  }
})

onMounted(() => {

  const pixelColor = getComputedStyle(document.body).getPropertyValue('--pi-pixel-color') as string ?? '#1a1a1a',
      canvasMargin = getComputedStyle(document.body).getPropertyValue('--pi-canvas-margin') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-canvas-margin') as string) : 100,
      detail = getComputedStyle(document.body).getPropertyValue('--pi-detail') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-detail') as string) : 3,
      differentColorThreshold = getComputedStyle(document.body).getPropertyValue('--pi-default-pixel-gap') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-different-color-treshold') as string) : .05,
      video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement,
      videoCanvas = document.getElementById('video-canvas') as HTMLCanvasElement,
      videoContext = videoCanvas.getContext('2d', {willReadFrequently: true}) as CanvasRenderingContext2D,
      bgCanvasContainer = document.getElementById('bg-canvas-container') as HTMLDivElement,
      bgCanvas = document.getElementById('bg-canvas') as HTMLCanvasElement,
      bgContext = bgCanvas.getContext('2d') as CanvasRenderingContext2D,
      accentColors = getAllAccentColors();

  let pixels: Pixel[][] = [],
      previousValues: number[][] = [],
      colorLocations: string[][] = [],
      streaming: boolean = true,
      startPixelX: number = 0,
      startPixelY: number = 0,
      width: number = getComputedStyle(document.body).getPropertyValue('--pi-width') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-width') as string) : 32,
      height: number,
      defaultPixelGap = getComputedStyle(document.body).getPropertyValue('--pi-default-pixel-gap') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-default-pixel-gap') as string) : 10,
      pixelGapHeight = defaultPixelGap,
      pixelGapWidth = defaultPixelGap,
      defaultPixelWidth: number,
      numberOfPixelsHeight: number = 0,
      numberOfPixelsWidth: number = 0,
      id: number,
      valueUpdated: boolean = false;

  function addEventListeners(): void {
    video.addEventListener(
        "canplay",
        onVideoReady,
        false
    );

    window.addEventListener('resize', onWindowResize);
  }

  function onVideoReady(): void {
    console.log('video ready')
    height = video.videoHeight / (video.videoWidth / width);

    videoCanvas.setAttribute("width", `${width}`);
    videoCanvas.setAttribute("height", `${height}`);

    calculatePixelWidth()

    timerCallback();
  }

  function onWindowResize() {
    setupCanvas();
    calculatePixelWidth();
  }

  function calculatePixelWidth() {
    if (props.isFullPage) defaultPixelGap = 45 * Math.exp(-0.057 * width) + 1;

    if (bgCanvas.offsetHeight / bgCanvas.offsetWidth > height / width) {
      defaultPixelWidth = (bgCanvas.offsetHeight - (defaultPixelGap * (height - 1)) - 2 * canvasMargin) / height;
      numberOfPixelsHeight = height;
      numberOfPixelsWidth = Math.min(width, Math.round((bgCanvas.offsetWidth - 2 * canvasMargin) / (defaultPixelWidth + defaultPixelGap)));
      pixelGapHeight = defaultPixelGap;
      pixelGapWidth = (bgCanvas.offsetWidth - 2 * canvasMargin - numberOfPixelsWidth * defaultPixelWidth) / (numberOfPixelsWidth - 1);
      startPixelY = 0;
      startPixelX = Math.floor((width - numberOfPixelsWidth) / 2);
    } else {
      defaultPixelWidth = (bgCanvas.offsetWidth - (defaultPixelGap * (width - 1)) - 2 * canvasMargin) / width;
      numberOfPixelsWidth = width;
      numberOfPixelsHeight = Math.min(height, Math.round((bgCanvas.offsetHeight - 2 * canvasMargin) / (defaultPixelWidth + defaultPixelGap)));
      pixelGapWidth = defaultPixelGap;
      pixelGapHeight = (bgCanvas.offsetHeight - 2 * canvasMargin - numberOfPixelsHeight * defaultPixelWidth) / (numberOfPixelsHeight - 1);
      startPixelX = 0;
      startPixelY = Math.floor((height - numberOfPixelsHeight) / 2);
    }

    setupPreviousValuesAndColors();
  }

  function setupPreviousValuesAndColors(): void {
    previousValues = [];
    colorLocations = [];

    for (let i = 0; i < numberOfPixelsHeight; i++) {
      previousValues.push([]);
      colorLocations.push([]);
      for (let j = 0; j < numberOfPixelsWidth; j++) {
        previousValues[i].push(NaN);

        if (!props.isFullPage) {
          const random = Math.random() * 100;
          if (random < differentColorThreshold) {
            const randomColor = accentColors[Math.floor(Math.random() * accentColors.length)][1];
            colorLocations[i].push(randomColor);
          } else {
            colorLocations[i].push(pixelColor);
          }
        } else {
          colorLocations[i].push(pixelColor);
        }
      }
    }
  }

  function timerCallback(): void {
    if (!streaming) {
      return;
    }

    computeFrame();
    id = requestAnimationFrame(timerCallback);
  }

  function computeFrame(): void {
    if (!streaming) return;

    videoContext.drawImage(video, 0, 0, width, height);
    let frame = videoContext.getImageData(0, 0, width, height);

    for (let i = 0; i < height; i++) {
      pixels[i] = [];
      for (let j = 0; j < width; j++) {
        const index = (i * width + j) * 4;
        pixels[i][j] = new Pixel(frame.data[index], frame.data[index + 1], frame.data[index + 2], frame.data[index + 3]);
      }
    }

    const XCoordinates: number[] = [];
    for (let i = 0; i < numberOfPixelsWidth; i++) {
      XCoordinates.push(i * defaultPixelWidth + i * pixelGapWidth + canvasMargin)
    }

    for (let i = 0; i < numberOfPixelsHeight; i++) {
      const yCoordinate: number = i * defaultPixelWidth + i * pixelGapHeight + canvasMargin;
      for (let j = 0; j < numberOfPixelsWidth; j++) {
        createDisplayedPixel(pixels[i + startPixelY][j + startPixelX], XCoordinates[numberOfPixelsWidth - j - 1], yCoordinate, i, j);
      }
    }

    valueUpdated = false;
  }

  function createDisplayedPixel(pixel: Pixel, x: number, y: number, i: number, j: number): void {
    const index: number = Math.round(pixel.getNormalizedGreyValue() * detail);

    if (valueUpdated || !previousValues[i] || !previousValues[i][j] || previousValues[i][j] !== index) {
      const pixelWidth: number = defaultPixelWidth / ((index * 2) + 1);
      bgContext.clearRect(x - 1, y - 1, defaultPixelWidth + 2, defaultPixelWidth + 2);
      bgContext.fillStyle = colorLocations[i][j];

      for (let i = 0; i < index + 1; i++) {
        for (let j = 0; j < index + 1; j++) {
          bgContext.beginPath()
          bgContext.rect(x + i * pixelWidth * 2, y + j * pixelWidth * 2, pixelWidth, pixelWidth);
          bgContext.fill();
        }
      }
    }

    previousValues[i][j] = index;
  }

  function setupCanvas() {
    bgCanvas.width = bgCanvasContainer.getBoundingClientRect().width;
    bgCanvas.height = bgCanvasContainer.getBoundingClientRect().height;

    const bgCanvasWidth = bgCanvas.width, bgCanvasHeight = bgCanvas.height;

    bgCanvas.setAttribute('width', `${bgCanvasWidth * window.devicePixelRatio}`);
    bgCanvas.setAttribute('height', `${bgCanvasHeight * window.devicePixelRatio}`);
    bgCanvas.setAttribute('style', `width: ${bgCanvasWidth}px; height: ${bgCanvasHeight}px;`);
    bgContext.scale(window.devicePixelRatio, window.devicePixelRatio);

    bgContext.fillStyle = pixelColor;
  }

  function setupCamera(): void {

    navigator.mediaDevices
        .getUserMedia({video: {width: {max: 16}, height: {max: 12}}, audio: false})
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error(`An error occurred: ${err}`);
        });
  }

  function isSameDomain(styleSheet: StyleSheet): boolean {
    if (!styleSheet.href) {
      return true;
    }

    return styleSheet.href.indexOf(window.location.origin) === 0;
  }

  function isStyleRule(rule: CSSRule): boolean {
    return rule.constructor.name === 'CSSStyleRule';
  }

  function getAllAccentColors(): [string, string][] {
    return [...document.styleSheets]
        .filter(isSameDomain)
        .reduce(
            (finalArr, sheet) =>
                finalArr.concat(
                    // cssRules is array-like, so we convert it to an array
                    [...sheet.cssRules]
                        .filter(isStyleRule)
                        .reduce((propValArr, rule) => {
                          const props: [string, string][] = [...rule.style]
                              .map((propName) => [
                                propName.trim(),
                                (rule.style as any).getPropertyValue(propName).trim()
                              ])
                              .filter(([propName]) => propName.indexOf("--logo") === 0);

                          return [...propValArr, ...props];
                        }, [] as [string, string][])
                ),
            [] as [string, string][]
        );
  }


  setupCamera();
  addEventListeners();
  setupCanvas();
  setupPreviousValuesAndColors();
  previousValues = [];
})

</script>

<template>
  <video ref="video" id="video">Video stream not available.</video>
  <canvas id="video-canvas"></canvas>

  <div class="bg-canvas__container">
    <div id="bg-canvas-container">
      <canvas class="bg-canvas" id="bg-canvas"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>