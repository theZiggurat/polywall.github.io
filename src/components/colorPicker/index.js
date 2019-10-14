import React from 'react';
import ChromePicker from 'react-color';
import './index.css';
import {Row, Col, InputNumber, Card, Button, Slider} from 'antd';
import ThreeContext from '../../threecontext';

export default class ColorPicker extends React.Component {

    constructor(props){
        super(props);
        this.onColor = this.onColor.bind(this);
        this.onIntensity = this.onIntensity.bind(this);
        this.remove = this.remove.bind(this);
        this.control = this.control.bind(this);
        this.componentDidMount = () => 
            ThreeContext.registerLight(this.props.type, this.props.name);
        this.componentWillUnmount = () => 
            ThreeContext.deleteLight(this.props.name);
        this.state = {
            control: false,
            color: this.props.color,
            intensity: 1.0
        };
    }

    onColor(color) {
        if(color !== undefined) {
            ThreeContext.updateLightColor(this.props.name, color);
            this.setState({color: color});
        }
    }

    onIntensity(val) {
        this.setState({intensity: val});
        ThreeContext.updateLightIntensity(this.props.name, val);
    }

    remove = () => {
        this.props.remove(this.props.name);
    }

    control = () => {
        this.props.control(this);
    }

    render() {
        return <Card size="small" 
                title={this.props.name} 
                className='card'
                extra={<div className="buttonHolder">
                <Button size="small" type="danger" icon="delete" className="button" onClick={this.remove}/>
                <Button size="small" className="button" type={
                    this.state.control ? 'primary':'dashed'
                } onClick={this.control} disabled={this.props.type=='Ambient'}>Control</Button> 
                </div>}>
            <ChromePicker 
                className="picker"
                onChange={this.onColor}
                color={this.state.color}
            />
            <IntensitySlider initVal={1.0} 
                    step={0.05}
                    min={0} max={3}
                    onChange={this.onIntensity}/>
        </Card>
    }
}

class IntensitySlider extends React.Component {
    state = {
        intensity: this.props.initVal
    };

    onChange = val => {
        if (isNaN(val)) {return;}
            
        this.setState({
            intensity: val,
        });
        this.props.onChange(val);
    };

    render() {
        const {intensity} = this.state;
        return (
            <div>
                <Row>
                    <Col span={8} className="title">
                        Intensity: 
                    </Col>
                    <Col span={8} className="slider">
                        <Slider
                            className="slider-main"
                            min={this.props.min}
                            max={this.props.max}
                            onChange={this.onChange}
                            value={typeof intensity === 'number' ? intensity : 0}
                            step={this.props.step}
                        />
                    </Col>
                    <Col span={2} >
                        <InputNumber
                            className="input"
                            min={this.props.min}
                            max={this.props.max}
                            style={{ marginLeft: 16 }}
                            step={this.props.step}
                            value={intensity}
                            onChange={this.onChange}
                        />
                    </Col>
                </Row>
            </div>
        );
    }


}