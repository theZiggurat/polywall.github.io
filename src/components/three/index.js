import React from 'react';
import init from './init'
import './index.css';

export default class Three extends React.Component {
    componentDidMount() {
        init('three');
        var button = document.getElementById('download');
        button.addEventListener('click', function (e) {
            var dataURL = document.getElementById('three').toDataURL();
            button.href = dataURL;
        });
    }

    onMove(e) {

    }

    render() {
        return <div >
            <canvas id="three" className="canvas"
                onMouseMove={(e)=>this.onMove(e)}>
                </canvas>
            <a id="download" className="button" href="#">
                Download
            </a>
        </div>
    }
}