import GLC from '../glcommander';
import ModelRenderer from '../render/modelrenderer';
import ModelType from '../model/modeltype';


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

    const vertices = [
        0.0, 0.5, 0.0,
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0
    ];

    const indices = [0, 1, 2];
    
    GLC.clear();
    const modelRenderer = new ModelRenderer();
    modelRenderer.registerNewModel(new ModelType(vertices, indices), 'tri');
    modelRenderer.addInstance('instance1', 'tri');
    modelRenderer.render();
}