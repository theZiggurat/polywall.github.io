import React from 'react';
import {Row, Col, InputNumber, message, Button, Card} from 'antd';
import './index.css';
import ThreeContext from '../../threecontext';
import Three from '../three';


export default class Publisher extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: null,
            resX: 1920,
            resY: 1080,
        };
    }

    onGenerate = () => {
        message.info("Generating...", 1, () => message.success("Done! Click Download"));
        let old = ThreeContext.renderer.getSize();
        ThreeContext.renderer.setSize(this.state.resX, this.state.resY);
        ThreeContext.camera.aspect = this.state.resX/this.state.resY;
        ThreeContext.camera.updateProjectionMatrix();
        ThreeContext.renderer.render(ThreeContext.scene, ThreeContext.camera);
        var img = ThreeContext.canvas.toDataURL("image/png");
        this.setState({url: img});
        ThreeContext.renderer.setSize(old.x, old.y);
        ThreeContext.camera.aspect = old.x/old.y;
        ThreeContext.camera.updateProjectionMatrix();
        
    }

    onChangeX = (val) => this.setState({resX: val})
    onChangeY = (val) => this.setState({resY: val})

    render() {
        return <Card title="Publish" size="small" className="card basis">
            <div className="publish">
                
                <Button type="primary"  size="large" onClick={this.onGenerate}>
                    Generate
                </Button>
                <Row>
                    <Col>
                        Resoltion Width: 
                    </Col>
                    <Col>
                        <InputNumber min={800} max={4096} 
                        defaultValue={1920} onChange={this.onChangeX} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Resoltion Height: 
                    </Col>
                    <Col>
                    <InputNumber min={400} max={2160} 
                        defaultValue={1080} onChange={this.onChangeY} />
                    </Col>
                </Row>
                
                
                <Button type="primary"  size="large" className="download"
                    href={this.state.url} download="polywall.png">
                    Download
                </Button>
                
            </div>
            </Card>
    }
}