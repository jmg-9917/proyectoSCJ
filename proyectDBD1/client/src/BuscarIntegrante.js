import React, {useState} from 'react';
import Axios from 'axios';

function BuscarIntegrante() {

    const [nombre, setNombre] = useState("");
    return (
        <div>
            <h1>Buscar integrante</h1>
            <div className="information">
                <label>Nombre:</label>
                <input
                    type="text"
                    onChange={(event) => {
                        setNombre(event.target.value)

                    }}
                />
                <button>Continuar</button>
            </div>
        </div>
    )
}
export default BuscarIntegrante;
