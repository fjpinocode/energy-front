# Energy

Proyecto para analizar consumo eléctrico Angular version 7.3.1.

## Instalación

Una vez descargado el proyecto en local ejecutar el comando `npm i` para descargar los módulos de node.

## Desarrollo

Ejecutar en consola el comando `ng serve -o` para desplegar en local. Se lanzará la web en `http://localhost:4200/`.

## Pantallas

La app consta de dos pantallas. La principal donde se insertan los consumos mediante un archivo csv y se muestran los distintos cups almacenados en la base de datos. Y la segunda pantalla donde se muestra en detalle los consumos asociados a un determinado cups y una gráfica de barras.

Si se insertan consumos con otros cups diferentes, la app agrupará consumos por cada cups.

## Archivo csv

El archivo csv deberá tener un formato de 5 columnas cuya primera fila será CUPS;Fecha;Hora;Consumo_kWh;Metodo_obtencion
ya las siguientes filas serán del tipo: ES00XXXXXXXXXXXXXXDB;06/09/2015;1;0,267;R

Se ha insertado en el proyecto una carpeta `csv ejemplo` donde se encuentra consumos.csv para probar.

## TODO

Pendiente de realizar los test unitarios.
