import React from 'react';
import logo from '../../assets/hand-drawn-clothing-store-logo-design_23-2149577874.avif';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <span>
            <Link to='/'>
            <div className='flex items-center'>
                <img className='w-20 bg-white' src={logo} alt="Plabon Logo" />
                <h1 className='text-xl -ml-3 text-gray-600 font-bold'>Plabon</h1>
            </div>
        </Link>
        </span>
    );
};

export default Logo;
