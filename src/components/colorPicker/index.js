import React from 'react';
import SketchPicker from 'react-color';
import './index.css';
import {Card, Button} from 'antd';
import ThreeContext from '../../threecontext';

export default class ColorPicker extends React.Component {

    constructor(props){
        super(props);
        this.onSelection = this.onSelection.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        ThreeContext.registerLight(this.props.type, this.props.name);
    }

    onSelection(color) {
        if(color !== undefined) ThreeContext.updateLight(this.props.name, color);
    }

    remove = () => {
        this.props.remove(this.props.name);
    }

    render() {
        return <Card size="small" 
                title={this.props.name} 
                className='card'
                extra={<Button size="small" onClick={this.remove}>Remove</Button>}>
            <SketchPicker 
                className="picker"
                color={this.props.color}
                onChange={this.onSelection}
            />
        </Card>
    }
}