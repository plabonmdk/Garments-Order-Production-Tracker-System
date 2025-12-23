import React from 'react';
import Banner from './banner/Banner';
import Brands from './brands/Brands';
import Reviews from './reviews/Reviews';




const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Reviews></Reviews>
           <Brands></Brands>
           
        </div>
    );
};

export default Home;