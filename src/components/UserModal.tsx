import React, { useState } from 'react';
import { User } from "../types/types";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import CopyText from '../utils/function';

interface UserModalType {
    user: User;
    logoutHandler?: () => void,
    heading?: any,
    children?: React.ReactNode
}

const UserModal = ({ user, logoutHandler, heading, children }: UserModalType) => {

    const { user: currentUser } = useSelector((state: RootState) => state.userReducer);

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <button onClick={openModal} className="focus:outline-none ">
                {heading ? (
                    <span className="text-blue-500">{heading}</span>
                ) : (
                    <img src={user?.photo} alt="User" className="w-7 h-7 rounded-full" />
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-20 flex justify-center items-center bg-black bg-opacity-50 " onClick={handleBackdropClick}>
                    <div className="bg-white p-4 rounded-lg shadow-lg animate-modal mx-3">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">User Details</h3>
                            <img src={user?.photo} alt="User" className="w-7 h-7 rounded-full" />
                            <div className="grid grid-cols-2 gap-2">

                                <span className="font-semibold">Name:</span>
                                <span>{user.name}</span>
                                <span className="font-semibold">Gender:</span>
                                <span>{user.gender}</span>
                                <span className="font-semibold">Email:</span>
                                <span className='truncate'>{user.email}</span>
                                <span className="font-semibold">Role:</span>
                                <span>{user.role}</span>
                                <span className="font-semibold">Phone:</span>
                                <span>{user.phone}</span>
                                <span className="font-semibold">DOB:</span>
                                <span>{user.dob.toString().split('T')[0]}</span>
                                {currentUser?.role === "admin" && (<> <span className="font-semibold ">ID:</span>
                                    <div className="truncate"><CopyText text={user._id} /></div>
                                </>)}
                            </div>
                        </div>
                        <div className='flex items-center justify-between '>
                             <div onClick={closeModal} className="mt-4 cursor-pointer bg-indigo-500 w-[4.5rem] text-white px-4 py-1 rounded hover:bg-indigo-600 focus:outline-none">Close</div>
                            {logoutHandler && (
                                <button onClick={logoutHandler} className="mt-4 cursor-pointer bg-red-500 w-[4.9rem] text-white py-1 rounded hover:bg-red-600 focus:outline-none">
                                    Logout
                                </button>
                            )}
                        </div>
                        {children}
                    </div>
                </div>
            )} 
        </>
    );
};

export default UserModal;


