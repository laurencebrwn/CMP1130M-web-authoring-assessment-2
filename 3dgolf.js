var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, 320 / 480, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( 320, 480 );
document.body.appendChild( renderer.domElement );


var loader = new THREE.GLTFLoader();

loader.load( 'http://localhost/assets/3d/scene.gltf', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
