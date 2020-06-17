import React from 'react'
import ReactDOM from 'react-dom'
import Component from './component'

class XSearch extends HTMLElement {
    constructor() {
        super()
        this.mountPoint = document.createElement('span')
        this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint)
    }
    static get observedAttributes() { 
        return ['name']
    }
    connectedCallback() {
        const name = this.getAttribute('name')
        ReactDOM.render(<Component name={name}/>, this.mountPoint)
    }
    get texto() {
        return this.mountPoint.querySelector('input').value
    }
    attributeChangedCallback(property, oldValue, newValue) {
        switch(property) {
            case "name":
                ReactDOM.render(<Component name={newValue}/>, this.mountPoint)
        }
    }
}

customElements.define('x-search', XSearch)