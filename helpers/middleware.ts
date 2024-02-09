const middleware = (to: any, from: any) => {
    const sliders = document?.getElementsByClassName('pt-slider')
    if (!sliders) return;

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].className = 'pt-slider';
        if (to.query.id) {
            sliders[i].classList.add(`pt-slider--bg-${to.query.id}`)
        }
    }
}

export default middleware;