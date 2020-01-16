var camera, scene, renderer;
var geometry, material, mesh;

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    geometry = new THREE.SphereGeometry( 3 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

    mesh = new THREE.Mesh( geometry, material );
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