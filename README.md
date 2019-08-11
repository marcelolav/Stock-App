# Detalles para la instalacion:

1) Crear carpeta dentro de src/environments y dentro de ella crear los archivos para configuracion del proyecto:

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
Los xxxx son los datos de su propio firestore o firebase.

3) Instale las dependencias:

``` 
npm install 
```
4) Luego de esto ya se encuentra en posicion de abrir un servidor de desarrollo para testear el producto:

``` npm start ``` 
o bien 
``` ng serve -open ```

Esto creará un servidor en la dirección localhost,  verifique los mensajes en pantalla para saber en que dirección y puerto se alojó la aplicacion.  

### Importante:

Cuando se abre un servidor de desarrollo en la máquina local puede que de algun tipo de advertencia desde el firewall, verifique el mensaje y decida en consecuencia.  Siempre necesitará un puerto disponible para la escucha de la app. 

Para consultas, reporte de errores o bien si desea unirse al proyecto puede:

[Comunicarse con desarrollo](mailto:marcelo.lavandeira@gmail.com)	

10/08/2019 Buenos Aires, República Argentina
