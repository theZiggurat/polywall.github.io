import * as THREE from 'three';

export default function (scale) {
    var geometry = new THREE.Geometry();

    const trisize = 0.5;
    const leftbound = -6.0;
    const rightbound = 6.0;
    const topbound = 6.0;
    const bottombound = -6.0;

    var index = 0;

    var x = Math.ceil((rightbound - leftbound) / trisize);
    var y = Math.ceil((topbound - bottombound) / trisize);

    var map = [];
    for(let i = 0; i < x; i++) {
        map[i] = [];
        for(let j = 0; j < y; j++) {
            map[i][j] = Math.random()*1;
        }
    }

    for (let i = 0; i < x-1; i++) {
        for (let j = 0; j < y-1; j++) {
            let curr_x = leftbound + i * trisize;
            let curr_y = bottombound + j * trisize;
            geometry.vertices.push(
                new THREE.Vector3(curr_x, curr_y, map[i][j]),
                new THREE.Vector3(curr_x, curr_y + trisize, map[i][j+1]),
                new THREE.Vector3(curr_x + trisize, curr_y + trisize, map[i+1][j+1]),
                new THREE.Vector3(curr_x + trisize, curr_y,  map[i+1][j])
            );
    
            var offset = index;
            var face1 = new THREE.Face3(offset, offset + 1, offset + 2);
            face1.color = new THREE.Color(Math.random(), Math.random(), Math.random());
            var face2 = new THREE.Face3(offset+3, offset, offset + 2);
            face2.color = new THREE.Color(Math.random(), Math.random(), Math.random());
            geometry.faces.push(face1, face2);
    
            index+=4;
        }
        
    }
    geometry.computeFaceNormals();



    return geometry;

}