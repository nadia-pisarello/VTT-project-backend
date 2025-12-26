# VTT Backend (En Desarrollo)

Backend del sistema Virtual Tabletop (VTT), implementado con **NestJS** y **MySQL**.  
Este repositorio define la API, la capa de negocio y el modelo de datos principal del proyecto.  
Actualmente se encuentra **en desarrollo activo**, por lo que la estructura, módulos y endpoints pueden cambiar con frecuencia.

---

## Estado del Proyecto

Este backend está en construcción.  
Se están definiendo las entidades iniciales y el diseño modular.  
La documentación formal, endpoints estables y autenticación se añadirán conforme avance el desarrollo.

---

## Tecnologías Utilizadas

- **NestJS**
- **TypeScript**
- **TypeORM**
- **MySQL**
- **Class Validator / Class Transformer**
- **Swagger**
- **Jest**

---

## Testing

El proyecto utiliza **Jest** para la implementación de **tests unitarios**, principalmente sobre la capa de servicios.

Los tests verifican:

- reglas de negocio
- validaciones
- manejo de errores

### Ejecutar tests

```bash
npm run test
```

---

## Estructura Actual del Proyecto

src/
├── auth/
├── config/
├── partida/
├── personaje/
├── usuario/
├── app.module.ts
└── main.ts
