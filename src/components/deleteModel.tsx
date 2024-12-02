import React from 'react';

interface DeleteModalProps {
    show: boolean;
    handleClose: () => void;
    handleDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, handleClose, handleDelete }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white text-black rounded-lg shadow-lg w-1/3">
                <div className="flex justify-between items-center p-4 border-b">
                    <h5 className="text-lg font-semibold">Delete</h5>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <div className="p-4">
                    Are you sure you want to delete?
                </div>
                <div className="flex justify-end p-4 border-t">
                    <button onClick={handleClose} className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mr-2">
                        Cancel
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;