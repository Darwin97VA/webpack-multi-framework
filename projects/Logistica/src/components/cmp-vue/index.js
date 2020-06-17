import Vue from 'vue'
import Component from './component.vue'
import style from './style'

// Pendiente:
//   - Mejor uso del CSS en Vue
//   - Enviar propiedades al componente de Vue desde 
//     afuera, en este caso, dentro del web-component.


// En este caso se está insertando los estilos aparte  
// porque el loader de webpack que maneja CSS lo extrae y 
// lo pone afuera y por lo tanto será reconocido como
// CSS global, CSS que no afecta dentro del 
// shadowDOM del web component. 

// Si se puede configurar para que el CSS de vue
// se quede dentro de su componente y no sea extraido por 
// el loader mencionado entonces ya no será necesario 
// el uso actual de la importación del style.  

class CustomTitle extends HTMLElement {
    constructor() {
        super()
        this.mountPoint = document.createElement('span')
        this.root = this.attachShadow({ mode: 'open' })
        this.styleTag = style.cloneNode(true)
        this.root.appendChild(this.styleTag)
        this.root.appendChild(this.mountPoint)
    }
    static get observedAttributes() { 
        return ['title']
    }
    connectedCallback() {
        const title = this.getAttribute('title')
        this.instanceVue = new Vue({
            render: h => h(Component)
        })
        this.instanceVue.$mount(this.mountPoint)
    }
    attributeChangedCallback(property, oldValue, newValue) {
        switch(property) {
            case "title":
                // Aquí se debe enviar la propiedad actualizada 
                // hacia dentro del componente de Vue
                console.log(this.instanceVue, newValue)
        }
    }
}

customElements.define('custom-title', CustomTitle)