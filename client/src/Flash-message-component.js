import React, {useState} from 'react';
import GenerateAlert from './GenerateAlert';
function ShowAlert(success, typeOfOp) {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    if (success) {
        switch (typeOfOp) {
            case 'evento':
                setMessage('Se registro correctamente')
                setTitle('Evento registrado')
                GenerateAlert(title, message, true)
                break;
            case 'integrante':
                setMessage('Se registro correctamente')
                setTitle('Integrante registrado')
                GenerateAlert(title, message, true)
                break;
            case 'junta':
                setMessage('Se registro correctamente')
                setTitle('Junta registrada')
                GenerateAlert(title, message, true)
                break;
            case 'login':
                setMessage('Ingreso correctamente')
                setTitle('Bienvenido')
                GenerateAlert(title, message, true)

                break;
            default:
                setMessage('Algo salio mal')
                setTitle('Error presente')
                GenerateAlert(title, message, false)
        }
    }
    else {
        switch (typeOfOp) {
            case 'evento':
                setMessage('No se pudo registro correctamente')
                setTitle('Evento no registrado')
                GenerateAlert(title, message, false)
                break;
            case 'integrante':
                setMessage('No se registro correctamente')
                setTitle('Integrante no registrado')
                GenerateAlert(title, message, false)
                break;
            case 'junta':
                setMessage('No se registro correctamente')
                setTitle('Junta no registrada')
                GenerateAlert(title, message, false)
                break;
            case 'login':
                setMessage('No pudo ingresar. Intentelo de nuevo.')
                setTitle('Intento de log in fallido.')
                GenerateAlert(title, message, false)

                break;
            default:
                setMessage('Algo salio mal')
                setTitle('Error presente')
                GenerateAlert(title, message, false)
        }

    }
}

export default ShowAlert;
