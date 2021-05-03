import React from 'react';
import { Link } from 'react-router-dom';
function Presentation() {
    return (
        <div>
            <Link to="/login">
                <li>Log In</li>
            </Link>
            <h1>Hola, ingresa para comenzar</h1>
        </div>
    )
}

export default Presentation;
