import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { PerspectiveCamera, Environment, ScrollControls, useScroll, Scroll, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// 1. The Camera Rig (Follows a curve)
function CameraRig() {
    const scroll = useScroll();

    // Define the path the camera will fly through
    // Points are set to look at the bubbles from a close distance (~3-4 units away) without going INSIDE
    const curve = useMemo(() => new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 10),      // Start (Home)
        new THREE.Vector3(-2, 0, 3),      // Visit Bubble 1 (About)
        new THREE.Vector3(3, -1, -2),     // Visit Bubble 2 (Skills)
        new THREE.Vector3(-3, 2, -6),     // Visit Bubble 3 (Projects)
        new THREE.Vector3(2, 4, -10),     // Visit Bubble 4 (Education)
        new THREE.Vector3(0, 0, -19),     // Visit Bubble 5 (Contact)
    ]), []);

    useFrame((state) => {
        const t = scroll.offset; // 0 to 1
        const point = curve.getPoint(t);

        // Smoothly move camera to the point on the path
        state.camera.position.lerp(point, 0.1);
    });
    return null;
}

// 2. The Bubble Component (Decorative Background)
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
            <meshPhysicalMaterial
                color="white"
                roughness={0}
                metalness={0.1} // Slight reflectivity
                transmission={1} // Full transmission for glass/water effect
                thickness={0.1} // Much thinner for bubble effect
                ior={1.1} // Closer to air/soap (1.0 is air, 1.33 is water) for less distortion
                clearcoat={1}
                clearcoatRoughness={0}
                transparent={true}
                opacity={0.3} // Actual transparency to see through it well
                envMapIntensity={1}
            />
        </mesh>
    );
}

export default function Experience() {
    return (
        <Canvas>
            <ScrollControls pages={7} damping={0.3}>

                {/* Layer 1: 3D Scene */}
                <CameraRig />
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />

                {/* Underwater Ambience */}
                <ambientLight intensity={0.2} color="#00bcd4" />
                <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
                <spotLight position={[0, 100, 0]} intensity={2} color="#00ffff" penumbra={1} />

                {/* Floating "Plankton" particles */}
                <Sparkles count={500} scale={[20, 20, 20]} size={2} speed={0.4} opacity={0.5} color="#ffffff" />

                {/* Floating Spheres */}
                <FloatingAsset position={[-3, 0, 1]} speed={1.5} />
                <FloatingAsset position={[3, -1, -5]} speed={1.2} />
                <FloatingAsset position={[-3, 2, -10]} speed={0.8} />
                <FloatingAsset position={[2, 3, -16]} speed={1} />
                <FloatingAsset position={[0, 0, -22]} speed={0.5} />

                {/* Backup Background Color */}
                <color attach="background" args={['#001e36']} />

                {/* Environment */}
                <Environment files="/underwater_clear.jpg" />

                {/* Layer 2: YOUR PORTFOLIO CONTENT (Restored Overlay) */}
                <Scroll html style={{ width: '100%' }}>

                    {/* SECTION 1: HOME (Intro) */}
                    <motion.div
                        id="home"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '15vh',
                            left: '0',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <div>
                            <h1 style={{ color: '#00d4ff', fontSize: '4rem', fontWeight: 'bold', margin: '0 auto' }}>
                                Hi, I'm
                            </h1>
                            <h2 style={{ color: '#fff', fontSize: '5rem', fontWeight: 'bold', margin: '0 auto' }}>
                                Shivam Kumar
                            </h2>
                            <h3 style={{ color: '#fff', fontSize: '2rem', margin: '0 auto' }}>
                                CSE Student & CyberSecurity Enthusiast
                            </h3>
                            <p style={{ color: '#ccc', fontSize: '1.2rem', maxWidth: '600px', margin: '10px auto 0 auto' }}>
                                Bridging the gap between Electronics and Computer Science.
                            </p>
                        </div>

                        {/* Profile Image */}
                        <img
                            src="/profile_main.png"
                            alt="Shivam Kumar"
                            style={{
                                height: '400px',
                                width: 'auto',
                                marginTop: '30px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0px 0px 20px rgba(0, 212, 255, 0.3))',
                                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                            }}
                        />
                    </motion.div>

                    {/* SECTION 2: ABOUT */}
                    <motion.div
                        id="about"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '100vh',
                            left: '0',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <h1 style={{ color: '#ffaa00', fontSize: '4rem', margin: '0 auto' }}>
                            About Me
                        </h1>
                        <p style={{ color: '#fff', fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
                            "Curiosity didn't kill the cat; it upgraded its RAM."
                        </p>
                        <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '600px', margin: '10px auto 0 auto' }}>
                            I am a passionate explorer of technology, constantly diving into the depths of hardware and software. From writing history blogs to customizing PC hardware, I believe in understanding how things work from the ground up.
                        </p>
                        <ul style={{ listStyle: 'none', color: '#ccc', marginTop: '20px', padding: 0 }}>
                            <motion.li whileHover={{ x: -10, color: '#ffaa00' }}>History Blog Writer</motion.li>
                            <motion.li whileHover={{ x: -10, color: '#ffaa00' }}>Mobile Gaming (PUBG: New State)</motion.li>
                            <motion.li whileHover={{ x: -10, color: '#ffaa00' }}>Tech Tinkering & Modding</motion.li>
                        </ul>
                    </motion.div>

                    {/* SECTION 3: SKILLS */}
                    <motion.div
                        id="skills"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '200vh',
                            left: '0',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <h1 style={{ color: '#00d4ff', fontSize: '4rem', margin: '0 auto' }}>
                            Skills
                        </h1>
                        <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
                            <motion.div whileHover={{ scale: 1.1 }} style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '15px 25px', borderRadius: '10px', border: '1px solid #00d4ff' }}>
                                <h3 style={{ color: '#fff', margin: 0 }}>Java Core</h3>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '15px 25px', borderRadius: '10px', border: '1px solid #00d4ff' }}>
                                <h3 style={{ color: '#fff', margin: 0 }}>CyberSecurity</h3>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '15px 25px', borderRadius: '10px', border: '1px solid #00d4ff' }}>
                                <h3 style={{ color: '#fff', margin: 0 }}>React / Three.js</h3>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }} style={{ background: 'rgba(0, 212, 255, 0.1)', padding: '15px 25px', borderRadius: '10px', border: '1px solid #00d4ff' }}>
                                <h3 style={{ color: '#fff', margin: 0 }}>Hardware / IoT</h3>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* SECTION 4: PROJECTS */}
                    <motion.div
                        id="projects"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '300vh',
                            left: '0',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <h1 style={{ color: '#ff00d4', fontSize: '4rem', margin: '0 auto' }}>
                            Projects
                        </h1>
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
                            <motion.div whileHover={{ scale: 1.05 }} style={{ borderRight: '3px solid #ff00d4', paddingRight: '15px' }}>
                                <h2 style={{ color: '#fff', margin: 0 }}>FarmVision</h2>
                                <p style={{ color: '#ccc', fontSize: '1rem' }}>Innovative Ag-Tech Project using Computer Vision.</p>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} style={{ borderRight: '3px solid #ff00d4', paddingRight: '15px' }}>
                                <h2 style={{ color: '#fff', margin: 0 }}>3D Portfolio</h2>
                                <p style={{ color: '#ccc', fontSize: '1rem' }}>Interactive Underwater Experience with React Three Fiber.</p>
                            </motion.div>
                        </div>
                        <p style={{ color: '#aaa', marginTop: '20px', maxWidth: '400px', margin: '20px auto 0 auto' }}>
                            Also exploring: APK Modding, PC Hardware Customization, and USB Debugging.
                        </p>
                    </motion.div>

                    {/* SECTION 5: EDUCATION */}
                    <motion.div
                        id="education"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '400vh',
                            left: '0',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <h1 style={{ color: '#ffffff', fontSize: '4rem', margin: '0 auto' }}>
                            Education
                        </h1>
                        <div style={{ borderLeft: '3px solid #fff', paddingLeft: '20px', marginTop: '20px', textAlign: 'left' }}>
                            <h2 style={{ color: '#fff', margin: 0 }}>B.Tech in E&C</h2>
                            <h4 style={{ color: '#ccc', margin: '5px 0' }}>Current</h4>
                            <p style={{ color: '#aaa', fontSize: '1rem', maxWidth: '500px' }}>
                                Focusing on Digital Systems, Engineering Mathematics, and integrating Hardware with Software.
                            </p>
                        </div>
                    </motion.div>

                    {/* SECTION 6: CONTACT (Footer) */}
                    <div id="contact" style={{ position: 'absolute', top: '500vh', width: '100%', textAlign: 'center' }}>
                        <h2 style={{ color: '#fff', fontSize: '3rem' }}>Let's Build Something.</h2>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { staggerChildren: 0.2, duration: 0.5 }
                                }
                            }}
                            style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}
                        >
                            {/* LinkedIn */}
                            <motion.a variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} href="https://linkedin.com/in/shivam-kumar" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 30px', background: 'transparent', border: '2px solid #0077b5', color: '#0077b5', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem', transition: '0.3s'
                                }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#0077b5'; e.currentTarget.style.color = '#fff'; e.currentTarget.querySelector('svg').style.fill = '#fff'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0077b5'; e.currentTarget.querySelector('svg').style.fill = '#0077b5'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0077b5" style={{ transition: '0.3s' }}>
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    LinkedIn
                                </button>
                            </motion.a>

                            {/* Instagram */}
                            <motion.a variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} href="https://instagram.com/shivam_kumar" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 30px', background: 'transparent', border: '2px solid #E1306C', color: '#E1306C', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem', transition: '0.3s'
                                }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#E1306C'; e.currentTarget.style.color = '#fff'; e.currentTarget.querySelector('svg').style.fill = '#fff'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#E1306C'; e.currentTarget.querySelector('svg').style.fill = '#E1306C'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#E1306C" style={{ transition: '0.3s' }}>
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                    Instagram
                                </button>
                            </motion.a>

                            {/* GitHub */}
                            <motion.a variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} href="https://github.com/shivam-kumar" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 30px', background: 'transparent', border: '2px solid #ffffff', color: '#ffffff', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem', transition: '0.3s'
                                }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#000'; e.currentTarget.querySelector('svg').style.fill = '#000'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.querySelector('svg').style.fill = '#ffffff'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" style={{ transition: '0.3s' }}>
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </button>
                            </motion.a>

                            {/* Email */}
                            <motion.a variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} href="mailto:shivam.kumar@example.com" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 30px', background: 'transparent', border: '2px solid #ffaa00', color: '#ffaa00', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem', transition: '0.3s'
                                }}
                                    onMouseOver={(e) => { e.currentTarget.style.background = '#ffaa00'; e.currentTarget.style.color = '#000'; e.currentTarget.querySelector('svg').style.fill = '#000'; }}
                                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffaa00'; e.currentTarget.querySelector('svg').style.fill = '#ffaa00'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffaa00" style={{ transition: '0.3s' }}>
                                        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                                    </svg>
                                    Email
                                </button>
                            </motion.a>
                        </motion.div>
                    </div>


                </Scroll>
            </ScrollControls>
        </Canvas>
    );
}