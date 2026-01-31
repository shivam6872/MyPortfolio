import React from 'react';
import Experience from './Experience';

function App() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <img
                src="/logo.png"
                alt="Logo"
                className="logo"
            />

            {/* Navigation Bar */}
            <nav className="navbar">
                <ul className="nav-list">
                    {['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="nav-link"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <Experience />
        </div>
    );
}

export default App;