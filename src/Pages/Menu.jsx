//Menu.jsx

import React, { useState, useEffect } from "react";
import './CSS/Menu.css';
import AddMenuDialog from "./AddMenuDialog";
import EditMenuDialog from "./EditMenuDialog";

function Menu() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const userProfileData = localStorage.getItem('userProfile');
        if (userProfileData) {
            setUserProfile(JSON.parse(userProfileData));
        }
    }, []);

    useEffect(() => {
        if (userProfile) {
            console.log(userProfile.roll);
        }
    }, [userProfile]);



    useEffect(() => {
        setLoading(true);
        fetch("https://localhost:7279/api/Menus")
            .then(response => response.json())
            .then(data => {
                setMenus(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching menus:", error);
                setLoading(false);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMenus.length > 0 ? filteredMenus.slice(indexOfFirstItem, indexOfLastItem) : menus.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const filterMenu = (category) => {
        if (category === "all") {
            setFilteredMenus([]);
        } else {
            const filtered = menus.filter(menu => menu.categoryName === category);
            setFilteredMenus(filtered);
        }
    };

    const toggleAddDialog = () => {
        setIsAddDialogOpen(!isAddDialogOpen);
    };

    const toggleEditDialog = () => {
        setIsEditDialogOpen(!isEditDialogOpen);
    };

    const handleEdit = (menu) => {
        setSelectedMenu(menu);
        toggleEditDialog();
    };

    const addToCart = (menu) => {
        const orderData = {
            menuID: menu.menuID,
            name: menu.name,
            price: menu.price,
            image: menu.image,
            categoryName: menu.categoryName,
            quantity: quantities[menu.menuID] || 1 // Adding quantity to order data
        };

        fetch("https://localhost:7279/api/Orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add item to cart");
                }
                // Handle success
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 5000); // Hide message after 5 seconds
                window.location.reload(); // Reload the page
            })
            .catch(error => {
                console.error("Error adding item to cart:", error);
            });
    };

    const handleDelete = (menu) => {
        if (window.confirm("คุณแน่ใจหรือไม่ที่ต้องการลบเมนูนี้?")) {
            fetch(`https://localhost:7279/api/Menus/${menu.menuID}`, {
                method: "DELETE",
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to delete menu");
                    }
                    // Handle success
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide message after 5 seconds
                    window.location.reload(); // Reload the page
                })
                .catch(error => {
                    console.error("Error deleting menu:", error);
                });
        }
    };


    const incrementQuantity = (menuID) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [menuID]: (prevQuantities[menuID] || 0) + 1
        }));
    };

    const decrementQuantity = (menuID) => {
        if (quantities[menuID] > 1) {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [menuID]: prevQuantities[menuID] - 1
            }));
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    const getCategoryBadgeColor = (categoryName) => {
        switch (categoryName) {
            case "ข้าว":
                return "bg-orange-200";
            case "กับข้าว":
                return "bg-red-300";
            case "ปลา":
                return "bg-sky-200";
            case "ยำ":
                return "bg-orange-400";
            case "แกง":
                return "bg-yellow-200";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="grid grid-cols-1">
            {showSuccessMessage && (
                <div className="alert-container">
                    <div role="alert" className="alert rounded-xl border border-gray-100 bg-white p-4 show">
                        <div className="flex items-start gap-4">
                            <span className="text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            <div className="flex-1">
                                <strong className="block font-medium text-gray-900"> เพิ่มเมนูไปที่ตะกร้าแล้ว! </strong>
                                <p className="mt-1 text-sm text-gray-700">สามารถจัดการเมนูได้ที่หน้า Cart</p>
                            </div>
                            <button onClick={() => setShowSuccessMessage(false)} className="text-gray-500 transition hover:text-gray-600">
                                <span className="sr-only">Dismiss popup</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex">
                <div className="w-1/6 mt-9 ml-2 p-2">
                    <div className="bg-white p-4 shadow rounded">
                        <h2 className="text-lg mb-2 flex justify-center">Menu Filters</h2>
                        <div className="flex justify-center flex-wrap gap-2">
                            <button onClick={() => filterMenu("ข้าว")} className={`filter-button ${getCategoryBadgeColor("ข้าว")}`}>ข้าว</button>
                            <button onClick={() => filterMenu("กับข้าว")} className={`filter-button ${getCategoryBadgeColor("กับข้าว")}`}>กับข้าว</button>
                            <button onClick={() => filterMenu("ปลา")} className={`filter-button ${getCategoryBadgeColor("ปลา")}`}>ปลา</button>
                            <button onClick={() => filterMenu("ยำ")} className={`filter-button ${getCategoryBadgeColor("ยำ")}`}>ยำ</button>
                            <button onClick={() => filterMenu("แกง")} className={`filter-button ${getCategoryBadgeColor("แกง")}`}>แกง</button>
                            <button onClick={() => filterMenu("all")} className={`filter-button ${getCategoryBadgeColor("")}`}>ทั้งหมด</button>
                        </div>
                        <div className="flex justify-center mt-4">

                            {userProfile && userProfile.roll === "admin" && (

                                <button onClick={toggleAddDialog} className="add-menu-btn">ADD MENU</button>
                            )}
                        </div>

                    </div>
                </div>

                <div className="w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-9 p-2">
                        {currentItems.map((menu, index) => (
                            <a key={index} className="group relative block overflow-hidden">
                                <img
                                    src={menu.image}
                                    alt={menu.name}
                                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                                />
                                <div className="relative border border-gray-100 bg-white p-6">
                                    {menu.isNew && (
                                        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                                            New
                                        </span>
                                    )}
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">{menu.name}</h3>
                                    <p className="mt-1.5 text-sm text-gray-700">ราคา : {menu.price}</p>
                                    <div className="flex justify-end">
                                        <div className={`badge border-0 text-black gap-2 ${getCategoryBadgeColor(menu.categoryName)}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            {menu.categoryName}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <button onClick={() => decrementQuantity(menu.menuID)} className="quantity-btn">-</button>
                                        <span className="font-medium">{quantities[menu.menuID] || 1}</span>
                                        <button onClick={() => incrementQuantity(menu.menuID)} className="quantity-btn">+</button>
                                    </div>
                                    <div className="mt-4">
                                        <button onClick={() => addToCart(menu)} className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105">
                                            Add to Cart
                                        </button>
                                        <div className="grid grid-cols-2">
                                            {userProfile && userProfile.roll === "admin" && (
                                                <button onClick={() => handleEdit(menu)} className="block w-24 rounded bg-green-400 p-4 text-sm font-medium mt-2 transition hover:scale-105">
                                                    Edit
                                                </button>
                                            )}
                                            {userProfile && userProfile.roll === "admin" && (
                                                <div className="flex justify-end">
                                                    <button onClick={() => handleDelete(menu)} className="block w-full rounded bg-red-400 p-4 text-sm font-medium mt-2 transition hover:scale-105">
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-5">
                <div className="join">
                    <button onClick={() => paginate(1)} className={`join-item btn ${currentPage === 1 ? 'active' : ''}`}>1</button>
                    <button onClick={() => paginate(2)} className={`join-item btn ${currentPage === 2 ? 'active' : ''}`}>2</button>
                    <button className="join-item btn btn-disabled">...</button>
                    {Array.from({ length: Math.ceil(menus.length / itemsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 3)} className={`join-item btn ${currentPage === index + 3 ? 'active' : ''}`}>{index + 3}</button>
                    ))}
                </div>
            </div>
            {isAddDialogOpen && <AddMenuDialog toggleDialog={toggleAddDialog} />}
            {isEditDialogOpen && <EditMenuDialog menu={selectedMenu} toggleDialog={toggleEditDialog} />}
        </div>
    );
}

export default Menu;
