import React from 'react';
import ColorPicker from '../colorPicker';
import {Menu, Dropdown, Button,Card, Icon} from 'antd';
import HorizontalScroll  from 'react-scroll-horizontal';
import './index.css';

const Picker = ({name, color, type, remove}) => (
        <ColorPicker
            name={name}
            color={color}
            type={type}
            remove={remove}
        />
);

const PickerList = ({list, remove}) => (
    <div className="list">
        { list.map((item, i) => 
            <Picker name={item.name} color={item.color} type={item.type} remove={remove} key={i}/>
        )}
    </div>
);

const menu = (
    <Menu>
      <Menu.Item onClick={console.log(1)}>
        1
      </Menu.Item>
      <Menu.Item onClick={console.log(1)}>
        2
      </Menu.Item>
      <Menu.Item onClick={console.log(1)}>
        3
      </Menu.Item>
    </Menu>
  );

export default class ColorSettings extends React.Component {

    constructor() {
        super();
        this.state = {
            lights: [
                {name: 'Directional 1', color: '#FFFFFF', type: 'directional'},
                {name: 'Ambient 1', color: '#FFFFFF', type: 'ambient'},
            ]
        };
        this.addLight = this.addLight.bind(this);
        this.removeLight = this.removeLight.bind(this);
    }

    addLight = () => {
        var name = 'new light';
        var color = '#ffffff';
        var type = 'point';
        const {lights} = this.state;
        const newLights = [...lights, {name: name, color: color, type: type}];
        this.setState({lights: newLights});
    }

    removeLight = (name) => {
        const {lights} = this.state;
        const newLights = lights.filter((val, index, number)=> {
            return val.name != name;
        });
        this.setState({lights: newLights});
    }

    render() {
        const {lights} = this.state;
        return<Card title="Colors" size="small" className='card grow'
                extra={
                    <Dropdown overlay={menu} placement="bottomLeft">
                    <Button type="default" size="small">
                        Add Light! <Icon type="down"/>
                    </Button>
                    </Dropdown>
                }>
                <PickerList list={lights} remove={this.removeLight}/>
        </Card> 
    }
}