// Importa la función 'createRoot' de la librería 'react-dom/client'
// Esta es la forma moderna de React para inicializar la app
import { createRoot } from "react-dom/client";
// Importa tu componente principal 'App'
import App from "./App.tsx";
// Importa tu hoja de estilos global de TailwindCSS
import "./index.css";

// 1. Encuentra el 'div' raíz en el DOM (definido en index.html)
//    El '!' al final le dice a TypeScript: "Estoy seguro de que esto no es nulo"
const rootElement = document.getElementById("root")!;

// 2. Crea un "root" de React en ese elemento del DOM
const root = createRoot(rootElement);

// 3. Renderiza tu componente 'App' dentro de ese "root"
//    (App.tsx es el componente que contiene los Providers y las Rutas)
root.render(<App />);