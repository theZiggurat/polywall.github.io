import React from 'react';
import ColorSettings from '../colorsettings';
import MeshSettings from '../meshsettings';
import ThreeContext from '../../threecontext';
import Publisher from '../publish';
import MaterialSettings from '../materialsettings';
import {Row, Col, Divider, Card, Button} from 'antd';
import './index.css';

export default class Settings extends React.Component {
    render() {
        return <div className="settings">
            
            <div className="horizontal">
                <ColorSettings />
                <MeshSettings />
                <MaterialSettings />
                <Publisher />
            </div>
    </div>
    }
}