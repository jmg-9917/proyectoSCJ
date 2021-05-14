import React from 'react';

const GetFormattedDate = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    const formatted = yyyy + '-' + mm + '-' + dd;
    return formatted
}
export default GetFormattedDate;
