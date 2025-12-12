import React from 'react';
import Banner from './banner/Banner';
import Brands from './brands/Brands';
import Reviews from './reviews/Reviews';


// const reviewsPromise = fetch("/reviews.json").then(res => res.json())

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Brands></Brands>
           {/* <Reviews reviewsPromise={reviewsPromise}></Reviews> */}
        </div>
    );
};

export default Home;