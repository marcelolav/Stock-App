# Stock-Angular

Sistema de control de inventario Front-End basado en Angular con Base de datos Firestore.

Referencias:
```
Los archivos de environment sirven para identificar la base de datos a utilizar y no se encuentran en este repositorio debido a que cada implementación hace uso de datos personales de cada conexión.  Si no sabe como utilizar firestore, lea la documentación. Los detalles se encuentran abajo.
```


## Detalles para la instalacion:

1) Crear una carpeta dentro de src/environments y dentro de ella crear los archivos siguientes ya que son necesarios para configuracion del proyecto:

environment.prod.ts  
environment.ts

2) Modelo de environment para este proyecto:

```
export const environment = {
  production: false,
  firebaseConfig: {
      apiKey: 'xxxxxxxxxxxxxxxx',
      authDomain: 'xxxxxxxxxxxxxxxx',
      databaseURL: 'xxxxxxxxxxxxxxxx',
      projectId: 'xxxxxxxxxxxxxxxx',
      storageBucket: '',
      messagingSenderId: 'xxxxxxxxxxxxxxxx',
      appId: 'xxxxxxxxxxxxxxxx'
    }
};
```
Los xxxx son los datos de su propio firestore o firebase.  Si no sabe donde obtenerlos dirijase a la [documentación de Firebase](https://firebase.google.com/)

Si desea saber mas acerca de Angular dirijasé a la [documentación de Angular](https://angular.io/docs)


3) Instale las dependencias:

``` 
npm install 
```
4) Luego de esto ya se encuentra en posicion de abrir un servidor de desarrollo para testear el producto:

``` npm start ``` 
o bien 
``` ng serve -open ```

Esto creará un servidor en la dirección localhost,  verifique los mensajes en pantalla para saber en que dirección y puerto se alojó la aplicacion.  

## Actualizaciones

### 31-08-2019 (Creacion de contenedor e imagenes con docker)

Una vez realizada la descarga primero debe realizar el build de la aplicacion con
```
npm run build
```
Esto genera una carpeta con el contenido para desplegar en cualquier servidor en linea (Ya transpilado a java nativo).  Si tiene instalado el sistema de virtualización de docker,  desde la misma linea de comandos tipee:
```
npm run dockerbuild
```

Esto creará y generará los archivos de imagen y contenedor necesarios para el despliegue de la app en un contenedor. 

Revise la documentación de Docker para mas detalle sobre todos los comandos disponibles,  y obviamente si no tiene instalado docker el comando anteriormente mencionado no funcionará.

[Documentación de Docker]('https://docs.docker.com/)

[Página principal de Docker]('https://www.docker.com)

Nota: Los comandos necesarios para el despliegue se encuentran en 2 archivos, el archivo Dockerfile y el archivo docker-compose.yml

Estos archivos son los responsables de la creación de los contenedores e imagenes.  Fueron realizados desde un sistema operativo Windows 10, por lo que si desea desplegar la app desde otro sistema operativo verificar las siguientes lineas:
```
Dockerfile

FROM nginx:latest
COPY //dist//stock-angular//. /usr/share/nginx/html 
     ------------------------

docker-compose.yml
version: "3.7"
services:
  webapp:
    ports:
      - '8080:80'
    build:
      context: .
      dockerfile: Dockerfile
```
Verificar:  La existencia de la carpeta /dist  esta carpeta se crea cuando ejecutamos 'npm run build', luego por ejemplo en linux las carpetas no llevan la doble barra por lo que deberá reemplazar // por una unica barra '/', en otros sistemas operativos puede cambiar notablemente por lo que deberá recurrir a la documentación de docker y de su sistema operativo.

### Importante:

Cuando se abre un servidor de desarrollo en la máquina local puede que de algun tipo de advertencia desde el firewall, verifique el mensaje y decida en consecuencia.  Siempre necesitará un puerto disponible para la escucha de la app. 

### 03/09/2019 Cambios al docker-compose.yml

Se implementa la opción de crear un volumen en el disco local conectando el contenedor con la app, esto hace que una vez hecho el build de la aplicacion se pueda desplegar el
contenedor directamente pudiendo hacer cambios en tiempo real (mediante la rebuild de la app) sin necesidad de crear otro contenedor o realizar el procedimiento anterior.


Para consultas, reporte de errores o bien si desea unirse al proyecto puede:

[Comunicarse con desarrollo](mailto:marcelo.lavandeira@gmail.com)	

&copy; 2019 SystemsWest Argentina

Buenos Aires, República Argentina
