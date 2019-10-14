import React from 'react';
import ColorPicker from '../colorPicker';
import {message, Menu, Dropdown, Button,Card, Icon} from 'antd';
import './index.css';
import ThreeContext from '../../threecontext';

const Picker = ({name, color, type, remove, control}) => (
        <ColorPicker
            name={name}
            color={color}
            type={type}
            remove={remove}
            control={control}
        />
);

const PickerList = ({list, remove, control}) => (
    <div className="list">
        { list.map((item, i) => 
            <Picker name={item.name} color={item.color} type={item.type} 
                remove={remove} control={control} key={i}
            />
        )}
    </div>
);

const Menus = ({addlight}) => (
    <Menu className='menu'>
      <Menu.Item onClick={() => addlight('Directional')}>
        Directional Light
      </Menu.Item>
      <Menu.Item onClick={() => addlight('Ambient')}>
        Ambient Light
      </Menu.Item>
      <Menu.Item onClick={() => addlight('Point')}>
        Point Light
      </Menu.Item>
    </Menu>
  );

export default class ColorSettings extends React.Component {

    constructor() {
        super();
        this.state = {
            lights: [
                {name: 'Directional 1', color: '#FFFFFF', type: 'Directional'},
                {name: 'Ambient 1', color: '#FFFFFF', type: 'Ambient'},
            ],
            types: {
                'Ambient': 1,
                'Directional': 1,
                'Point': 0,
            },
            control: null,
        };
        this.firstTime = true;
        this.addLight = this.addLight.bind(this);
        this.removeLight = this.removeLight.bind(this);
    }

    addLight = (type) => {
        const {lights, types, control} = this.state;
        let index = types[type] + 1;
        let name = `${type} ${index}`;
        const newLights = [...lights, {name: name, color: '#fff', type: type}];
        const newtypes = {...types, type: types[type]++};
        this.setState({lights: newLights, types: newtypes});
    }

    removeLight = (name) => {
        const lights = this.state.lights;
        const newLights = lights.filter((val, index, number)=> {
            return val.name != name;
        });
        this.setState({lights: newLights});
    }

    setControl = (elem) => {
        if (elem.state.control){
            elem.setState({control: false});
            this.setState({control: null});
            ThreeContext.setControl(null);
            return;
        }

        elem.setState({control: true});
        let curr = this.state.control;
        if (curr != null) 
            curr.setState({control: false});
        this.setState({control: elem});
        ThreeContext.setControl(elem.props.name);

        if(this.firstTime) {
            message.info('Drag the mouse to move light source' ,10);
            this.firstTime = false;
        }
    }

    render() {
        const lights = this.state.lights;
        return<Card title="Colors" size="small" className='card grow'
                extra={
                    <Dropdown overlay={<Menus addlight={this.addLight}/>}>
                    <Button type="default" size="small">
                        Add Light <Icon type="down"/>
                    </Button>
                    </Dropdown>
                }>
                <PickerList list={lights} remove={this.removeLight} control={this.setControl}/>
        </Card> 
    }
}