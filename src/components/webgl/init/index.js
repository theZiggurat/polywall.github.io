import GLC from '../glcommander';

const render = () => {
    GLC.clear();
    window.requestAnimationFrame(render);
}

export default (id) => {
    const canvas = document.querySelector(`#${id}`);

    if(!canvas) {
        return;
    }

    const gl = canvas.getContext('webgl');
    if(!gl) {
        return;
    }

    GLC.init(gl);
    window.requestAnimationFrame(render);
}