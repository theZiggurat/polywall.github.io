import React from 'react';
import {Slider, InputNumber, Row, Col, Button, Card} from 'antd';

const tabList = [
    {
      key: 'tab1',
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2',
    },
];

const contentList = {
    tab1: <p className="tab">content1</p>,
    tab2: <p className="tab">content2</p>,
  };
  

export default class MaterialSettings extends React.Component {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
      };
    
    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };
    
    render() {
        return <Card size="small" title="Material Settings" className='card basis color'
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                this.onTabChange(key, 'key');
                }}
            >
                {contentList[this.state.key]}
            </Card>
    }
}