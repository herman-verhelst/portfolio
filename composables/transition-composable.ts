const transitionState = reactive({
    transitionComplete: false,
    firstTransitionComplete: false,
})

export const useTransitionComposable = () => {
    const toggleTransitionComplete = (value: boolean) => {
        transitionState.transitionComplete = value;
    }

    const toggleFirstTransitionComplete = (value: boolean) => {
        transitionState.firstTransitionComplete = value;
    }

    return {
        transitionState,
        toggleTransitionComplete,
        toggleFirstTransitionComplete
    }
}