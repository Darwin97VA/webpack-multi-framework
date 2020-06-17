import CustomTitle from './src/CustomTitle'

class CustomTitleComponente extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement('span');
        this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    
        const name = this.getAttribute('name');
        
        ReactDOM.render(<CustomTitle href={name} />, mountPoint);
    }
}

customElements.define('custom-title', CustomTitleComponente);