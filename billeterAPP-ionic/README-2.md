# BilleterAPP Ionic — versión corregida

## Correcciones incluidas
- `environment.ts` usa `http://localhost:5000/api/v1` para pruebas en el navegador del PC.
- Se corrigió la carga de `Tab3Page`: ahora usa un `@Component(...)` normal y exporta la clase correctamente.
- `Tab2Page` y `Tab3Page` importan explícitamente los componentes Ionic que utilizan.
- `TabsPage` importa explícitamente los componentes Ionic de la barra de pestañas y registra los iconos.
- `LoginPage` y `Tab1Page` también usan imports explícitos de Ionic.
- Se mantienen las rutas `/tabs/clientes`, `/tabs/categorias` y `/tabs/productos`.
- Se conserva el token JWT en `localStorage` y el `ApiService` lo envía como `Authorization: Bearer ...`.

## Probar en el PC
Desde la carpeta del proyecto:

```powershell
npm install
npm start
```

Abrir:

```text
http://localhost:8100
```

El backend Flask debe estar ejecutándose en:

```text
http://localhost:5000
```

## Para probar después en el celular/APK
Cambiar solamente `src/environments/environment.ts`:

```typescript
apiUrl: 'http://IP_DEL_PC:5000/api/v1'
```

Por ejemplo:

```typescript
apiUrl: 'http://192.168.1.11:5000/api/v1'
```

El celular y el PC deben estar en la misma red Wi-Fi y Flask debe escuchar en `0.0.0.0:5000`.
