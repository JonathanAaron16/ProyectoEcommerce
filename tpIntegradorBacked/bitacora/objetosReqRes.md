## Objetos req y res en Express

**En Express.js, `req` (request) y `res` (response) son objetos fundamentales que representan la solicitud HTTP entrante y la respuesta HTTP saliente, respectivamente** 

#### Objeto `req`
El objeto `req` contiene toda la información sobre la solicitud realizada por el cliente, como el método HTTP (GET, POST, etc.), la URL, los parámetros de la ruta (params), los parámetros de consulta (query), los encabezados (headers), y el cuerpo (body) de la solicitud 
- Por ejemplo, `req.params` permite acceder a los parámetros definidos en la ruta, como en `/user/:id`, donde `req.params.id` contiene el valor del ID 
- Asimismo, `req.query` proporciona acceso a los parámetros de la cadena de consulta, como en `/people.json?foo=bar`, donde `req.query.foo` sería "bar" 
- El cuerpo de la solicitud, disponible en `req.body`, se utiliza comúnmente para recibir datos enviados en peticiones POST o PUT, aunque requiere middleware como `express.json()` para ser procesado correctamente

#### Objeto `res`
Por otro lado, el objeto `res` se utiliza para construir y enviar la respuesta al cliente 
Permite establecer el código de estado HTTP con `res.status()`, enviar encabezados con `res.setHeader()`, y enviar el cuerpo de la respuesta mediante métodos como `res.send()` para enviar texto, HTML o datos JSON, `res.json()` para enviar datos en formato JSON, o `res.sendFile()` para enviar un archivo Por ejemplo, `res.send('Hola')` envía una respuesta de texto simple, mientras que `res.json({ mensaje: 'Éxito' })` envía un objeto JSON con el encabezado adecuado Es importante destacar que los nombres `req` y `res` son convencionales, pero pueden cambiarse a cualquier nombre, como `request` y `response`, sin afectar el funcionamiento del código

Ambos objetos están disponibles como parámetros en las funciones de manejo de rutas (handlers) de Express, donde `req` es el primer parámetro y `res` el segundo La interacción entre estos objetos permite que una aplicación web procese solicitudes y devuelva respuestas de forma eficiente y estructurada