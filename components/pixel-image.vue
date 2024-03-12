<script setup lang="ts">
import {Pixel} from "~/utils/models/pixel";
import '~/assets/styles/components/pixel-image.scss'
import {Shape} from "~/utils/models/shape";
import {useTransitionComposable} from "~/composables/transition-composable";
import {computed} from "vue";
import {usePixelsStore} from "~/stores/pixels";
import {convertHSBToHex} from "~/utils/color-utils";
import {storeToRefs} from "pinia";

const {transitionState} = useTransitionComposable();
const pixelsStore = usePixelsStore();

const props = defineProps({
  isFullPage: {
    type: Boolean,
    default: false,
  },
  numberOfRows: {
    type: Number,
  },
  canvasId: {
    type: String,
  },
  darkBg: {
    type: Boolean,
    default: false
  },
  isPlaying: {
    type: Boolean,
    default: true,
  },
});

let streaming: boolean = true;

watch(
    () => transitionState.transitionComplete,
    (newValue) => {
      const {resolution, detail, pixelColor: statePixelColor, backgroundColor: stateBackgroundColor} = storeToRefs(pixelsStore)

      if (!newValue) return;
      const
          differentColorThreshold = getComputedStyle(document.body).getPropertyValue('--pi-different-color-treshold') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-different-color-treshold') as string) : .05,
          video: HTMLVideoElement = document.getElementById(`video-${props.canvasId}`) as HTMLVideoElement,
          videoCanvas = document.getElementById(`video-canvas-${props.canvasId}`) as HTMLCanvasElement,
          videoContext = videoCanvas.getContext('2d', {willReadFrequently: true}) as CanvasRenderingContext2D,
          bgCanvasContainer = document.getElementById(`bg-canvas-container-${props.canvasId}`) as HTMLDivElement,
          bgCanvas = document.getElementById(`bg-canvas-${props.canvasId}`) as HTMLCanvasElement,
          bgContext = bgCanvas.getContext('2d') as CanvasRenderingContext2D,
          accentColors = getAllAccentColors();


      let
          pixelColor = getComputedStyle(document.body).getPropertyValue('--text-color') as string ?? '#1a1a1a',
          pixelDetail = getComputedStyle(document.body).getPropertyValue('--pi-detail') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-detail') as string) : 3,
          canvasMargin = getComputedStyle(document.body).getPropertyValue('--pi-canvas-margin') ? parseInt(getComputedStyle(document.body).getPropertyValue('--pi-canvas-margin') as string) : 100,
          pixels: Pixel[][] = [],
          previousValues: number[][] = [],
          colorLocations: string[][] = [],
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
          valueUpdated: boolean = false,
          shapes: Shape[] = [],
          cameraAllowed: boolean = false;
      if (props.darkBg) pixelColor = getComputedStyle(document.body).getPropertyValue('--bg-color') as string ?? '#1a1a1a'

      watch(() => detail, (value) => {
        pixelDetail = value.value
      }, {deep: true});

      watch(() => statePixelColor, (value) => {
        pixelColor = value.value;
        bgContext.clearRect(0, 0, bgCanvas.offsetWidth, bgCanvas.offsetHeight);
        setupPreviousValuesAndColors();
      }, {deep: true})

      watch(() => stateBackgroundColor, (value) => {
        bgCanvas.style.background = value.value;
      }, {deep: true})

      watch(() => resolution, (value) => {
        width = Math.round(mapNumRange(Math.pow(parseFloat(`${value.value}`), 2), 8, 92))
        height = bgCanvas.height / (bgCanvas.width / width);

        bgContext.clearRect(0, 0, bgCanvas.offsetWidth, bgCanvas.offsetHeight);
        videoCanvas.setAttribute("width", `${width}`);
        videoCanvas.setAttribute("height", `${height}`);

        calculatePixelWidth();
      }, {deep: true});

      function mapNumRange(number: number, min: number, max: number): number {
        return number * (max - min) + min;
      }

      function addEventListeners(): void {
        if (props.isFullPage) video.addEventListener(
            "canplay",
            () => {
              cameraAllowed = true
            },
            false
        );

        startAnimation();

        window.addEventListener('resize', onWindowResize);
      }

      function startAnimation(): void {
        if (props.numberOfRows) {
          canvasMargin = 0;
          height = props.numberOfRows;
          width = bgCanvas.offsetWidth / (bgCanvas.offsetHeight / height)
        }  else {
          height = bgCanvas.height / (bgCanvas.width / width);
        }


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
        defaultPixelGap = 45 * Math.exp(-0.057 * width) + 1;

        if (props.numberOfRows) {
          defaultPixelGap = 16;
          defaultPixelWidth = (bgCanvas.offsetHeight - (defaultPixelGap * (props.numberOfRows - 1)) - 2 * canvasMargin) / props.numberOfRows;
          numberOfPixelsHeight = height;
          numberOfPixelsWidth = Math.min(width, Math.round((bgCanvas.offsetWidth - 2 * canvasMargin) / (defaultPixelWidth + defaultPixelGap)));
          pixelGapHeight = defaultPixelGap;
          pixelGapWidth = (bgCanvas.offsetWidth - 2 * canvasMargin - numberOfPixelsWidth * defaultPixelWidth) / (numberOfPixelsWidth - 1);
          startPixelY = 0;
          startPixelX = Math.floor((width - numberOfPixelsWidth) / 2);
        } else if (bgCanvas.offsetHeight / bgCanvas.offsetWidth > height / width) {
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
        if (props.isPlaying) id = requestAnimationFrame(timerCallback);
      }

      function drawShapes(): void {
        videoContext.fillStyle = '#FFF';
        videoContext.fillRect(0, 0, bgCanvas.height, bgCanvas.width);

        if (!props.isPlaying) {
          shapes.push(new Shape(videoCanvas.width, videoCanvas.height, true));
          shapes.push(new Shape(videoCanvas.width, videoCanvas.height, true));
        } else if (shapes.length <= 0) {
          shapes.push(new Shape(videoCanvas.width, videoCanvas.height));
        } else if (shapes.length <= 2) {
          const generatedNumber = Math.random();
          if (generatedNumber < .01) {
            shapes.push(new Shape(videoCanvas.width, videoCanvas.height));
          }
        }

        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];
          shape.move();
          videoContext.beginPath();
          videoContext.ellipse(shape.posX, shape.posY, shape.size, shape.size, 0, 0, Math.PI * 2);
          videoContext.fillStyle = '#000'
          videoContext.fill();
          if (shape.isOutsideCanvas(videoCanvas.width, videoCanvas.height)) {
            shapes.splice(i, 1)
          }
        }
      }

      function computeFrame(): void {
        if (!streaming) return;

        if (cameraAllowed) videoContext.drawImage(video, 0, 0, width, height);
        else drawShapes();
        let frame = videoContext.getImageData(0, 0, width, height);

        for (let i = 0; i < height; i++) {
          pixels[i] = [];
          const numberOfPixelsInWidth = Math.floor(width);
          for (let j = 0; j < numberOfPixelsInWidth; j++) {
            const index = (i * numberOfPixelsInWidth + j) * 4;
            pixels[i][j] = new Pixel(frame.data[index], frame.data[index + 1], frame.data[index + 2], frame.data[index + 3]);
          }
        }

        const xCoordinates: number[] = [];
        for (let i = 0; i < numberOfPixelsWidth; i++) {
          xCoordinates.push(i * defaultPixelWidth + i * pixelGapWidth + canvasMargin)
        }

        for (let i = 0; i < numberOfPixelsHeight; i++) {
          const yCoordinate: number = i * defaultPixelWidth + i * pixelGapHeight + canvasMargin;
          for (let j = 0; j < numberOfPixelsWidth; j++) {
            createDisplayedPixel(pixels[i + startPixelY][j + startPixelX], xCoordinates[numberOfPixelsWidth - j - 1], yCoordinate, i, j);
          }
        }

        valueUpdated = false;
      }

      function createDisplayedPixel(pixel: Pixel, x: number, y: number, i: number, j: number): void {
        const index: number = Math.round(pixel.getNormalizedGreyValue() * pixelDetail);

        if (valueUpdated || !previousValues[i] || !previousValues[i][j] || previousValues[i][j] !== index) {
          const pixelWidth: number = defaultPixelWidth / ((index * 2) + 1);
          bgContext.clearRect(x - 1, y - 1, defaultPixelWidth + 2, defaultPixelWidth + 2);
          bgContext.fillStyle = colorLocations[i][j];

          for (let i = 0; i < index + 1; i++) {
            for (let j = 0; j < index + 1; j++) {
              bgContext.beginPath()
              bgContext.roundRect(x + i * pixelWidth * 2, y + j * pixelWidth * 2, pixelWidth, pixelWidth, 2);
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
        videoContext.fillStyle = pixelColor;
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


      setupCanvas();
      setupPreviousValuesAndColors();
      if (props.isFullPage) setupCamera();
      addEventListeners();
      //previousValues = [];


    })

function stopAnimation() {
  streaming = false;
}

</script>

<template>
  <section>
    <video class="pixel-image__video" ref="video" :id="`video-${props.canvasId}`">Video stream not available.</video>
    <canvas class="pixel-image__video-canvas" :id="`video-canvas-${props.canvasId}`"></canvas>

    <div class="bg-canvas__container">
      <div class="pixel-image__container" :id="`bg-canvas-container-${props.canvasId}`">
        <canvas class="bg-canvas" :id="`bg-canvas-${props.canvasId}`"></canvas>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>