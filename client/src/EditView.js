import React from 'react';
import Axios from 'axios';
import {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
function EditView() {
    return (
        <div>
            <h1>Algo no está bien? Edita lo que necesites.</h1>
            <Link className="nav-links" to="/registerDashboard/alterItems/alterEvents">
                <li >Editar eventos</li>
            </Link>
            <Link className="nav-links" to="/registerDashboard/alterItems/alterMembers">
                <li >Editar miembros</li>
            </Link>

        </div>


    )


}

export default EditView;


