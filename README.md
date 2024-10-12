# ScrapingApp Frontend

El frontend de ScrapingApp permite a los usuarios comparar precios de productos entre diferentes supermercados, ver promociones, y acceder a información personalizada de ofertas y productos. Además, los usuarios pueden navegar por las categorías de productos y ver detalles sobre ubicaciones y promociones de pago de cada supermercado.

## Objetivo del Proyecto

Este frontend está diseñado para conectar con la API de ScrapingApp, que recolecta datos de productos en varios supermercados. La aplicación web permite visualizar y comparar estos datos, mostrar gráficos de precios históricos, y brindar recomendaciones personalizadas para los usuarios.

## Requisitos del Sistema

- Node.js (v14 o superior)
- Angular CLI
- NPM (que viene incluido con Node.js)

## Instalación

Sigue estos pasos para instalar y ejecutar el frontend:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/scraping-app-frontend.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd scraping-app-frontend
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   ng serve
   ```

5. Abre tu navegador y navega a `http://localhost:4200/` para ver la aplicación.

## Estructura de Componentes

### Navbar
El componente de navegación principal de la aplicación. Permite a los usuarios moverse entre las diferentes secciones como comparación de productos, ofertas y sucursales.

### Home
La página principal que muestra:
- Noticias o promociones destacadas.
- Gráfico de comparación entre la cantidad de productos y sus precios.
- Categorías populares de productos.
- Últimos productos agregados.
- Marcas de los productos destacados.
- Ubicación de las sucursales cercanas.

### Recomendación Personalizada
Este componente muestra recomendaciones basadas en los productos que el usuario ha buscado o añadido a su lista de comparación.

### LatestOffersComponent
Muestra las ofertas más recientes disponibles en los supermercados.
- Permite filtrar por categoría de producto o supermercado.
  
### ComparisonToolComponent
Herramienta que permite al usuario seleccionar productos y comparar precios entre los supermercados disponibles.
- Incluye gráficos interactivos para visualizar las diferencias de precios.

### SearchComponent
Un campo de búsqueda que permite a los usuarios encontrar productos específicos.
- Incluye autocompletado y sugerencias basadas en búsquedas populares.

### ProductList
Muestra una lista de productos pertenecientes a una categoría, subcategoría o tipo específico.
  
### ProductHierarchy
Permite la navegación por la estructura jerárquica de productos, mostrando categorías, subcategorías y tipos de productos. El usuario puede seleccionar un nivel específico para ver los productos asociados.
- Ejemplo: Un botón de "Supermercado" que permite seleccionar entre Dia, Jumbo o Coto, y luego navegar por sus categorías, subcategorías y tipos de productos.

### PriceHistoryComponent
Muestra gráficos con el historial de precios de los productos seleccionados, permitiendo a los usuarios identificar tendencias y el mejor momento para realizar una compra.

### SucursalesComponent (pendiente de agregar)
Componente que mostrará la ubicación de las sucursales de los supermercados más cercanas. Se podrá buscar por ubicación o por supermercado.

### PromocionesDePagoComponent (pendiente de agregar)
Este componente mostrará las promociones actuales que tienen los supermercados para distintos métodos de pago, como tarjetas de crédito, débito o efectivo.

## Próximas Tareas

- **Agregar Servicios de Conexión con la API**: Conectar los componentes con la API para obtener datos en tiempo real de los productos, precios y promociones.
- **Implementar las Clases de Modelo**: Definir las clases que se utilizarán para manejar la estructura de los productos, sucursales y promociones.
- **Finalizar el Componente de Sucursales**: Mostrar correctamente las ubicaciones y permitir la búsqueda.
- **Finalizar el Componente de Promociones de Pago**: Incluir las promociones y condiciones de pago para diferentes supermercados.

## Impedimentos

- Actualmente falta la integración completa con la API para mostrar datos en tiempo real.
- El componente de sucursales y promociones de pago aún no está terminado.
- Algunas funciones de comparación de productos aún están en desarrollo.
  
## Ejecutar Pruebas

Para ejecutar las pruebas unitarias, usa el siguiente comando:
```bash
ng test
```

Para ejecutar las pruebas end-to-end, usa el siguiente comando:
```bash
ng e2e
```

## Conclusión

ScrapingApp Frontend es una herramienta poderosa para comparar productos y precios en distintos supermercados. La integración completa con la API permitirá una experiencia interactiva y personalizada para los usuarios.
```

Este README incluye todas las secciones solicitadas: componentes, cómo instalar el proyecto, qué falta por agregar, y los comandos para ejecutar la aplicación y las pruebas.
