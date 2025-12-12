import React from 'react';
import reviewQuote from "../../assets/banner2.jpg";

const Reviews = ({ review }) => {
    const { userName, review: reviewNew, user_photoURL } = review;

    return (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-200">
            <div className="mb-4">
                <img src={reviewQuote} alt="Quote" className="w-10 opacity-70" />
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
                {reviewNew}
            </p>

            <div className="border-t border-dashed border-gray-300 my-6"></div>

            <div className="flex items-center gap-4">
                <img
                    src={user_photoURL}
                    alt={userName}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200"
                />

                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
                    <p className="text-sm text-gray-500">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
