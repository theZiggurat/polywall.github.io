import React from 'react';
import {Menu, Dropdown, Icon, Slider, InputNumber, Row, Col, Button, Card} from 'antd';
import MeshGen from '../../meshgen';
import './index.css';
import ThreeContext from '../../threecontext';
import Maps from '../../threecontext/maps';

const Menus = ({changeTexture}) => (
    <Menu className='menu'>
      <Menu.Item onClick={()=>changeTexture(Maps.rough1)}>
        Metal
      </Menu.Item>
      <Menu.Item onClick={() =>changeTexture(Maps.rough2)}>
        Stucco
      </Menu.Item>
      <Menu.Item onClick={() => changeTexture(null)}>
        None
      </Menu.Item>
    </Menu>
  );

export default class MeshSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    changeTexture = (tex) => {
        ThreeContext.materialSettings.roughnessMap = tex;
        ThreeContext.materialSettings.roughnessMapChanged = true;
        ThreeContext.updateMaterial();
    }

    render() {
        return <Card size="small" title="Mesh Settings" className='card basis'>
            <div className="divider">
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
                    onNewVal={(v) => MeshGen.depthOffsetMultiplier = v}
                    min={0.2}
                    max={1.0}
                    step={0.02}
                    initialVal={0.4}
                />
                
            </Row>
            <Row className="meshSettings">
                <DecimalSlider 
                    title="Lateral offset:"
                    onNewVal={(v) => MeshGen.lateralOffsetMultiplier=v}
                    min={0.2}
                    max={1.0}
                    step={0.02}
                    initialVal={0.4}
                />
                
            </Row>
            <Row style={{marginTop: "10px"}}>
                <Dropdown overlay={<Menus changeTexture={this.changeTexture}/>}>
                    <Button type="default">
                        Texture <Icon type="down"/>
                    </Button>
                </Dropdown>
            </Row>
            <Button type="primary" className="generate" onClick={ThreeContext.genModel}>
                Generate
            </Button>
            </div>
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