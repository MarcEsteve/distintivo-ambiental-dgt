# Consulta de Distintivo Ambiental - DGT 🚗💨

Aplicación web desarrollada con **React**, **TypeScript** y **Vite** para consultar el distintivo ambiental oficial asignado por la **DGT (Dirección General de Tráfico)** a partir de la matrícula de un vehículo.

---

### 🌐 **Demo en producción (Online)**
> Accede a la aplicación en directo aquí:  
> 🔗 **[https://distintivo-ambiental-dgt.vercel.app/](https://distintivo-ambiental-dgt.vercel.app/)**

---

## 📌 ¿Qué hace esta aplicación?

Permite a los usuarios comprobar de forma rápida y visual qué etiqueta medioambiental le corresponde a un vehículo (turismos, motocicletas, etc.), mostrando además su ficha técnica descriptiva:

1. **Búsqueda y normalización de matrículas**:
   - Admite diferentes formatos: matrículas modernas (`1234ABC`), antiguas provinciales (`M1234YZ`, `CS4383AV`) y matrículas de motocicletas.
   - Normaliza automáticamente la entrada (conversión a mayúsculas y eliminación de espacios o guiones).

2. **Consulta asíncrona realista (API / JSON)**:
   - Los datos de los vehículos se gestionan de forma desacoplada en un archivo `matriculas.json` servido como recurso estático.
   - La aplicación ejecuta peticiones asíncronas con `fetch` simulando una consulta real a un servicio web o base de datos.
   - Manejo completo de estados en la interfaz:
     - **Cargando / Consultando**: deshabilita temporalmente el formulario y muestra retroalimentación visual al usuario.
     - **Resultado encontrado**: renderiza la información detallada del vehículo y su distintivo oficial.
     - **No encontrado**: mensaje de aviso cuando la matrícula no existe en el registro.
     - **Errores de red**: captura y muestra errores si la petición no puede completarse.

3. **Decodificación de distintivos oficiales DGT**:
   - Traduce los códigos de homologación de la DGT (`16TB`, `16TC`, `16TE`, `16MB`, `16MC`, `CERO`, etc.) a sus respectivas etiquetas:
     - 🔵 **CERO**: Vehículos 100% eléctricos (BEV) e híbridos enchufables con gran autonomía.
     - 🟢🔵 **ECO**: Híbridos (HEV), microhíbridos (MHEV) y vehículos a gas (GLP/GNC).
     - 🟢 **C**: Gasolina Euro 4/5/6 o diésel Euro 6.
     - 🟡 **B**: Gasolina Euro 3 o diésel Euro 4/5.
     - ⚪ **SIN DISTINTIVO**: Vehículos que no cumplen los requisitos para obtener distintivo ambiental (gasolina anteriores a Euro 3 o diésel anteriores a Euro 4).

4. **Componente modular de detalle (`Vehiculo`)**:
   - La visualización del vehículo se gestiona en el componente independiente `Vehiculo.tsx`.
   - Muestra la matrícula con formato de placa, la imagen oficial del distintivo y una cuadrícula con especificaciones técnicas: marca, modelo, tipo de combustible, año de matriculación, categoría del vehículo y normativa de emisiones Euro.

---

## 📂 Estructura del proyecto

```text
├── public/
│   ├── assets/
│   │   ├── distintivos/      # Imágenes oficiales de los distintivos (cero, eco, c, b, sin)
│   │   ├── logo_dgt.svg      # Logotipo oficial de la DGT
│   │   └── dgt-favicon.png   # Favicon de la aplicación
│   └── data/
│       └── matriculas.json   # Base de datos JSON de vehículos para la consulta
├── src/
│   ├── componentes/
│   │   ├── Vehiculo.tsx      # Componente para mostrar la ficha del vehículo y su distintivo
│   │   └── SearchForm.tsx    # Componente para el formulario de búsqueda
│   ├── data/
│   │   └── matriculas.json   # Copia del conjunto de datos para importación directa en TypeScript
│   ├── styles/
│   │   └── dgt.css           # Estilos corporativos inspirados en el diseño de la DGT
│   ├── App.tsx               # Componente principal: lógica de estado y consulta fetch
│   └── main.tsx              # Punto de entrada de la aplicación React
└── index.html                # Plantilla HTML principal
```

---

## 🚦 Matrículas de ejemplo para probar

Puedes introducir cualquiera de las siguientes matrículas de prueba para verificar cada uno de los distintivos y casuísticas:

| Matrícula | Distintivo | Vehículo | Combustible / Normativa |
| :--- | :---: | :--- | :--- |
| **`9999XXX`** | 🔵 **CERO** | Tesla Model 3 | 100% Eléctrico (BEV) |
| **`3456JKL`** | 🔵 **CERO** | Nissan Leaf | 100% Eléctrico (BEV) |
| **`0012KMT`** | 🟢🔵 **ECO** | Toyota Corolla 1.8 Hybrid | Híbrido gasolina (HEV) / Euro 6d |
| **`9012GHI`** | 🟢🔵 **ECO** | Kia Niro PHEV | Híbrido enchufable (PHEV) / Euro 6d |
| **`0003HMC`** | 🟢 **C** | Volkswagen Golf 2.0 TDI | Diésel / Euro 5 |
| **`1234ABC`** | 🟢 **C** | Hyundai Tucson 1.6 CRDi | Diésel / Euro 6 |
| **`5334FBB`** | 🟢 **C** | Ford Focus 1.6 TDCi | Diésel / Euro 5 |
| **`0002BGP`** | 🟡 **B** | SEAT Ibiza 1.4 TDI | Diésel / Euro 4 |
| **`5678DEF`** | 🟡 **B** | Citroën C4 1.6 HDi | Diésel / Euro 4 |
| **`B5678WX`** | 🟡 **B** | Audi A3 1.9 TDI (antigua provincial) | Diésel / Euro 4 |
| **`0004DJP`** | ⚪ **SIN** | Renault Clio 1.9 D | Diésel / Euro 3 |
| **`CS4383AV`** | ⚪ **SIN** | Peugeot 206 1.4 HDi (antigua provincial) | Diésel / Euro 3 |
| **`M1234YZ`** | ⚪ **SIN** | SEAT Toledo 1.9 TDI (antigua provincial) | Diésel / Euro 2 |
| **`1600MBB`** | 🟡 **B** | Honda CB500F (motocicleta) | Gasolina / Euro 2 |
| **`1700MCC`** | 🟢 **C** | Yamaha MT-07 (motocicleta) | Gasolina / Euro 4 |

---

## 🛠️ Tecnologías utilizadas

- **React 19**
- **TypeScript**
- **Vite 6**
- **CSS3** (Variables CSS y diseño responsive)
- **ESLint 9**

---

## 🚀 Instalación y puesta en marcha

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en el navegador.

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

4. **Previsualizar la versión de producción:**
   ```bash
   npm run preview
   ```

5. **Ejecutar el linter:**
   ```bash
   npm run lint
   ```

---

## 📄 Licencia y aviso

Proyecto creado con fines **educativos y demostrativos**. Los logotipos e imágenes de distintivos ambientales son propiedad de la Dirección General de Tráfico (DGT).
