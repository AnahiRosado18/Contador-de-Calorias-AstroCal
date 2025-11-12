import { Food } from '@/types';

/**
 * Base de datos extendida de alimentos basada en el Sistema Mexicano de Alimentos Equivalentes.
 * Fuente: guia-alimentos.pdf
 */
export const MEXICAN_FOODS: Food[] = [
  // --- VERDURAS (Todas 25 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 29-30)
  { id: 'v1', name: 'Lechuga', category: 'Verduras', calories: 25, serving: '3 tazas' },
  { id: 'v2', name: 'Jitomate Bola', category: 'Verduras', calories: 25, serving: '1 pieza' },
  { id: 'v3', name: 'Cebolla rebanada cruda', category: 'Verduras', calories: 25, serving: '1/2 taza' },
  { id: 'v4', name: 'Zanahoria picada', category: 'Verduras', calories: 25, serving: '1/2 taza' },
  { id: 'v5', name: 'Brócoli cocido', category: 'Verduras', calories: 25, serving: '1/2 taza' },
  { id: 'v6', name: 'Calabacita cruda', category: 'Verduras', calories: 25, serving: '1 pieza' },
  { id: 'v8', name: 'Nopales cocidos', category: 'Verduras', calories: 25, serving: '1 taza' },
  { id: 'v10', name: 'Pepino rebanado', category: 'Verduras', calories: 25, serving: '1 1/2 taza' },
  { id: 'v11', name: 'Champiñón cocido', category: 'Verduras', calories: 25, serving: '1 taza' },
  { id: 'v12', name: 'Espinaca cruda', category: 'Verduras', calories: 25, serving: '2 tazas' },
  { id: 'v13', name: 'Jícama picada', category: 'Verduras', calories: 25, serving: '1/2 taza' },
  { id: 'v14', name: 'Pimiento morrón', category: 'Verduras', calories: 25, serving: '1 pieza' },
  { id: 'v15', name: 'Coliflor cocida', category: 'Verduras', calories: 25, serving: '1 taza' },
  { id: 'v16', name: 'Ejotes cocidos', category: 'Verduras', calories: 25, serving: '1/2 taza' },
  { id: 'v17', name: 'Chile poblano', category: 'Verduras', calories: 25, serving: '1/2 pieza' }, // Añadido


  // --- FRUTAS (Todas 60 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 33-34)
  { id: 'f1', name: 'Manzana', category: 'Frutas', calories: 60, serving: '1 pieza chica' },
  { id: 'f2', name: 'Plátano', category: 'Frutas', calories: 60, serving: '1/2 pieza' },
  { id: 'f3', name: 'Naranja', category: 'Frutas', calories: 60, serving: '1 pieza' },
  { id: 'f4', name: 'Papaya picada', category: 'Frutas', calories: 60, serving: '1 taza' },
  { id: 'f5', name: 'Sandía picada', category: 'Frutas', calories: 60, serving: '1 taza' },
  { id: 'f8', name: 'Fresa rebanada', category: 'Frutas', calories: 60, serving: '1 taza' },
  { id: 'f9', name: 'Guayaba', category: 'Frutas', calories: 60, serving: '3 piezas' },
  { id: 'f10', name: 'Uvas (roja o verde)', category: 'Frutas', calories: 60, serving: '15 piezas' },
  { id: 'f7', name: 'Piña picada', category: 'Frutas', calories: 60, serving: '3/4 taza' },
  { id: 'f11', name: 'Melón picado', category: 'Frutas', calories: 60, serving: '1 taza' },
  { id: 'f12', name: 'Pera', category: 'Frutas', calories: 60, serving: '1/2 pieza' },
  { id: 'f13', name: 'Durazno', category: 'Frutas', calories: 60, serving: '2 piezas chicas' },
  { id: 'f14', name: 'Mango petacón', category: 'Frutas', calories: 60, serving: '1/2 pieza' },
  { id: 'f15', name: 'Jugo de naranja natural', category: 'Frutas', calories: 60, serving: '1/2 taza' },


  // --- CEREALES SIN GRASA (Todos 70 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 25-26)
  { id: 'c1', name: 'Arroz blanco cocido', category: 'Cereales s/g', calories: 70, serving: '1/2 taza' },
  { id: 'c2', name: 'Tortilla de maíz', category: 'Cereales s/g', calories: 70, serving: '1 pieza' },
  { id: 'c4', name: 'Pan de caja (blanco o integral)', category: 'Cereales s/g', calories: 70, serving: '1 pieza' },
  { id: 'c6', name: 'Avena cocida', category: 'Cereales s/g', calories: 70, serving: '3/4 taza' },
  { id: 'c7', name: 'Pasta hervida', category: 'Cereales s/g', calories: 70, serving: '1/2 taza' },
  { id: 'c_papa', name: 'Papa hervida', category: 'Cereales s/g', calories: 70, serving: '1/2 pieza' },
  { id: 'c8', name: 'Bolillo (sin migajón)', category: 'Cereales s/g', calories: 70, serving: '1/2 pieza' },
  { id: 'c9', name: 'Galleta María', category: 'Cereales s/g', calories: 70, serving: '5 piezas' },
  { id: 'c10', name: 'Palomitas naturales', category: 'Cereales s/g', calories: 70, serving: '3 tazas' },
  { id: 'c11', name: 'Tostada horneada', category: 'Cereales s/g', calories: 70, serving: '1 pieza' },
  { id: 'c12', name: 'Galletas Habaneras', category: 'Cereales s/g', calories: 70, serving: '4 piezas' },
  { id: 'c13', name: 'Tortilla de harina', category: 'Cereales s/g', calories: 70, serving: '1/2 pieza' }, // Añadido


  // --- CEREALES CON GRASA (Todos 115 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 26)
  { id: 'ccg1', name: 'Papas fritas', category: 'Cereales c/g', calories: 115, serving: '6 piezas' },
  { id: 'ccg2', name: 'Pan dulce (concha)', category: 'Cereales c/g', calories: 115, serving: '1 pieza' },
  { id: 'ccg3', name: 'Tamal', category: 'Cereales c/g', calories: 115, serving: '1/4 pieza' },
  { id: 'ccg4', name: 'Totopos y nachos', category: 'Cereales c/g', calories: 115, serving: '4 piezas' },
  { id: 'ccg5', name: 'Galleta con chispas de chocolate', category: 'Cereales c/g', calories: 115, serving: '3 piezas' },
  { id: 'ccg6', name: 'Palomitas con mantequilla', category: 'Cereales c/g', calories: 115, serving: '1 taza' },


  // --- LEGUMINOSAS (Todas 120 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 47)
  { id: 'l1', name: 'Frijoles negros cocidos', category: 'Leguminosas', calories: 120, serving: '1/2 taza' },
  { id: 'l2', name: 'Lentejas cocidas', category: 'Leguminosas', calories: 120, serving: '1/2 taza' },
  { id: 'l3', name: 'Garbanzos cocidos', category: 'Leguminosas', calories: 120, serving: '1/2 taza' },
  { id: 'l4', name: 'Soya cocida', category: 'Leguminosas', calories: 120, serving: '1/3 taza' },
  { id: 'l5', name: 'Alubias cocidas', category: 'Leguminosas', calories: 120, serving: '1/2 taza' },
  { id: 'l6', name: 'Frijoles pintos cocidos', category: 'Leguminosas', calories: 120, serving: '1/2 taza' }, // Añadido


  // --- AOA MUY BAJA GRASA (Todos 40 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 37-38)
  { id: 'p1', name: 'Pechuga de pollo (cocida)', category: 'AOA s/g', calories: 40, serving: '30 gramos' },
  { id: 'p2', name: 'Bistec de res', category: 'AOA s/g', calories: 40, serving: '30 gramos' },
  { id: 'p4', name: 'Atún en agua', category: 'AOA s/g', calories: 40, serving: '40 gramos' },
  { id: 'p_huevo', name: 'Clara de huevo', category: 'AOA s/g', calories: 40, serving: '2 piezas' },
  { id: 'p_pescado', name: 'Filete de pescado (mero, mojarra)', category: 'AOA s/g', calories: 40, serving: '40 gramos' },
  { id: 'p_camaron', name: 'Camarón cocido', category: 'AOA s/g', calories: 40, serving: '5 piezas' },
  { id: 'p_pavo', name: 'Pechuga de pavo', category: 'AOA s/g', calories: 40, serving: '2 rebanadas' }, // Añadido


  // --- AOA BAJA GRASA (Todos 55 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 38-39)
  { id: 'p_jamon', name: 'Jamón de pavo', category: 'AOA b/g', calories: 55, serving: '2 rebanadas' },
  { id: 'd4', name: 'Queso panela', category: 'AOA b/g', calories: 55, serving: '40 gramos' },
  { id: 'd6', name: 'Queso fresco', category: 'AOA b/g', calories: 55, serving: '40 gramos' },
  { id: 'p_salmon', name: 'Salmón', category: 'AOA b/g', calories: 55, serving: '30 gramos' },
  { id: 'p_higado', name: 'Hígado de res', category: 'AOA b/g', calories: 55, serving: '30 gramos' },


  // --- AOA MODERADA GRASA (Todos 75 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 39)
  { id: 'p_huevo_entero', name: 'Huevo', category: 'AOA Mod. Grasa', calories: 75, serving: '1 pieza' },
  { id: 'p_salchicha', name: 'Salchicha de pavo', category: 'AOA Mod. Grasa', calories: 75, serving: '1 pieza' },
  { id: 'p_sardina', name: 'Sardina en aceite', category: 'AOA Mod. Grasa', calories: 75, serving: '3 piezas' },
  { id: 'p_chicharron', name: 'Chicharrón de cerdo', category: 'AOA Mod. Grasa', calories: 75, serving: '12 gramos' }, // Añadido


  // --- AOA ALTA GRASA (Todos 100 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 40)
  { id: 'p_q_amarillo', name: 'Queso amarillo', category: 'AOA Alta Grasa', calories: 100, serving: '2 rebanadas' },
  { id: 'p_q_oaxaca', name: 'Queso Oaxaca', category: 'AOA Alta Grasa', calories: 100, serving: '30 gramos' },
  { id: 'p_q_manchego', name: 'Queso manchego', category: 'AOA Alta Grasa', calories: 100, serving: '25 gramos' },
  { id: 'p_nuggets', name: 'Nuggets de pollo', category: 'AOA Alta Grasa', calories: 100, serving: '2 piezas' },
  { id: 'p_mortadela', name: 'Mortadela', category: 'AOA Alta Grasa', calories: 100, serving: '1 1/2 rebanada' },


  // --- LECHE DESCREMADA (95 kcal) ---
  // Fuente: guia-alimentos.pdf (p. 43)
  { id: 'd1', name: 'Leche descremada', category: 'Lácteos', calories: 95, serving: '1 taza' },
  { id: 'd_yogurtL', name: 'Yogurt light', category: 'Lácteos', calories: 95, serving: '3/4 taza' },
  
  // --- LECHE ENTERA (150 kcal) ---
  // Fuente: guia-alimentos.pdf (p. 43)
  { id: 'd2', name: 'Leche entera', category: 'Lácteos', calories: 150, serving: '1 taza' },
  { id: 'd3', name: 'Yogur natural (entero)', category: 'Lácteos', calories: 150, serving: '1 taza' },

  // --- GRASAS (SIN PROTEÍNA - 45 kcal) ---
  // Fuente: guia-alimentos.pdf (p. 51-52)
  { id: 'g2', name: 'Aceite de oliva (canola, soya)', category: 'Grasas s/p', calories: 45, serving: '1 cucharadita' },
  { id: 'g_crema', name: 'Crema', category: 'Grasas Sat.', calories: 45, serving: '1 cucharada' },
  { id: 'g_mantequilla', name: 'Mantequilla', category: 'Grasas Sat.', calories: 45, serving: '1 1/2 cucharaditas' },
  { id: 'g_tocino', name: 'Tocino', category: 'Grasas Sat.', calories: 45, serving: '1 rebanada' },
  { id: 'g_q_crema', name: 'Queso crema', category: 'Grasas Sat.', calories: 45, serving: '1 cucharada' },

  // --- GRASAS (CON PROTEÍNA - 70 kcal) ---
  // Fuente: guia-alimentos.pdf (p. 51)
  { id: 'g1', name: 'Aguacate', category: 'Grasas c/p', calories: 70, serving: '1/3 pieza' },
  { id: 'g4', name: 'Almendras', category: 'Grasas c/p', calories: 70, serving: '10 piezas' },
  { id: 'g5', name: 'Cacahuates', category: 'Grasas c/p', calories: 70, serving: '14 piezas' },
  { id: 'g_mayo', name: 'Mayonesa', category: 'Grasas c/p', calories: 70, serving: '1 cucharadita' },
  { id: 'g3', name: 'Nueces', category: 'Grasas c/p', calories: 70, serving: '3 piezas' }, // Añadido

  // --- AZÚCARES SIN GRASA (Todos 40 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 55)
  { id: 'az1', name: 'Refresco (normal)', category: 'Azúcares s/g', calories: 40, serving: '1/4 de lata' },
  { id: 'az2', name: 'Miel (abeja, maple)', category: 'Azúcares s/g', calories: 40, serving: '2 cucharaditas' },
  { id: 'az3', name: 'Mermelada', category: 'Azúcares s/g', calories: 40, serving: '2 1/2 cucharaditas' },
  { id: 'az4', name: 'Azúcar (blanca o morena)', category: 'Azúcares s/g', calories: 40, serving: '2 1/2 cucharaditas' },
  { id: 'az5', name: 'Gelatina (con agua)', category: 'Azúcares s/g', calories: 40, serving: '1/3 taza' },
  { id: 'az6', name: 'Jugo de fruta (industrializado)', category: 'Azúcares s/g', calories: 40, serving: '1/3 taza' },

  // --- AZÚCARES CON GRASA (Todos 85 kcal por porción) ---
  // Fuente: guia-alimentos.pdf (p. 56)
  { id: 'azg1', name: 'Helado de leche', category: 'Azúcares c/g', calories: 85, serving: '1/3 taza' },
  { id: 'azg2', name: 'Chocolate (barra tipo Snickers)', category: 'Azúcares c/g', calories: 85, serving: '1/2 barra' },
  { id: 'azg3', name: 'Palanqueta de cacahuate', category: 'Azúcares c/g', calories: 85, serving: '1/3 pieza' },
  { id: 'azg4', name: 'Chocolate blanco', category: 'Azúcares c/g', calories: 85, serving: '15 gramos' },
  { id: 'azg5', name: 'Flan de caja', category: 'Azúcares c/g', calories: 85, serving: '1/5 taza' },

  // --- PLATILLOS (Calorías calculadas desde equivalentes del PDF p. 60) ---
  { id: 'plat1', name: 'Tacos al pastor (2 piezas)', category: 'Platillos', calories: 285, serving: '1 orden (2 tacos)' },
  { id: 'plat2', name: 'Hamburguesa con queso', category: 'Platillos', calories: 485, serving: '1 pieza' },
  { id: 'plat3', name: 'Pizza (1 rebanada)', category: 'Platillos', calories: 365, serving: '1 rebanada' },
  { id: 'plat4', name: 'Torta de milanesa', category: 'Platillos', calories: 515, serving: '1 pieza' },
  // --- Nuevos platillos añadidos ---
  { id: 'plat5', name: 'Quesadilla (maíz, queso)', category: 'Platillos', calories: 170, serving: '1 pieza' },
  { id: 'plat6', name: 'Enchiladas verdes (3 pzas)', category: 'Platillos', calories: 375, serving: '1 orden' },
  { id: 'plat7', name: 'Sopa de tortilla', category: 'Platillos', calories: 200, serving: '1 tazón' },
  { id: 'plat8', name: 'Pozole (pollo/cerdo)', category: 'Platillos', calories: 190, serving: '1 tazón' },
  { id: 'plat9', name: 'Chilaquiles con pollo', category: 'Platillos', calories: 375, serving: '1 plato' },
  { id: 'plat10', name: 'Huevos a la mexicana (2)', category: 'Platillos', calories: 220, serving: '1 plato' },

  // --- BEBIDAS (Añadidas) ---
  { id: 'b1', name: 'Agua natural', category: 'Bebidas', calories: 0, serving: '1 vaso' },
  { id: 'b2', name: 'Café sin azúcar', category: 'Bebidas', calories: 0, serving: '1 taza' },
  { id: 'b3', name: 'Té sin azúcar', category: 'Bebidas', calories: 0, serving: '1 taza' },
  { id: 'b4', name: 'Horchata (1 vaso)', category: 'Bebidas', calories: 115, serving: '1 vaso (240ml)' },
  { id: 'b5', name: 'Agua de jamaica (endulzada)', category: 'Bebidas', calories: 80, serving: '1 vaso (240ml)' }, // 2 porciones de azúcar

  // --- POSTRES (Añadidos) ---
  { id: 'postre1', name: 'Churros (2 pzas)', category: 'Postres', calories: 155, serving: '2 piezas' },
  { id: 'postre2', name: 'Flan napolitano', category: 'Postres', calories: 170, serving: '1/2 taza' }, // 2 porciones Azúcar c/g
  { id: 'postre3', name: 'Paleta de hielo (agua)', category: 'Postres', calories: 40, serving: '1 pieza' }, // 1 porción Azúcar s/g
];

/**
 * Categorías actualizadas para el nuevo sistema
 */
export const FOOD_CATEGORIES = [
  'Todas',
  'Verduras',
  'Frutas',
  'Cereales s/g', // sin grasa
  'Cereales c/g', // con grasa
  'Leguminosas',
  'AOA s/g', // Alimentos Origen Animal sin grasa
  'AOA b/g', // baja grasa
  'AOA Mod. Grasa', // moderada grasa
  'AOA Alta Grasa', // alta grasa
  'Lácteos',
  'Grasas c/p', // con proteína
  'Grasas s/p', // sin proteína
  'Grasas Sat.', // saturadas
  'Azúcares s/g', // sin grasa
  'Azúcares c/g', // con grasa
  'Platillos',
  'Bebidas', // Añadida
  'Postres', // Añadida
];
