var camera, scene, renderer;
var geometry, material1, mesh;

function init() {
    let factor = 0.7;

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    geometry = new THREE.BoxGeometry(factor, factor, factor);
    material1 = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true} );
    material2 = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true} );

    mesh = new THREE.Mesh( geometry, material2 );

    let position;
    for (var i in mesh.geometry.vertices) {
        boxG = new THREE.BoxGeometry(0.5 * factor, 0.5 * factor, 0.5 * factor);
        box = new THREE.Mesh(boxG, material1);

        box.position.copy(mesh.geometry.vertices[i]);

        position = i;
        box.add(position);

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

    mesh.position.x = Math.sin((time * Math.PI) / 5000);
    mesh.position.y = Math.sin((time * Math.PI) / 2500) * 0.2;

    var h = (time / 5000) % 100;
    material1.color.setHSL(h, 0.7, 0.7);

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