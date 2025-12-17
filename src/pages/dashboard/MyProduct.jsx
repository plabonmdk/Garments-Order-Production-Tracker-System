import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyProduct = () => {


    const {user} = useAuth()

    const axiosSecure = useAxiosSecure()

    const {data: products = []} = useQuery({
        queryKey: ['myProduct' , user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/products?email=${user.email}`)
            return res.data
        }
    })

    return (
        <div>
            my product : {products.length}
        </div>
    );
};

export default MyProduct;