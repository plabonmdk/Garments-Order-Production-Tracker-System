import React from 'react';
import Logo from '../components/logo/Logo';
import { Outlet } from 'react-router';
import login from '../assets/login bg.avif';

const AuthLayout = () => {
    return (
        <div className="min-h-screen max-w-7xl mx-auto">
            
            {/* Logo section (NO background image) */}
            <div className="max-w-7xl mx-auto px-4 py-6 bg-white">
                <Logo />
            </div>

            {/* Background image section */}
            <div
                className="min-h-[calc(100vh-96px)] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${login})` }}
            >
                {/* overlay */}
                <div className="min-h-[calc(100vh-96px)] bg-black/40 flex items-center justify-center">
                    
                    {/* Form / Auth content */}
                    <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
