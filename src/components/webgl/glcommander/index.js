class GlCommander {
    constructor(){
        this.clearColor = [1.0, 0.0, 0.0, 1.0];
    }

    init(gl) {
        this.gl = gl;
    }

    clear = () => {
        this.gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}

export const GLC = new GlCommander();
export default GLC;