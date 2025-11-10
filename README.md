# AstroCal - Contador de Calorías

**AstroCal** es una aplicación web moderna, interactiva y responsiva diseñada para el seguimiento del consumo diario de calorías. La app permite a los usuarios registrarse, calcular su meta calórica diaria personalizada y llevar un registro detallado de los alimentos que consumen.

DEMO: https://contador-de-calorias-astro-cal.vercel.app

El proyecto está construido como una *Single Page Application (SPA)* utilizando **React**, **TypeScript**, y **Tailwind CSS**.
---

## ✨ Características Principales

* **Autenticación de Usuarios:** Sistema de registro y login persistente (guardado en `localStorage`).
* **Cálculo de Meta Calórica:** Aplica la fórmula de Mifflin-St Jeor para calcular el TDEE (Gasto Energético Diario Total) basado en el perfil del usuario.
* **Base de Datos de Alimentos:** Utiliza el **Sistema Mexicano de Alimentos Equivalentes (SMAE)** como base de datos.
* **Dashboard Interactivo:** Gráfico de progreso circular, lista de ingesta diaria y un potente buscador de alimentos.
* **Buscador Avanzado:** Permite filtrar alimentos por nombre, categoría y rango de calorías.
* **Historial y Gráficos:** Visualiza el consumo de los últimos 5 días con gráficos de barras y líneas.
* **Exportación a PDF:** Genera un reporte PDF del consumo del día.
* **Tema Claro/Oscuro:** Soporte completo para cambiar de tema.

---

## 🛠️ Tecnologías Utilizadas

* **Front-end:** React 18+
* **Lenguaje:** TypeScript
* **Build Tool:** Vite
* **Estilos:** Tailwind CSS (con `shadcn/ui`)
* **Gráficos:** Recharts
* **Generación de PDF:** jsPDF & jspdf-autotable
* **Notificaciones:** Sonner

---

## 🏁 Cómo Ejecutar el Proyecto Localmente

Sigue estos sencillos pasos para correr la aplicación en tu máquina local.

### Prerrequisitos

Asegúrate de tener **Node.js** (versión 18.x o superior) instalado en tu sistema.

### Pasos de Instalación

1.  **Descargar el Proyecto**
    * Ve a la página principal del repositorio en GitHub.
    * Haz clic en el botón verde `<> Code`.
    * Selecciona **"Download ZIP"**.

2.  **Descomprimir el Archivo**
    * Encuentra el archivo `.zip` descargado (ej. `AstroCal-main.zip`).
    * Haz clic derecho y selecciona "Extraer todo..." o usa tu programa preferido.

3.  **Abrir la Terminal**
    * Abre la carpeta que acabas de descomprimir (ej. `AstroCal-main`).
    * Abre una terminal o símbolo del sistema (CMD) directamente en esta carpeta.
    *(Tip: En Windows, puedes escribir `cmd` en la barra de direcciones de la carpeta y presionar Enter)*.

4.  **Instalar Dependencias**
    * Una vez en la terminal, ejecuta el siguiente comando para instalar todos los paquetes necesarios:

    ```bash
    npm install
    ```

5.  **Correr la Aplicación**
    * Después de que la instalación se complete, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

    ```bash
    npm run dev
    ```

6.  **¡Listo!**
    * La terminal te mostrará una URL local (usualmente `http://localhost:5173`).
    * Abre esa URL en tu navegador para ver la aplicación funcionando.
