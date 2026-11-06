# eltimoteyo.github.io

Página de perfil de **Timoteo Rodríguez Cortez**: analista de sistemas, full stack, DevOps e integraciones de IA.

Hecha con React, Vite, Tailwind CSS y Framer Motion. El fondo es un canvas propio con una red de nodos, paquetes de datos y glifos criptográficos.

## Editar el contenido

Todo el texto (experiencia, proyectos, stack, formación, contacto) está en un solo archivo:

```
src/data/profile.ts
```

- **Foto:** copia la imagen a `public/foto.jpg` y en `profile.ts` cambia `photo: ""` por `photo: "foto.jpg"`.
- **CV descargable:** reemplaza `public/cv/CV-Timoteo-Rodriguez-Cortez.pdf`.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/ en http://localhost:4173
```

Agrega `?noboot` a la URL para saltar la animación de arranque.

## Publicación

Cada `git push` a `main` publica automáticamente en GitHub Pages mediante `.github/workflows/deploy.yml`.
