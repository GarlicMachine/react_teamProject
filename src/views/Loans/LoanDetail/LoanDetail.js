import axios from 'axios'
import React from 'react'

async function getLoanList({d_Key}) {
    console.log('getLoanList_1')
    const response = await axios.get(
        '/Loans/LoanList/${d_Key}'
    );
    console.log('getLoanList_2')
    return response.data;
}

export default LoanDetail