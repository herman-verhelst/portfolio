import type {Ref} from "vue";

export const usePixelsStore = defineStore('pixels', () => {
    const detail: Ref<number> = ref(0);
    const resolution: Ref<number> = ref(0);

    function setDetail(newDetail: number) {
        detail.value = newDetail;
    }

    function setResolution(newResolution: number) {
        resolution.value = newResolution;
    }

    return {detail, resolution, setDetail, setResolution}
})
