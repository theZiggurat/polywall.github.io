import React from 'react';
import ThreeContext from './threecontext'
import './index.css';
import ColorPicker from '../colorPicker';

export default class Three extends React.Component {

    state = {
        color: '#FFFFFF',
        ambientColor: '#FFFFFF'
    }

    componentDidMount() {
        this.three = new ThreeContext('three');
        var button = document.getElementById('download');
        button.addEventListener('click', function (e) {
            var dataURL = document.getElementById('three').toDataURL();
            button.href = dataURL;
        });

        this.three.sceneSettings.ambientColor = this.state.ambientColor;
        this.three.sceneSettings.dirColor = this.state.color;
        this.three.genLights();
        this.three.updateMaterial();
        this.three.genModel(this.state.color);
        
        this.three.render();
    }

    handleChangeComplete = (c) => {
        this.three.sceneSettings.dirColor = c.hex;
        this.three.sceneSettings.dirIntensity = c.rgb.a*3;
        this.three.genLights();
    }

    handleOtherChangeComplete = (c) => {
        this.three.sceneSettings.ambientColor = c.hex;
        this.three.sceneSettings.ambientIntensity = c.rgb.a;
        this.three.genLights();
    }

    render() {
        return <div className="splitWindow">
            <div className="viewer">
                <canvas id="three" className="canvas">
                    </canvas>
            </div>
            <div className="settings">
                <ColorPicker
                    className="child"
                    name="Directional Light"
                    color={ this.state.color }
                    onSelection={this.handleChangeComplete}
                />
                <ColorPicker
                    className="child"
                    name="Ambient Light"
                    color={ this.state.ambientColor}
                    onSelection={this.handleOtherChangeComplete}
                    />
                <button 
                className="child button1"
                onClick={(e)=>this.three.genModel(this.state.color)}>
                    GenModel
                </button>
                <button id="download" className="button1" href="#">
                    Download
                </button>
                <button id="material" className="button1" href="#"
                onClick={(e)=>this.three.updateMaterial()}>
                    Material
                </button>
            </div>
        </div>
    }
}