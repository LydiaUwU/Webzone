var camera, scene, renderer;
var geometry, material, mesh;

function init() {
    let factor = 0.7;

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    geometry = new THREE.BoxGeometry(factor, factor, factor);
    material = new THREE.MeshLambertMaterial( { color: 0xff0000} );

    mesh = new THREE.Mesh( geometry, material );

    for (var i in mesh.geometry.vertices) {
        boxG = new THREE.BoxGeometry(0.5 * factor, 0.5 * factor, 0.5 * factor);
        box = new THREE.Mesh(boxG, material);

        box.position.copy(mesh.geometry.vertices[i]);

        for (var j in box.geometry.vertices) {
            boxG2 = new THREE.BoxGeometry(0.25 * factor, 0.25 * factor, 0.25 * factor);
            box2 = new THREE.Mesh(boxG2, material);

            box2.position.copy(box.geometry.vertices[j]);

            for (var k in box2.geometry.vertices) {
                boxG3 = new THREE.BoxGeometry(0.125 * factor, 0.125 * factor, 0.125 * factor);
                box3 = new THREE.Mesh(boxG3, material);

                box3.position.copy(box2.geometry.vertices[k]);

                box2.add(box3);
            }

            box.add(box2);
        }

        mesh.add(box);
    }

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

}

function animate( time ) {

    mesh.rotation.x = time * 0.00005;
    mesh.rotation.y = time * 0.0001;

    renderer.render( scene, camera );
    requestAnimationFrame( animate );

}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

init();
requestAnimationFrame( animate );