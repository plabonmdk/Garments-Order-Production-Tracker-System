import React from 'react';
import Banner from './banner/Banner';
import Brands from './brands/Brands';
import Reviews from './reviews/Reviews';
import Product from './Product/Product';
import Works from './Works/Works';




const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Product></Product>
           <Reviews></Reviews>
           <Brands></Brands>
           <Works></Works>
           
        </div>
    );
};

export default Home;