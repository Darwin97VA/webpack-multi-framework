import Vue from 'vue'
import Component from './component.vue'
import style from './style'

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
            render: h => h({...Component, props: { title } } )
        })
        this.instanceVue.$mount(this.mountPoint)
    }
    attributeChangedCallback(property, oldValue, newValue) {
        switch(property) {
            case "title":
                console.log(this.instanceVue, newValue)
        }
    }
}

customElements.define('custom-title', CustomTitle)