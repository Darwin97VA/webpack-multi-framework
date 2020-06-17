# webpack-multi-framework
 Paquete de desarrollo para proyectos en el que se implementará componentes de distintos frameworks.


INICIAR LA APLICACIÓN ASÍ

Cada comando definido en package.json necesita una palabra adicional al final que es el nombre del proyecto a ejecutar. (por el momento sólo funciona Logistica)

Ejm:
"npm start Logistica"
"npm run build Logistica"


CONSIDERACIONES

1. Para el desarrollo se desea la mínima implementación adicional a cada componente de cada framework para poder ser usado desde cualquier otra parte. Por eso la primera opción es usar web-components para envolver cada uno, pero si hay otra mejor forma con menos implementación adicional (en este caso envolviendo en un web-component) entonces se recomienda dicho uso. 

2. En cada framework la comunicación entre componentes es muy sencilla usando sus respectivas API's; sin embargo, la comunicación entre web-components con vanilla JS es más difícil porque implica una referencia directa a dicho componente. En este caso la web de [MicroFrontend](https://micro-frontends-es.org/) menciona una forma que puede ser usado muy bien para resolver este problema: Pub-sub. Significa que si el componente quiere recibir datos desde cualquier parte entonces debo hacer algo como esto:
``
window.addEventListener('event-message-data-xyz', fn)"
``
para poder recibirlo.

Para enviar data a cualquier otro componente o parte de la aplicación hacer algo como esto:

``
const eventoConData = new CustomEvent('nombre:de:evento', {
    bubbles: true,
    detail: {
        data: 'Cualquier data dentro de detail'
    }
}));
this.dispatchEvent(eventoConData);
``