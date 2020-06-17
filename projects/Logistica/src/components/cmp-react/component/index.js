import React, { useRef, useState } from 'react'
import img from './../../../assets/images/image.png'

export default ({name = ''}) => {
    const el = useRef(null)
    const [value, setValue] = useState('')

    const _handleChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className="titulo" ref={el}>
            <h1>
                <a href={'https://www.google.com/search?q=' 
                            + encodeURIComponent(name)}>
                    { name || 'Hola mundo desde React!' }
                </a>
            </h1>
            <input type="text" onChange={_handleChange} value={value}/>
            <img src={img} alt=""/>
        </div>
    )
}