import React from 'react'
import ReactDOM from 'react-dom'
import img from './assets/images/image.png'
import './assets/all'

const root = document.getElementById('root')

const App = () => <div className="titulo">
    <h1>Hola mundo desde React!</h1>
    <img src={img} alt=""/>
</div>

ReactDOM.render(<App/>, root)