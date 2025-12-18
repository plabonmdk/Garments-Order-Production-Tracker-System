import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-4xl'>payment is Cancelled . please try again</h2>
            <Link to={'/dashboard/my-products'}> 
            <button className='btn btn-primary text-black'>Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;