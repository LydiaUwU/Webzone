var camera, scene, renderer;
var geometry, material, torus;

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
    camera.position.z = 2;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    torusG = new THREE.TorusKnotGeometry(4);
    redFrame = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    blackFrame = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});

    torus = new THREE.Mesh(torusG, blackFrame);

    for (var i in torus.geometry.vertices) {
        boxG = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        box = new THREE.Mesh(boxG, redFrame);

        box.position.copy(torus.geometry.vertices[i]);

        torus.add(box);
    }

    scene.add(torus);

    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate( time ) {

    torus.rotation.x = time * 0.00005;
    torus.rotation.y = time * 0.0001;

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