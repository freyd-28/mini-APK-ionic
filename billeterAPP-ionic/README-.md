# BilleterAPP - Mini APK Ionic + Flask

Mini aplicación con login JWT y CRUD de **Clientes, Categorías y Productos** conectada al backend Flask/MySQL.

## 1. Backend

Usa la carpeta `backend proyecto copia - 3` incluida en el paquete.

Desde esa carpeta activa tu entorno virtual y ejecuta:

```bash
python run.py
```

Debe quedar disponible en:

`http://localhost:5000`

El backend ya fue preparado para aceptar Ionic en `localhost:8100` y Capacitor.

> Para esta mini aplicación se quitaron las restricciones de rol de Categorías para que el CRUD pueda demostrarse con cualquier usuario autenticado. En producción conviene volver a restringirlo a Administrador.

## 2. Ionic

Desde la carpeta `billeterAPP`:

```bash
npm install
ionic serve
```

Abre `http://localhost:8100`.

## 3. Usuario

La app usa el `/api/v1/auth/login` del backend. Debes iniciar sesión con un usuario existente.

Si necesitas crear uno y tu API tiene registro habilitado, puedes hacerlo con:

```http
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "email": "demo@billeterapp.com",
  "password": "12345678",
  "nombre": "Usuario Demo",
  "nombre_usuario": "demo"
}
```

## 4. APK / celular físico

En `src/environments/environment.prod.ts` cambia:

```ts
apiUrl: 'http://192.168.1.25:5000/api/v1'
```

por la **IP local de tu PC**.

El PC y el celular deben estar en la misma Wi-Fi y el puerto 5000 debe estar permitido por el firewall de Windows.

Para generar Android:

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Luego compila la APK desde Android Studio.

## 5. Qué incluye

- Login JWT.
- Token Bearer enviado automáticamente en las operaciones CRUD.
- Clientes: crear, listar, editar y eliminar.
- Categorías: crear, listar, editar y eliminar.
- Productos: crear, listar, editar y eliminar.
- Producto relacionado con Categoría.
- Mensajes de error provenientes de Flask.
