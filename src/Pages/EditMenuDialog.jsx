import React, { useState } from "react";

function EditMenuDialog({ menu, toggleDialog }) {
    const [editedMenu, setEditedMenu] = useState(menu);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedMenu(prevMenu => ({
            ...prevMenu,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedMenu = {
                ...editedMenu,
                menuID: menu.menuID, // เพิ่ม menuID จากข้อมูลเดิม
                image: menu.image // เพิ่ม image จากข้อมูลเดิม
            };

            const response = await fetch(`https://localhost:7279/api/Menus/${menu.menuID}`, { // เพิ่ม ID ของเมนูใน URL
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedMenu)
            });

            if (!response.ok) {
                throw new Error("Failed to update menu.");
            }

            // หลังจากบันทึกสำเร็จ ปิด Dialog
            toggleDialog();

            // รีเฟรชหน้า
            window.location.reload();

            // แสดง Alert
            window.alert("Your Edit has been Successful!");
        } catch (error) {
            console.error("Error updating menu:", error);
        }
    };

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-100 text-orange-500 rounded-md shadow-2xl shadow-orange-300 p-6 z-50">
             <button onClick={toggleDialog} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div className="dialog-content">
                <h2 className="text-lg font-bold mb-4">Edit Menu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name:</label>
                        <input type="text" name="name" value={editedMenu.name} onChange={handleChange} className="input bg-white shadow-orange-300 shadow-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Price:</label>
                        <input type="text" name="price" value={editedMenu.price} onChange={handleChange} className="input bg-white shadow-orange-300 shadow-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Category:</label>
                        <input type="text" name="categoryName" value={editedMenu.categoryName} onChange={handleChange} className="input bg-white shadow-orange-300 shadow-md" />
                    </div>
                    <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Image URL:</label>
    <input type="text" name="image" value={editedMenu.image} onChange={handleChange} className="input bg-white shadow-orange-300 shadow-md" />
</div>

                    <div className="flex justify-end">
                        <button type="submit" className="btn bg-orange-300 border-orange-50 text-orange-500 hover:bg-orange-500 hover:text-orange-100 hover:border-orange-50 mt-6 shadow-md shadow-orange-400">Save</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default EditMenuDialog;
