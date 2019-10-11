import React from 'react';
import ChromePicker from 'react-color';
import './index.css';

export default class ColorPicker extends React.Component {
    render() {
        return <div className="colorPicker">
            <div className="colorName"> {this.props.name} </div>
            <ChromePicker
                color={ this.props.initColor }
                onChange={ this.props.onSelection }
            />
        </div>
    }
}