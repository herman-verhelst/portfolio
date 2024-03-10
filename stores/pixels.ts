import type {Ref} from "vue";

const detail: Ref<number> = ref(0);
const resolution: Ref<number> = ref(0);

const pixelColor: Ref<string> = ref('#ffffff')
const backgroundColor: Ref<string> = ref('#ffffff')

export const usePixelsStore = defineStore('pixels', () => {
    function setDetail(newDetail: number) {
        detail.value = newDetail;
    }

    function setResolution(newResolution: number) {
        resolution.value = newResolution;
    }

    function setPixelColor(newColor: { h: number, s: number, b: number }) {
        pixelColor.value = convertHSBToHex(newColor.h, newColor.s, newColor.b) ?? '#1a1a1a'
    }

    function setBackgroundColor(newColor: { h: number, s: number, b: number }) {
        backgroundColor.value = convertHSBToHex(newColor.h, newColor.s, newColor.b) ?? '#1a1a1a'
    }

    return {
        detail,
        resolution,
        pixelColor,
        backgroundColor,
        setDetail,
        setResolution,
        setPixelColor
    }
})
