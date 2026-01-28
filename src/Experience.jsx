import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment, ScrollControls, useScroll, Scroll, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// 1. The Camera Rig (Now follows a curve)
function CameraRig() {
    const scroll = useScroll();

    // Define the path the camera will fly through
    // Points are set to look at the bubbles from a close distance (~3-4 units away) without going INSIDE
    const curve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 10),      // Start
        new THREE.Vector3(-2, 0, 3),      // Visit Bubble 1 (-2, 0, 0)
        new THREE.Vector3(3, -1, -2),     // Visit Bubble 2 (3, -1, -5)
        new THREE.Vector3(-3, 2, -6),     // Visit Bubble 3 (-3, 2, -10)
        new THREE.Vector3(2, 4, -10),    // Visit Bubble 4 (2, -3, -15)
        new THREE.Vector3(0, 0, -19),     // Visit Bubble 5 (0, 0, -22)
    ]), []);

    useFrame((state) => {
        const t = scroll.offset; // 0 to 1
        const point = curve.getPoint(t);

        // Smoothly move camera to the point on the path
        state.camera.position.lerp(point, 0.1);

        // Minor rotation to look slightly towards the direction (optional, keeps it dynamic but readable)
        // const lookAtPoint = curve.getPoint(Math.min(t + 0.05, 1)); 
        // state.camera.lookAt(lookAtPoint); 
        // Note: keeping lookAt commented to ensure text remains perfectly readable on screen.
        // The movement alone gives a strong 3D feel.
    });
    return null;
}

// 2. The Bubble Component (Refined)
function FloatingAsset({ position, speed = 1 }) {
    const meshRef = useRef();
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.2;
        meshRef.current.rotation.x = Math.cos(time / 2) * 0.2;
        meshRef.current.rotation.y = Math.sin(time / 2) * 0.2;
    });
    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[1, 64, 64]} />
            {/* Real Water Bubble Material: 
                - Color: White (so it refracts, doesn't tint)
                - Transmission: 1 (Pure glass/water)
                - IOR: 1.33 (Water refractive index)
                - Thickness: Low (Thin film bubble)
            */}
            <meshPhysicalMaterial
                color="white"
                roughness={0}
                metalness={0}
                transmission={1}
                thickness={0.8}
                ior={1.33}
                clearcoat={1}
                clearcoatRoughness={0}
                transparent={true}
                opacity={1}
                envMapIntensity={1} // Needs environment to look real
            />
        </mesh>
    );
}

export default function Experience() {
    return (
        <Canvas>
            <ScrollControls pages={5} damping={0.3}>

                {/* Layer 1: 3D Scene */}
                <CameraRig />
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />

                {/* Underwater Ambience */}
                <ambientLight intensity={0.2} color="#00bcd4" />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <spotLight position={[0, 100, 0]} intensity={2} color="#00ffff" penumbra={1} />

                {/* Floating "Plankton" particles */}
                <Sparkles count={500} scale={[20, 20, 20]} size={2} speed={0.4} opacity={0.5} color="#ffffff" />

                {/* Floating Spheres (No color prop needed, they are clear bubbles) */}
                <FloatingAsset position={[-3, 0, 1]} speed={1.5} />
                <FloatingAsset position={[3, -1, -5]} speed={1.2} />
                <FloatingAsset position={[-3, 2, -10]} speed={0.8} />
                <FloatingAsset position={[2, 3, -16]} speed={1} />
                <FloatingAsset position={[0, 0, -22]} speed={0.5} />

                {/* Environment as Background */}
                <Environment background files="/underwater_clear.jpg" />

                {/* Layer 2: YOUR PORTFOLIO CONTENT */}
                <Scroll html style={{ width: '100%' }}>

                    {/* SECTION 1: INTRO (Top of page) */}
                    <div style={{ position: 'absolute', top: '15vh', left: '10vw' }}>
                        <img src="/logo.png" alt="Logo" style={{
                            width: '100px', height: 'auto', marginLeft: '4rem', marginTop: '-6rem', marginBottom: '8rem'
                        }} />
                        <h1 style={{ color: '#00d4ff', fontSize: '4rem', fontWeight: 'bold', marginLeft: '4rem' }}>
                            Hi, I'm
                        </h1>
                        <h2 style={{ color: '#fff', fontSize: '5rem', fontWeight: 'bold', marginLeft: '4rem' }}>
                            Shivam Kumar
                        </h2>
                        <h3 style={{ color: '#fff', fontSize: '2rem', marginLeft: '4rem' }}>
                            CSE Student & CyberSecurity Enthusiast
                        </h3>
                        <p style={{ color: '#ccc', fontSize: '1.2rem', maxWidth: '400px', marginLeft: '4rem' }}>
                            Bridging the gap between Electronics and Computer Science.
                        </p>

                    </div>

                    {/* SECTION 2: ACADEMICS (Scroll down a bit) */}
                    <div style={{ position: 'absolute', top: '110vh', right: '10vw', textAlign: 'right' }}>
                        <h1 style={{ color: '#ff00d4', fontSize: '4rem', margin: 0 }}>
                            The Engineer
                        </h1>
                        <p style={{ color: '#fff', fontSize: '1.5rem', maxWidth: '500px', marginLeft: 'auto' }}>
                            Pursuing B.Tech in Electronics & Communication.
                        </p>
                        <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '500px', marginLeft: 'auto' }}>
                            Focusing on Digital Systems, Engineering Mathematics, and integrating Hardware with Software.
                        </p>
                    </div>

                    {/* SECTION 3: SKILLS & PROJECTS (Deeper) */}
                    <div style={{ position: 'absolute', top: '210vh', left: '10vw' }}>
                        <h1 style={{ color: '#ffffff', fontSize: '4rem', margin: 0 }}>
                            The Developer
                        </h1>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                            {/* Skill 1 */}
                            <div style={{ borderLeft: '3px solid #00d4ff', paddingLeft: '15px' }}>
                                <h3 style={{ color: '#00d4ff', margin: 0 }}>Java Core</h3>
                                <p style={{ color: '#ccc', fontSize: '0.9rem' }}>OOP, File I/O, Serialization</p>
                            </div>
                            {/* Skill 2 */}
                            <div style={{ borderLeft: '3px solid #ff00d4', paddingLeft: '15px' }}>
                                <h3 style={{ color: '#ff00d4', margin: 0 }}>FarmVision</h3>
                                <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Innovative Ag-Tech Project</p>
                            </div>
                        </div>
                        <p style={{ color: '#aaa', marginTop: '20px', maxWidth: '400px' }}>
                            Also exploring: APK Modding, PC Hardware Customization, and USB Debugging.
                        </p>
                    </div>

                    {/* SECTION 4: HOBBIES (Deepest) */}
                    <div style={{ position: 'absolute', top: '310vh', right: '15vw', textAlign: 'right' }}>
                        <h1 style={{ color: '#ffaa00', fontSize: '4rem', margin: 0 }}>
                            The Explorer
                        </h1>
                        <p style={{ color: '#fff', fontSize: '1.2rem', maxWidth: '400px', marginLeft: 'auto' }}>
                            "Curiosity didn't kill the cat; it upgraded its RAM."
                        </p>
                        <ul style={{ listStyle: 'none', color: '#ccc', marginTop: '10px' }}>
                            <li>History Blog Writer (Indian History Series)</li>
                            <li>Mobile Gaming (PUBG: New State)</li>
                            <li>Tech Tinkering</li>
                        </ul>
                    </div>

                    {/* SECTION 5: FOOTER (Bottom) */}
                    <div style={{ position: 'absolute', top: '420vh', width: '100%', textAlign: 'center' }}>
                        <h2 style={{ color: '#fff', fontSize: '3rem' }}>Let's Build Something.</h2>
                        <button style={{
                            padding: '15px 40px',
                            fontSize: '1.2rem',
                            background: 'transparent',
                            border: '2px solid #00d4ff',
                            color: '#00d4ff',
                            borderRadius: '50px',
                            marginTop: '20px',
                            cursor: 'pointer',
                            transition: '0.3s'
                        }}
                            onMouseOver={(e) => { e.target.style.background = '#00d4ff'; e.target.style.color = '#000'; }}
                            onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#00d4ff'; }}
                        >
                            Contact Me
                            <a href="/contact"></a>
                        </button>
                    </div>

                </Scroll>
            </ScrollControls>
        </Canvas>
    );
}