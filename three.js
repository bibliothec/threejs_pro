
window.addEventListener("load",init);

const width=960;
const height=540;

function init(){
	const renderer=new THREE.WebGLRenderer({canvas:document.querySelector("#myCanvas")});
	renderer.setSize(width,height);
	window.addEventListener('resize', onResize);

	const scene=new THREE.Scene();

	const camera=new THREE.PerspectiveCamera(45,width/height,1,10000);
	camera.position.set(0,0,+1000);

	const directionalLight=new THREE.DirectionalLight(0xFFFFFF);
	directionalLight.position.set(1,1,1);
	scene.add(directionalLight);

	const group=new THREE.Group();
	scene.add(group);

	//const loader=new THREE.TDSloader();
	//loader.setResourcePath();

	for(let i=0;i<10;i++){
		const material=new THREE.MeshNormalMaterial();
		const geometry=new THREE.SphereGeometry(30,30,30);
		const mesh=new THREE.Mesh(geometry,material);

		const radian=2*Math.PI*i/10;
		mesh.position.set(200*Math.cos(radian), 30, 200*Math.sin(radian));

		group.add(mesh);
	}
	scene.add(group)

	particle();
	tick();

	function tick(){
		group.rotation.y+=0.01;
	
		renderer.render(scene,camera);
		requestAnimationFrame(tick);
	}
	
	function particle(){
		const SIZE=3000;
		const LENGTH=1000;
	
		const vertices=[];
		for(let i=0;i<LENGTH;i++){
			const x=SIZE*(Math.random()-0.5);
			const y=SIZE*(Math.random()-0.5);
			const z=SIZE*(Math.random()-0.5);
	
			vertices.push(x,y,z);
		}
	
		const geometry=new THREE.BufferGeometry();
		geometry.setAttribute("position",new THREE.Float32BufferAttribute(vertices,-3));
	
		const material=new THREE.PointsMaterial({size:10,color:0xffffff,});
	
		const mesh=new THREE.Points(geometry,material);
		scene.add(mesh);
	}

	function onResize(){
		const width=window.innerWidth;
		const height=window.innerHeight;
	
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width,height);
	
		camera.aspect=width/height;
		camera.updateProjectionMatrix();
	}
}




