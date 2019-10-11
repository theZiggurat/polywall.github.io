import React from 'react';
import ThreeContext from '../../threecontext'
import './index.css';

export default class Three extends React.Component {

    componentDidMount() {
        ThreeContext.registerCanvas('three');
        ThreeContext.updateMaterial();
        ThreeContext.genModel();
        ThreeContext.render();
    }

    render() {
        return <div className="viewer">
                <canvas id="three" className="canvas">
                </canvas>
            </div>
    }
}