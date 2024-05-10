import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import StarRatings from '../StarsRatings';

const AllReviews = ({ productId }: { productId: string }) => {


    const [reviews, setReviews] = useState<{ _id: string; date: number; rating: number; comment: string; email: string; name: string; userId: string; }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true)
                if (!productId) return;
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/product/reviews/${productId}`);
                setReviews(response.data.reviews);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching reviews:', error);
                setError(`Wrong Product - Id/Error fetching reviews See logs More Details. ${error}`);
            }
        };

        fetchReviews();
    }, [productId]);


    const calculateTimeDifference = (reviewDate: number) => {
        const currentDate = new Date().getTime();
        const reviewDateTime = new Date(reviewDate).getTime();
        const difference = currentDate - reviewDateTime;

        // Calculate time difference in minutes
        const minutesDifference = Math.floor(difference / (1000 * 60));

        // If difference is less than 60 minutes, show in minutes
        if (minutesDifference < 60) {
            return `${minutesDifference} minutes ago`;
        }

        // If difference is less than 24 hours, show in hours
        const hoursDifference = Math.floor(minutesDifference / 60);
        if (hoursDifference < 24) {
            return `${hoursDifference} hours ago`;
        }

        // Otherwise, show in days
        const daysDifference = Math.floor(hoursDifference / 24);
        return `${daysDifference} days ago`;
    }

    return (
        <div className="container  mx-auto p-4">

            <div className='md:mx-24'>
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[15.4rem]">
                        {error !== "" ? <p className='text-3xl font-semibold text-red-400 mt-12'>{error}</p> : <FaSpinner className="animate-spin h-24 w-24 text-gray-500" />}
                    </div>
                ) : (reviews.length > 0 ? (
                    <ul className="mt-4 ">
                        {reviews.map((review) => (
                            <li key={review._id} className="border pb-4 mb-4 py-3 px-6">
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row items-center gap-3'>
                                        <p><strong>{review.name}</strong></p>
                                        <span className=" text-lg">
                                            <StarRatings rating={review.rating} />
                                        </span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-[0.5rem] xsm:text-[0.7rem] sm:text-sm font-semibold'>{calculateTimeDifference(review.date)}</p>
                                    </div>
                                </div>
                                <p className='text-[0.7rem] sm:text-sm'> {review.email}</p>
                                <p><strong>Comment:</strong> {review.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews Yet</p>
                ))}
            </div>
        </div>
    );
};

export default AllReviews;