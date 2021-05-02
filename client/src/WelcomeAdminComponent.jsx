import './App.css';
import {useState} from 'react';
import Axios from 'axios'
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Snackbar, Alert, TextField, Button, RadioGroup, FormControlLabel, Radio} from '@material-ui/core'

const WelcomeAdminComponent = () => {
    return (
        <div>
            <Link to="/registerMember">
                <li>Registrar Miembro</li>
            </Link>
            <Link to="/registerMeeting">
                <li>Registrar una junta</li>
            </Link>
            <Link to="/registerEvent">
                <li>Registrar un evento</li>
            </Link>
        </div>
    )

}

export default WelcomeAdminComponent;

