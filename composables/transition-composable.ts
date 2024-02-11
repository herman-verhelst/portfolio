const transitionState = reactive({
    transitionComplete: false,
    firstTransitionComplete: false,
    startSecondTransition: true,
})

export const useTransitionComposable = () => {
    const toggleTransitionComplete = (value: boolean) => {
        transitionState.transitionComplete = value;
    }

    const toggleFirstTransitionComplete = (value: boolean) => {
        transitionState.firstTransitionComplete = value;
    }

    const toggleStartSecondTransition = (value: boolean) => {
        transitionState.startSecondTransition = value;
    }

    return {
        transitionState,
        toggleTransitionComplete,
        toggleFirstTransitionComplete,
        toggleStartSecondTransition
    }
}