import React, { useEffect, useState } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import Reviews from './Reviews';
import img from "../../../assets/customer-top.png";

const ReviewsCard = ({ reviewsPromise }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        reviewsPromise.then((data) => setReviews(data));
    }, [reviewsPromise]);

    return (
        <div className="py-16 bg-gray-50">

            <div className="text-center max-w-2xl mx-auto px-4 mb-10">
                <img src={img} alt="" className="w-100 mx-auto mb-4" />

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    What our customers are saying
                </h1>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {reviews.map((review) => (
                        <SwiperSlide key={review.id} className="max-w-xs">
                            <Reviews review={review} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
};

export default ReviewsCard;
