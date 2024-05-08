import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IoCloseSharp } from "react-icons/io5";
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductReviews = ({ productId,numOfReviews }: { productId: string,numOfReviews:number }) => {

    const { user } = useSelector((state: RootState) => state.userReducer);


    const [reviews, setReviews] = useState<{ _id: string; rating: number; comment: string; email: string; name: string; userId: string; }[]>([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);





    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (!productId) return;
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/product/reviews/${productId}`);
                setReviews(response.data.reviews);
                const userReview = response.data.reviews.find((review: any) => review.userId === user?._id);
                setIsReviewed(userReview ? true : false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [productId]);

    const handleCreateReview = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/product/new-reviews/${productId}`, {
                rating,
                comment,
                email: user?.email,
                name: user?.name,
                userId: user?._id,
                productId,
            });
            console.error(' creating submitted:');

        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    const handleDeleteReview = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/product/delete-review?productId=${productId}&id=${user?._id}`);

        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };


    return (
        <div className="container  mx-auto p-4">
            <div className='flex flex-col items-center'>
                <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
                <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4">{isReviewed ? "Edit Review" : "Submit Review"}</button>
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleBackdropClick}>
                    <div className="bg-white w-full animate-modal p-8 rounded-md max-w-md">
                        <div className="flex flex-row justify-between mb-6 items-center">
                            <h2 className="text-xl font-semibold ">{isReviewed ? "Edit Review" : "Submit Review"}</h2>
                            <button onClick={closeModal} className="text-2xl rounded-md "><IoCloseSharp /></button>
                        </div>
                        <form className="space-y-4" onSubmit={handleCreateReview}>
                            <div>
                                <label htmlFor="rating" className="block text-md mb-3 font-medium">Rating</label>
                                <input id="rating" type="number" max={5} className="w-full" placeholder="Rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-md mb-3 font-medium">Comment</label>
                                <textarea id="comment" rows={3} className="w-full" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                        </form>
                    </div>
                </div>
            )}
            <div className='sm:mx-44'>

                <h3 className="text-xl font-semibold mt-8 ">Reviews {numOfReviews}</h3>
                {reviews.length > 0 ? (
                    <ul className="mt-4 ">
                        {reviews.map((review) => (
                            <li key={review._id} className="border pb-4 mb-4 py-3 px-6">
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row'>
                                        <p><strong>{review.name}</strong></p>
                                        <p className='mx-3'>{review.rating}</p>
                                    </div>
                                    <div>
                                        {review.userId === user?._id && (
                                            <>
                                                <button onClick={() => { handleDeleteReview(); location.reload() }} className="px-2 py-1 rounded-md mt-2"><FaTrash /></button>
                                                <button onClick={() => { openModal(); setRating(review.rating); setComment(review.comment) }} className="mx-2 px-2 py-1 rounded-md mt-2"><FaEdit /></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <p> {review.email}</p>
                                <p><strong>Comment:</strong> {review.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews found</p>
                )}
            </div>
        </div>
    );
};

export default ProductReviews;