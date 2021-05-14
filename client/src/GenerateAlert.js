import React from 'react';
import {Alert} from '@material-ui/lab';
import {AlertTitle} from '@material-ui/lab';
function GenerateAlert(title, text, success) {
    if (success) {
        return (
            <Alert severity="success">
                <AlertTitle>{title}</AlertTitle>
                {text}
            </Alert>
        )
    }
    else {
        return (
            <Alert severity="error">
                <AlertTitle>{title}</AlertTitle>
                {text}
            </Alert>
        )

    }
}

export default GenerateAlert;
