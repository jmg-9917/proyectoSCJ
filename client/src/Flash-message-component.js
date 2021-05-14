import React from 'react';
import GenerateAlert from './GenerateAlert';
function ShowAlert(success, typeOfOp) {
    if (success) {
        switch (typeOfOp) {
            case 'evento':
                return (
                    GenerateAlert('Evento registrado', 'Se registro correctamente', true)

                )
            case 'integrante':
                return (
                    GenerateAlert('Integrante registrado', 'Se registro correctamente', true)
                )
            case 'junta':
                return (
                    GenerateAlert('Junta registrada', 'Se registro correctamente', true)

                )
            case 'login':
                return (
                    GenerateAlert('Bienvenido', 'Ingreso correctamente', true)

                )

            default:
                return (
                    GenerateAlert('Error presente', 'Algo salio mal', true)

                )
        }
    }
    else {
        switch (typeOfOp) {
            case 'evento':
                return (
                    GenerateAlert('Evento no registrado', 'No se pudo registro correctamente', false)

                )
            case 'integrante':
                return (
                    GenerateAlert('No se registro correctamente', 'Integrante no registrado', false)

                )
            case 'junta':
                return (
                    GenerateAlert('Junta no registrada', 'No se registro correctamente', false)

                )
            case 'login':
                return (
                    GenerateAlert('Intento de log in fallido.', 'No pudo ingresar. Intentelo de nuevo.', false)

                )

            default:
                return (
                    GenerateAlert('Error presente', 'Algo salio mal', false)

                )
        }

    }
}

export default ShowAlert;
