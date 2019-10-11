import * as THREE from 'three';

class MeshGenerator {

    generate (basecolor) {
        var geometry = new THREE.Geometry();

        
        this.leftbound = -25.0;
        this.rightbound = 25.0;
        this.topbound = 10.0;
        this.bottombound = -10.0;

        this.lateralOffsetMultiplier = 0.5;
        this.depthOffsetMultiplier = 0.4;
        this.trisize = 0.4;

        var index = 0;

        var x = Math.ceil((this.rightbound - this.leftbound) / this.trisize);
        var y = Math.ceil((this.topbound - this.bottombound) / this.trisize);

        
        let color = new THREE.Color(basecolor);

        var map = [];
        for(let i = 0; i < x; i++) {
            map[i] = [];
            for(let j = 0; j < y; j++) {
                map[i][j] = new THREE.Vector3(
                    (Math.random()-0.5) * this.trisize * this.lateralOffsetMultiplier,
                    (Math.random()-0.5) * this.trisize * this.lateralOffsetMultiplier,
                    Math.random()* this.depthOffsetMultiplier
                );
            }
        }

        for (let i = 0; i < x-1; i++) {
            for (let j = 0; j < y-1; j++) {
                let curr_x = this.leftbound + i * this.trisize;
                let curr_y = this.bottombound + j * this.trisize;
                geometry.vertices.push(
                    new THREE.Vector3(curr_x + map[i][j].x, curr_y + map[i][j].y, map[i][j].z),
                    new THREE.Vector3(curr_x + map[i][j+1].x, curr_y + this.trisize + map[i][j+1].y, map[i][j+1].z),
                    new THREE.Vector3(curr_x + this.trisize + map[i+1][j+1].x, curr_y + this.trisize + map[i+1][j+1].y, map[i+1][j+1].z),
                    new THREE.Vector3(curr_x + this.trisize + map[i+1][j].x, curr_y + map[i+1][j].y,  map[i+1][j].z)
                );
        
                var offset = index;
                var face1 = new THREE.Face3(offset+1, offset, offset + 2);
                face1.color = this.generateColor(color);
                var face2 = new THREE.Face3(offset+2, offset, offset + 3);
                face2.color = this.generateColor(color);
                geometry.faces.push(face1, face2);
        
                index+=4;
            }
            
        }
        geometry.computeFaceNormals();
        this.assignUVs(geometry);
        return geometry;

    }

    assignUVs(geometry) {
        geometry.computeBoundingBox();

        var max = geometry.boundingBox.max,
            min = geometry.boundingBox.min;
        var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
        var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
        var faces = geometry.faces;

        geometry.faceVertexUvs[0] = [];

        for (var i = 0; i < faces.length ; i++) {

            var v1 = geometry.vertices[faces[i].a], 
                v2 = geometry.vertices[faces[i].b], 
                v3 = geometry.vertices[faces[i].c];

            geometry.faceVertexUvs[0].push([
                new THREE.Vector2((v1.x + offset.x)/range.x *2,(v1.y + offset.y)/range.y * 2),
                new THREE.Vector2((v2.x + offset.x)/range.x *2,(v2.y + offset.y)/range.y * 2),
                new THREE.Vector2((v3.x + offset.x)/range.x *2,(v3.y + offset.y)/range.y * 2)
            ]);
        }
        geometry.uvsNeedUpdate = true;
    }

    generateColor(basecolor) {
        const colorOffset = 0.1;
        return basecolor.clone().addScalar(Math.random()*colorOffset);
    }
}

const MeshGen = new MeshGenerator();
export default MeshGen;