import React from 'react';
import {Slider, InputNumber, Row, Col, Button, Card} from 'antd';
import MeshGen from '../../meshgen';
import './index.css';

export default class MeshSettings extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Card size="small" title="Mesh Settings" className='card'>
            <Row className="meshSettings">
                <DecimalSlider 
                    title="Triangle Size:"
                    onNewVal={(v) => MeshGen.trisize = v}
                    min={0.2}
                    max={1.0}
                    step={0.02}
                    initialVal={0.4}
                />
                
            </Row>
            <Row className="meshSettings">
                <DecimalSlider 
                    title="Depth offset:"
                    onNewVal={(v) => MeshGen.trisize = v}
                    min={0.2}
                    max={1.0}
                    step={0.02}
                    initialVal={0.4}
                />
                
            </Row>
            <Row className="meshSettings">
                <DecimalSlider 
                    title="Lateral offset:"
                    onNewVal={(v) => MeshGen.trisize = v}
                    min={0.2}
                    max={1.0}
                    step={0.02}
                    initialVal={0.4}
                />
                
            </Row>
            <Row className="meshSettings">
                <Button type="primary" size="medium">
                    Generate
                </Button>
            </Row>
        </Card>
    }
}

class DecimalSlider extends React.Component {
    state = {
        inputValue : this.props.initialVal,
    };

    onChange = val => {
        if (isNaN(val)) {return;}
            
        this.setState({
            inputValue: val,
        });
        this.props.onNewVal(val);
    };

    render() {
        const {inputValue} = this.state;
        return (
            <div>
                <Row>
                    <Col span={8} className="title">
                        {this.props.title}
                    </Col>
                    <Col span={8} className="slider">
                        <Slider
                            className="slider-main"
                            min={this.props.min}
                            max={this.props.max}
                            onChange={this.onChange}
                            value={typeof inputValue === 'number' ? inputValue : 0}
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
                            value={inputValue}
                            onChange={this.onChange}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}