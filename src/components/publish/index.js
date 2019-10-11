import React from 'react';
import {Slider, InputNumber, Row, Col, Button, Card} from 'antd';
import './index.css';

export default class Publisher extends React.Component {
    render() {
        return <Card title="Publish" size="small" className="card">
                <Button type="primary" icon="download" size="large">
                    Download
                </Button>
            </Card>
    }
}