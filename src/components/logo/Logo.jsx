import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <>
            <Link to='/'>
            <div className='flex items-center'>
                <img className='w-20 ' src={logo} alt="Plabon Logo" />
                <h1 className='text-[10px] -ml-10 mt-7 text-gray-600 font-bold'>Plabon</h1>
            </div>
        </Link>
        </>
    );
};

export default Logo;
