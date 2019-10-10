import * as THREE from 'three';

export default function (scale) {
    var geometry = new THREE.Geometry();

    
    const leftbound = -10.0;
    const rightbound = 10.0;
    const topbound = 10.0;
    const bottombound = -10.0;

    const lateralOffsetMultiplier = 0.5;
    const depthOffsetMultiplier = 0.4;
    const trisize = 0.4;

    var index = 0;

    var basecolor = new THREE.Color(0x0006b1);

    var x = Math.ceil((rightbound - leftbound) / trisize);
    var y = Math.ceil((topbound - bottombound) / trisize);

    var map = [];
    for(let i = 0; i < x; i++) {
        map[i] = [];
        for(let j = 0; j < y; j++) {
            map[i][j] = new THREE.Vector3(
                (Math.random()-0.5) * trisize * lateralOffsetMultiplier,
                (Math.random()-0.5) * trisize * lateralOffsetMultiplier,
                Math.random()* depthOffsetMultiplier
            );
        }
    }

    for (let i = 0; i < x-1; i++) {
        for (let j = 0; j < y-1; j++) {
            let curr_x = leftbound + i * trisize;
            let curr_y = bottombound + j * trisize;
            geometry.vertices.push(
                new THREE.Vector3(curr_x + map[i][j].x, curr_y + map[i][j].y, map[i][j].z),
                new THREE.Vector3(curr_x + map[i][j+1].x, curr_y + trisize + map[i][j+1].y, map[i][j+1].z),
                new THREE.Vector3(curr_x + trisize + map[i+1][j+1].x, curr_y + trisize + map[i+1][j+1].y, map[i+1][j+1].z),
                new THREE.Vector3(curr_x + trisize + map[i+1][j].x, curr_y + map[i+1][j].y,  map[i+1][j].z)
            );
    
            var offset = index;
            var face1 = new THREE.Face3(offset+1, offset, offset + 2);
            face1.color = generateColor(basecolor);
            var face2 = new THREE.Face3(offset+2, offset, offset + 3);
            face2.color = generateColor(basecolor);
            geometry.faces.push(face1, face2);
    
            index+=4;
        }
        
    }
    geometry.computeFaceNormals();
    return geometry;

}

function generateColor(basecolor) {
    const colorOffset = 0.1;
    return basecolor.clone().addScalar(Math.random()*colorOffset);
}