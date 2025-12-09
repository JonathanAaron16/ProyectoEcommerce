# Glosario de terminos

## Conceptos fundamentales

- Un **endpoint** es una URL especifica a la que una aplicacion cliente envia una solicitud para acceder a una funcionalidad o recurso particular ofrecido por una API del servidor, actuando como el punto final (end point) de una conexion API

- Una **ruta** se refiere a la estructura de la URL que determina como se procesa una solicitud, la ruta define la direccion a la que se envia la solicitud, mientras que el endpoint es la UBICACION EXACTA donde se procesa esa solicitud

- Una **API Rest** es el conjunto de reglas y funciones que nos permite hacer un puente para conectar dos aplicaciones. Le decimos REST, que es un tipo de API, porque se basa en el protocolo HTTP y usa JSON


---


## Diferencia entre REST y RESTful

REST (Representational State Transfer) es un estilo de arquitectura de software que se basa en los principios del protocolo HTTP para facilitar la comunicación entre sistemas, especialmente en entornos de red como Internet Este enfoque define cómo deben diseñarse los servicios web para que sean escalables, independientes y eficientes, con características clave como la separación entre cliente y servidor, la ausencia de estado en las solicitudes y el uso de recursos identificados por URI

Por otro lado, RESTful se refiere a un servicio web o API que implementa efectivamente los principios y restricciones de la arquitectura REST En otras palabras, una API RESTful es una implementación concreta que sigue las reglas de REST, como el uso adecuado de los métodos HTTP (GET, POST, PUT, DELETE) para manipular recursos, la representación de estos recursos mediante formatos como JSON o XML, y la comunicación sin estado Aunque a menudo se usan como sinónimos, REST es el concepto teórico o arquitectónico, mientras que RESTful describe la realización práctica de ese concepto

En resumen, REST es la arquitectura, y RESTful es la aplicación de esa arquitectura en servicios reales Una API REST se refiere al estándar o interfaz definida por estos principios, mientras que un servicio web RESTful es la implementación que cumple con esos estándares, por ejemplo, utilizando métodos HTTP apropiados y recursos bien definidos


---

## Que es el middleware `Router`?

En Express.js, un Router es una instancia aislada de middleware y rutas que se comporta como una miniaplicación independiente, también conocida como una "miniapp"  **Permite crear manejadores de rutas montables y modulares, facilitando la organización y estructuración del código, especialmente en aplicaciones grandes y complejas**  

**Al igual que la instancia principal de Express (app), un Router puede utilizar métodos como `get`, `post`, `put`, `delete`, y otros para definir rutas HTTP específicas**  Además, puede incluir middleware personalizado, manejar parámetros de ruta mediante `router.param()`, y utilizar `router.route()` para definir múltiples métodos HTTP en una sola ruta, evitando errores de escritura 

**El Router se crea con `express.Router()` y puede ser montado en una aplicación principal mediante `app.use()` con un prefijo de ruta**, lo que permite agrupar rutas relacionadas bajo un mismo camino, como `/usuarios` o `/wiki`  Esto mejora la modularidad, la reutilización del código y la separación de responsabilidades  Las funciones de middleware definidas en un Router solo se ejecutan para las rutas que pertenecen a ese Router, y no se heredan a aplicaciones o routers secundarios  El orden de los middleware y rutas dentro del Router es crucial, ya que se ejecutan secuencialmente de arriba hacia abajo 


#### Y por que se considera una mini aplicacion?

Express Router se considera una «mini aplicación» porque es una instancia aislada de middleware y funcionalidad de enrutamiento, capaz de manejar tanto el middleware como las definiciones de rutas de forma independiente.  Funciona como un sistema autónomo que se puede montar dentro de una aplicación Express más grande, lo que permite a los desarrolladores modularizar las rutas y el middleware en archivos o componentes separados.  Este diseño modular permite la creación de controladores de rutas reutilizables, como los destinados a funciones específicas, como la gestión de usuarios o los servicios de calendario, que pueden integrarse fácilmente en la aplicación principal mediante app.use().  Dado que un enrutador se comporta como un middleware en sí mismo, puede utilizarse como argumento en app.use() o dentro de otros enrutadores, lo que refuerza aún más su función como miniaplicación independiente. 


---


### [Importancia de las validaciones en el form, javascript y en el servidor](https://pbs.twimg.com/media/DpvnESsVsAA2kdv.jpg)

### [Meme 2](https://www.google.com/imgres?q=meme%20cybersecurity%20door&imgurl=https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FFKeyAdrWQAEmVTG.jpg&imgrefurl=https%3A%2F%2Fx.com%2FSecctrl2%2Fstatus%2F1488353924566421508&docid=GQhtkEuNBQ07GM&tbnid=h2PwhzKM3CiYQM&vet=12ahUKEwjf--G37-yQAxWmBrkGHYQRG2gQM3oECDwQAA..i&w=1080&h=1065&hcb=2&ved=2ahUKEwjf--G37-yQAxWmBrkGHYQRG2gQM3oECDwQAA&authuser=3)

---


## Como se envian los datos de los formularios en html?
Tipos de Datos en Formularios HTML

Los formularios HTML envían datos en pares nombre/valor cuando se envían al servidor Estos datos pueden incluir texto, contraseñas, fechas, números, selecciones de opciones, archivos adjuntos, entre otros, dependiendo del tipo de control de formulario utilizado El tipo de datos enviado depende del atributo `type` de los elementos dentro del formulario, como `text`, `password`, `email`, `number`, `date`, `checkbox`, `radio`, `file`, entre otros

El formato de codificación de los datos se define mediante el atributo `enctype` del elemento `form` **Por defecto, los formularios se envían con el formato `application/x-www-form-urlencoded`**, que sustituye espacios por `+` y convierte caracteres especiales en secuencias de escape, separando los pares nombre/valor con `=` y las combinaciones con `&` Este formato es adecuado para datos pequeños y no confidenciales, especialmente cuando se usa el método `GET`

Para formularios que incluyen imágenes o grandes volúmenes de información, se debe utilizar el tipo `multipart/form-data`, que envía los datos en partes separadas conocidas como `form-data` Este formato es necesario cuando se usa el atributo `type="file"` en un campo de entrada

El método de envío, especificado con el atributo `method` en el elemento `form`, puede ser `GET` o `POST` Con `GET`, los datos se incluyen en la URL, lo que los hace visibles y limita la cantidad de datos que se pueden enviar Con `POST`, los datos se envían en el cuerpo de la solicitud HTTP, lo que los hace más seguros, especialmente para datos sensibles


## Y como recibimos en Express los datos de un `<form>`?
**Este middleware analiza los cuerpos de las solicitudes entrantes con el tipo de contenido `application/x-www-form-urlencoded` y hace que los datos analizados estén disponibles en `req.body`**. 

Para un uso básico, añada el middleware a su aplicación Express:

```javascript
const express = require(“express”);
const app = express();

// Analizar datos de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));
```


---


Parse URL Encoded Data in Express

To parse URL-encoded form data in Express.js, use the built-in `express.urlencoded()` middleware. This middleware parses incoming request bodies with the `application/x-www-form-urlencoded` content type and makes the parsed data available in `req.body` 

For basic usage, add the middleware to your Express application:

```javascript
const express = require('express');
const app = express();

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
```

The `extended: true` option enables parsing of nested objects and arrays using the `qs` library, while `extended: false` limits parsing to simple key-value pairs The middleware should be placed before defining routes that need to access the form data

For Express versions 4.16 and later, `express.urlencoded()` is included by default and does not require the separate `body-parser` package This middleware processes form data sent via POST requests with the `application/x-www-form-urlencoded` MIME type, converting it into a JavaScript object accessible through `req.body`

Example route handling parsed form data:

```javascript
app.post('/', (req, res) => {
  const formData = req.body; // Parsed form data is available here
  console.log(formData);
  res.send('Form submitted successfully');
});
```

This approach is the standard and recommended method for handling form submissions in Express.js applications


---


## Que es CORS?

CORS, o Intercambio de Recursos de Origen Cruzado, es un mecanismo de seguridad implementado por los navegadores web que permite a una página web 
solicitar recursos desde un dominio diferente al del origen actual

Este mecanismo se activa cuando una solicitud HTTP se realiza a un recurso 
en un dominio distinto al de la página que la originó, y su propósito principal es proteger a los usuarios de ataques  como el secuestro de sesión o el acceso no autorizado a datos sensibles  CORS funciona mediante la verificación de encabezados HTTP específicos,  como `Access-Control-Allow-Origin`, que el servidor debe incluir en su respuesta para indicar si está autorizado el acceso desde un origen determinado   

Sin este permiso explícito, el navegador bloquea la solicitud para mantener la seguridad de la política del mismo origen


---


## Que es payload?
El término "payload" en el contexto de bases de datos se refiere  a la parte de los datos transmitidos que constituye el mensaje real o la información útil, excluyendo los encabezados, metadatos o información de control necesaria para la entrega del mensaje


---


## Que es `FormData`?
Que es FormData?

En JavaScript, FormData es un objeto que permite crear un conjunto de pares clave-valor que representan los campos de un formulario HTML y sus valores, facilitando su envío a un servidor mediante métodos como fetch o XMLHttpRequest.
Este objeto replica la funcionalidad de un formulario HTML y se utiliza comúnmente para enviar datos de formularios, incluyendo archivos, de manera dinámica sin recargar la página

Este objeto es especialmente útil en aplicaciones modernas que requieren enviar datos de forma asincrónica, ya que simplifica el manejo de formularios, incluyendo campos de texto, casillas de verificación, botones de radio y campos de carga de archivos