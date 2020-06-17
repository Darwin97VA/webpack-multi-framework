import React from 'react'

export default props => {
    const { name } = props
    const href = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    return (
        <h1>
            <a href={href} > { name } </a>
        </h1>
    )
}