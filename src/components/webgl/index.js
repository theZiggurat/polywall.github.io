import React from 'react';
import init from './init'
import GLC from './glcommander';
import './index.css';

export default class WebGL extends React.Component {
    componentDidMount() {
        init('webgl');
    }

    onMove(event) {
        let canvas = document.getElementById('webgl');
        GLC.clearColor = [event.clientX/canvas.clientWidth, 
            event.clientY/canvas.clientHeight,
            0.5,
            1.0];
    }

    render() {
        return <div>
            <canvas id="webgl" className="canvas"
                    onMouseMove={(e)=>this.onMove(e)}>
                        
            </canvas>    
            <h1>
                Hello, this is my first webgl project
            </h1>
        </div>
    }
}