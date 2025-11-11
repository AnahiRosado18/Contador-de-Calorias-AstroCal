# AstroCal · Contador de Calorías

Aplicación web moderna para estimar y monitorear el consumo calórico diario de manera sencilla. AstroCal permite crear un perfil nutricional personalizado, registrar alimentos de una base de datos basada en el Sistema Mexicano de Alimentos Equivalentes (SMAE) y visualizar el progreso frente a la meta diaria.

> **Demo en producción:** https://contador-de-calorias-astro-cal.vercel.app

## Tabla de contenidos
- [Características principales](#características-principales)
- [Arquitectura y organización](#arquitectura-y-organización)
- [Tecnologías](#tecnologías)
- [Guía de instalación y uso](#guía-de-instalación-y-uso)
- [Comandos disponibles](#comandos-disponibles)
- [Flujo funcional](#flujo-funcional)
- [Contribuciones](#contribuciones)
- [Autor](#autor)
- [Licencia](#licencia)

## Características principales
- **Autenticación local:** registro, inicio de sesión y persistencia en `localStorage`.
- **Meta calórica personalizada:** cálculo automático del TDEE mediante la fórmula de Mifflin-St Jeor.
- **Catálogo de alimentos SMAE:** búsqueda por nombre, categoría y rango calórico.
- **Dashboard interactivo:** gráficos, resumen diario y seguimiento de consumo de macronutrientes.
- **Historial visual:** análisis de los últimos días con gráficos de barras y líneas.
- **Exportación a PDF:** generación de reportes diarios en un clic.
- **Tema claro/oscuro:** selector manual con preferencia persistente.

## Arquitectura y organización
La aplicación está construida como una SPA con React + TypeScript y se estructura en módulos desacoplados:

```
src/
├─ components/        // UI reutilizable (formularios, tablas, gráficos, etc.)
├─ contexts/          // Proveedores globales: autenticación y tema
├─ data/              // Catálogo SMAE y semillas de información
├─ hooks/             // Hooks personalizados (estado calórico, toasts, breakpoints)
├─ pages/             // Vistas enrutadas: Login, Registro, Dashboard, Historial
├─ utils/ & lib/      // Helpers de formato, cálculos y utilidades compartidas
└─ types/             // Definiciones de tipos y contratos de datos
```

La capa de estado combina Context API (`AuthContext`, `ThemeContext`) con hooks específicos (`useCalories`) para aislar la lógica de negocio. El enrutamiento se gestiona con `react-router-dom` y se apoya en componentes de `shadcn/ui` para la interfaz.

## Tecnologías
- **Framework:** React 18 + Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS, shadcn/ui, Radix UI
- **Gestión de formularios:** React Hook Form + Zod
- **Gráficos y visualizaciones:** Recharts, react-circular-progressbar
- **Gestión de estado remoto y caché:** TanStack Query
- **Generación de reportes:** jsPDF + jspdf-autotable
- **Notificaciones y feedback:** Sonner

## Guía de instalación y uso
> Requisito previo: Node.js ≥ 18.

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/<tu-usuario>/Contador-de-Calorias-AstroCal.git
   cd Contador-de-Calorias-AstroCal
   ```
2. **Instala las dependencias**
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:5173` en el navegador.

### Construir para producción
```bash
npm run build
npm run preview
```

## Comandos disponibles
| Comando         | Descripción                                                     |
|-----------------|-----------------------------------------------------------------|
| `npm run dev`   | Levanta el servidor de desarrollo en modo watch.                |
| `npm run build` | Genera la versión optimizada para producción.                   |
| `npm run lint`  | Ejecuta ESLint sobre el código fuente.                          |
| `npm run preview` | Sirve la build de producción para verificación local.        |

## Flujo funcional
1. **Registro y perfilado:** el usuario ingresa datos personales y objetivos; la aplicación calcula el requerimiento calórico objetivo.
2. **Búsqueda y registro de alimentos:** se consultan alimentos del SMAE, se añaden a la ingesta diaria y se recalcula el progreso.
3. **Visualización del dashboard:** gráficos circulares y listados muestran calorías consumidas vs. meta, distribución de macros y recomendaciones.
4. **Historial y reportes:** se accede al historial reciente, con gráficos comparativos y opción de exportar a PDF el resumen diario.
5. **Personalización:** conmutador de tema claro/oscuro y persistencia automática de preferencias.

## Contribuciones
Las contribuciones son bienvenidas. Antes de abrir un _pull request_:
1. Crea un branch descriptivo (`feature/nueva-funcionalidad`).
2. Asegúrate de pasar `npm run lint` y de incluir la documentación necesaria.
3. Describe claramente los cambios y adjunta capturas cuando el cambio sea visual.

## Autor
**AnahiRosado18** – AnahiRosado18

## Licencia
Este proyecto se distribuye bajo la licencia **MIT**. Puedes usarlo, modificarlo y redistribuirlo libremente preservando la atribución correspondiente.
