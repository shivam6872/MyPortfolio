# 🌊 Shivam Kumar - 3D Ocean Portfolio

An immersive, interactive 3D portfolio website that takes visitors on an underwater journey. Built with **React**, **Three.js**, and **Vite**, this project demonstrates the intersection of creative design and modern web engineering.

## 🚀 Overview

This portfolio replaces the traditional static scroll with a dynamic **3D fly-through experience**. As you scroll, the camera navigates a bezier curve path through an underwater scene filled with realistic bubbles, floating particles, and lighting effects. Content sections reveal themselves at specific depths, creating a seamless narrative flow.

## ✨ Features

- **Immersive 3D Environment**: A fully realized underwater scene with ambient lighting, "plankton" particles, and an environment map.
- **Scroll-Driven Navigation**: The camera follows a meticulously defined `CatmullRomCurve3` path, synchronized perfectly with the user's scroll position.
- **Realistic Materials**: Uses physically based rendering (PBR) for `MeshPhysicalMaterial` to create realistic, refractive air bubbles (simulating water/glass transmission).
- **Interactive Elements**: Floating assets that gently animate and respond to the environment.
- **Responsive HTML Overlays**: Content is projected into the 3D scene using `Scroll` controls, ensuring text is readable and accessible.

## 🛠️ Tech Stack

- **[React](https://react.dev/)**: Core UI library.
- **[Vite](https://vitejs.dev/)**: Next Generation Frontend Tooling.
- **[Three.js](https://threejs.org/)**: JavaScript 3D Library.
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)**: React renderer for Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei)**: Useful helpers for React Three Fiber (ScrollControls, Environment, Sparkles, etc.).

## 📂 Project Structure

- **`src/Experience.jsx`**: The heart of the application. Contains:
    - `CameraRig`: Manages the camera's path and movement logic.
    - `FloatingAsset`: Reusable component for the refractive bubbles.
    - `Experience`: The main scene composition including lights, environment, and HTML content sections.
- **`src/index.css`**: Global styles.
- **`src/main.jsx`**: Entry point.

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/portfolio-2.0.git
    cd portfolio-2.0
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` (or the URL shown in your terminal).

## 🎨 Customizing

- **Camera Path**: Edit the control points in the `CameraRig` function within `src/Experience.jsx` to change the flight path.
- **Content**: Update the HTML sections inside the `<Scroll html>` component in `src/Experience.jsx` to reflect your own skills and projects.
- **Bubbles**: Adjust `FloatingAsset` positions to align with your new camera path or content layout.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
