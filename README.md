# Water Leak API

API en NestJS para que los ciudadanos reporten fugas de agua en la via publica.
Al crear un reporte, se guarda en PostgreSQL y se envia un correo de aviso a la
cuadrilla de mantenimiento.

## Stack

- NestJS v11 + TypeScript
- PostgreSQL + TypeORM (migraciones, `synchronize: false`)
- `env-var` + `dotenv` para variables de entorno (`src/config/envs.ts`)
- `bcryptjs` para hash de contrasenas
- `nodemailer` para el envio de correo

## Estructura

```
src/
  config/
    envs.ts          -> lectura de variables de entorno
    data-source.ts    -> DataSource para el CLI de TypeORM (migraciones)
    database.module.ts -> conexion TypeORM en runtime
  users/
    entities/user.entity.ts      -> tabla SYSTEM_USER
    repository/users.repository.ts
    users.module.ts
  auth/
    dto/create-user.dto.ts, login.dto.ts
    auth.controller.ts  -> POST /auth/register, POST /auth/login
    auth.service.ts
    auth.module.ts
  reports/
    entities/report.entity.ts    -> tabla WATER_REPORT
    dto/create-report.dto.ts
    repository/reports.repository.ts
    templates/report.template.ts -> generateReportTemplate(dto)
    reports.controller.ts -> POST /reports, GET /reports
    reports.service.ts
    reports.module.ts
  email/
    email.service.ts    -> sendEmail(to, subject, template)
    email.module.ts
  database/migrations/
    1700000000000-CreateTables.ts -> crea SYSTEM_USER y WATER_REPORT
  app.module.ts
  main.ts
bruno-collection/        -> coleccion de Bruno con los 4 endpoints
```

## 1. Requisitos previos

- Node.js 20+ y npm
- PostgreSQL corriendo localmente (o Docker) con una base de datos creada,
  por ejemplo `water_leaks_db`
- Una cuenta de correo para pruebas. Con Gmail necesitas generar una
  "contrasena de aplicacion" (Google Account > Seguridad > Verificacion en
  dos pasos > Contrasenas de aplicaciones). No funciona tu password normal.

## 2. Instalacion

```bash
npm install
cp .env.example .env
```

Edita `.env` con tus datos reales de PostgreSQL y de correo.

## 3. Migraciones (synchronize: false)

Las tablas NO se crean solas: se crean corriendo la migracion.

```bash
# corre la migracion incluida (crea SYSTEM_USER y WATER_REPORT)
npm run migration:run

# si en el futuro cambias una entidad y quieres generar una migracion nueva:
npm run migration:generate -- src/database/migrations/NombreDeLaMigracion
```

## 4. Levantar la API

```bash
npm run start:dev
```

Por defecto queda en `http://localhost:3000`.

## 5. Probar con Bruno

1. Abre Bruno > "Open Collection" y selecciona la carpeta `bruno-collection/`.
2. Selecciona el environment `local` (ya trae `baseUrl = http://localhost:3000`).
3. Prueba en este orden:
   - `auth/Registrar usuario` (POST /auth/register)
   - `auth/Login` (POST /auth/login) — si cambias la contrasena en el body,
     te debe regresar un `BadRequestException` con mensaje claro.
   - `reports/Crear reporte` (POST /reports) — guarda el reporte y dispara
     el correo a `MAINTENANCE_CREW_EMAIL`.
   - `reports/Listar reportes` (GET /reports)

## 6. Endpoints

| Metodo | Ruta            | Body                  | Descripcion                              |
|--------|-----------------|-----------------------|-------------------------------------------|
| POST   | /reports        | CreateReportDto        | Crea el reporte y envia correo a la cuadrilla |
| GET    | /reports        | -                      | Lista todos los reportes                  |
| POST   | /auth/register  | CreateUserDto           | Registra un usuario (password hasheado)   |
| POST   | /auth/login     | LoginDto (email, password) | Valida credenciales; si son invalidas lanza `BadRequestException` |

## Notas para el video de entrega

Buena secuencia para grabar:
1. Mostrar `.env` (sin exponer credenciales reales si vas a subir el repo publico).
2. `npm run migration:run` mostrando que crea las tablas en PostgreSQL (pgAdmin o psql).
3. `npm run start:dev` levantando la API.
4. Bruno: `auth/Registrar usuario`, luego `auth/Login` (caso exitoso y caso con password incorrecto).
5. Bruno: `reports/Crear reporte` mostrando el 201 y luego el correo recibido (bandeja de la cuadrilla).
6. Bruno: `reports/Listar reportes` mostrando el reporte guardado.
