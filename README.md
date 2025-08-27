# 🚀 Proyecto React + Vite

Este proyecto está construido con **[React](https://react.dev/)** y **[Vite](https://vitejs.dev/)**, utilizando **[pnpm](https://pnpm.io/)** como gestor de paquetes.

## 📦 Requisitos previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (>= 18.x recomendado)
- [pnpm](https://pnpm.io/) (>= 9.x recomendado)

Verifica las versiones con:

```bash
node -v
pnpm -v
```

## 🔧 Instalación

Clona el repositorio y entra al directorio del proyecto:

```bash
git clone https://github.com/fnperez/uala-challenge.git
cd uala-challenge
```

Instala las dependencias con:

```bash
pnpm install
```

## ▶️ Ejecutar en modo desarrollo

Para levantar el servidor de desarrollo:

```bash
pnpm dev
```

Esto abrirá la aplicación en:  
👉 [http://localhost:5173](http://localhost:5173)

## 🛠️ Comandos útiles

- **Construir para producción**

```bash
pnpm build
```

- **Previsualizar la build**

```bash
pnpm preview
```

- **Linting (si está configurado)**

```bash
pnpm lint
```

- **Tests (si están configurados)**

```bash
pnpm test
```

## 📂 Estructura básica

```
├─ src/              # Código fuente
│  ├─ core/          # Core de la aplicación (configs, api, stores, assets, etc)
│  ├─ features/      # Features/modulos
│  ├─ shared/        # Componentes/utils compartidos entre features
│  ├─ layout/        # Componentes layout que la aplicación usa
│  └─ main.tsx       # raíz
│  └─ router.tsx     # Definición de rutas de la aplicación
├─ index.html        # Entrada de la app
├─ vite.config.ts    # Configuración de Vite
├─ package.json
└─ pnpm-lock.yaml
```

## 🏗️ Arquitectura seleccionada

La aplicación sigue una arquitectura feature-based, donde el código se organiza por funcionalidades en lugar de capas técnicas.
Esto permite:

Mejor escalabilidad y mantenibilidad.

Evitar dependencias cruzadas innecesarias.

Tener cada feature (ej: transactions, metrics) con sus propias rutas, componentes y lógica.

Además, en core/ se ubican piezas compartidas como el store global, tipados y clientes de API.

## 💾 Manejo de estado con Zustand

Para gestionar el estado de la aplicación, especialmente las transacciones, se utilizó Zustand.

Ventajas:

- API minimalista y fácil de usar.
- Selectores eficientes que evitan renders innecesarios.
- Nos permite guardar las transacciones y operar fácilmente sobre ellas (filtrar, buscar, obtener por id, etc.).

## 🌐 Obtención y cacheo de datos con React Query

La obtención de datos desde el JSON remoto se realiza con React Query, lo que aporta:

- Manejo automático de caché de peticiones.
- Estrategias de revalidación (stale-while-revalidate).
- Estados de loading, error y success simplificados.
- Hidratación de datos en el store de Zustand para luego operar con ellos sin necesidad de volver a pedirlos.

## 🚀 Mejoras a futuro

Actualmente, los filtros (fechas, tarjetas, montos, etc.) y el manejo de paginado se realizan del lado del cliente.
Esto funciona bien para conjuntos de datos pequeños, pero puede ser muy costoso en dispositivos con recursos limitados cuando el volumen de datos crece.

Las mejoras a considerar a futuro son:

Mover la lógica de filtros al backend (API): para que la aplicación solo reciba la data ya filtrada.

Implementar paginado desde la API: evitar cargar toda la data de golpe y trabajar con páginas más pequeñas de resultados.

Esto reducirá el consumo de memoria y mejorará significativamente la experiencia de usuario en dispositivos móviles y navegadores menos potentes.

## 🌐 Tecnologías principales

- ⚛️ React  
- ⚡ Vite  
- 📦 pnpm  
- 🎨 TailwindCSS
- ✅ TypeScript
- ⚙️ Zustand

---

## 📝 Notas

- El `transactions.json` está siendo servido localmente, simulando el consumo de una api (revisar `src/core/api/ApiClient`), ya que el de S3 provisto no pudo ser accedido por CORS. 
  - De arreglarse el issue, se puede cambiar el provider en `src/core/config/app.ts` a `url` y descomentar `url` para que empiece a servirlo desde el S3
- El proyecto usa **pnpm** en lugar de npm/yarn.  
- Si tu editor no reconoce las dependencias, ejecuta:

```bash
pnpm install
```

- Para generar un build optimizado y desplegarlo en producción, utiliza `pnpm build`.

---
