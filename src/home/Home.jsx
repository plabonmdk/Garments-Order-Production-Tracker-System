import React from 'react';
import Banner from './banner/Banner';
import Brands from './brands/Brands';
import Reviews from './reviews/Reviews';
import Product from './Product/Product';




const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Product></Product>
           <Reviews></Reviews>
           <Brands></Brands>
           
        </div>
    );
};

export default Home;