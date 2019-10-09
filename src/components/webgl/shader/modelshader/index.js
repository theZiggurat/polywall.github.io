import GLC from '../../glcommander';
import VertexSource from './vertex';
import FragmentSource from './fragment';
import Locations from './locations';

export default class ModelShader {
    constructor() {
        const vs = GLC.createVertexShader();
        GLC.addShaderSource(vs, VertexSource);
        GLC.compileShader(vs);

        const fs = GLC.createFragmentShader();
        GLC.addShaderSource(fs, FragmentSource);
        GLC.compileShader(fs);

        const program = GLC.createShaderProgram();
        GLC.attachShaderProgram(program, vs);
        GLC.attachShaderProgram(program, fs);
        GLC.linkProgram(program);

        this.positionAttribute = GLC.getAttribLocation(program, Locations.POSITION);
        this.program = program;

    }

    use = () => {
        GLC.useProgram(this.program);
    }

    enablePosition = () => {
        GLC.enableVertexAttribArray(this.positionAttribute);
        GLC.pointToAttribute(this.positionAttribute, 3);
    }
}