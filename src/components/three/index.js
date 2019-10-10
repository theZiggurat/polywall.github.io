import React from 'react';
import ThreeContext from './threecontext'
import './index.css';

export default class Three extends React.Component {
    componentDidMount() {
        var three = new ThreeContext('three');
        var button = document.getElementById('download');
        button.addEventListener('click', function (e) {
            var dataURL = document.getElementById('three').toDataURL();
            button.href = dataURL;
        });

        three.render();
    }

    render() {
        return <div >
            <canvas id="three" className="canvas">
                </canvas>
            <a id="download" className="button" href="#">
                Download
            </a>
        </div>
    }
}