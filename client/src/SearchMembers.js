import React from 'react';

function MemberList({results}) {
    let data = [];
    if (results.data) {
        console.log(results);
        data = results.data
    }
}
