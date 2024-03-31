import React, { useState } from "react";
import axios from 'axios';

function AddMenuDialog({ toggleDialog }) {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        categoryName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if any required fields are empty
            if (!formData.name || !formData.price || !formData.image || !formData.categoryName) {
                console.error('Please fill out all fields');
                return;
            }

            // Check if the image URL is valid
            if (!isValidURL(formData.image)) {
                console.error('Please provide a valid image URL');
                return;
            }

            // Send the data to the server
            const response = await axios.post('https://localhost:7279/api/Menus', formData);
            console.log(response.data);

            // Reload the page after successfully adding the menu
            window.location.reload();
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };



    // Function to check if a string is a valid URL
    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box bg-white">
                    <form onSubmit={handleSubmit}>
                        <button onClick={toggleDialog} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <h3 className="font-bold text-lg">Hello!</h3>

                        <label htmlFor="name" className="relative block mt-4 rounded-md border text-lg border-gray-200 shadow-sm focus-within:border-white-600 focus-within:ring-1 focus-within:ring-white-600">
                            <input type="text" id="name" className="peer text-black ml-6 text-sm border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0" placeholder="Name" onChange={handleChange} />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Name</span>
                            {!formData.name && <p className="text-red-500 text-xs mt-1">Please enter a name</p>}
                        </label>

                        <label htmlFor="price" className="relative block mt-4 rounded-md border text-lg border-gray-200 shadow-sm focus-within:border-white-600 focus-within:ring-1 focus-within:ring-white-600">
                            <input type="text" id="price" className="peer text-black ml-6 text-sm border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0" placeholder="Price" onChange={handleChange} />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Price</span>
                            {!formData.price && <p className="text-red-500 text-xs mt-1">Please enter a price</p>}
                        </label>

                        <label htmlFor="image" className="relative block mt-4 rounded-md border text-lg border-gray-200 shadow-sm focus-within:border-white-600 focus-within:ring-1 focus-within:ring-white-600">
                            <input type="url" id="image" className="peer text-black ml-6 text-sm border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0" placeholder="Image URL" onChange={handleChange} />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Image URL</span>
                            {!formData.image && <p className="text-red-500 text-xs mt-1">Please enter a valid image URL</p>}
                        </label>

                        <label htmlFor="categoryName" className="relative block mt-4 rounded-md border text-lg border-gray-200 shadow-sm focus-within:border-white-600 focus-within:ring-1 focus-within:ring-white-600">
                            <input type="text" id="categoryName" className="peer text-black ml-6 text-sm border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0" placeholder="Category" onChange={handleChange} />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">Category</span>
                            {!formData.categoryName && <p className="text-red-500 text-xs mt-1">Please enter a category</p>}
                        </label>
                        <div className="flex justify-center mt-6">
                            <button type="submit" className="btn btn-wide bg-orange-400 text-white">ADD MENU</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default AddMenuDialog;
