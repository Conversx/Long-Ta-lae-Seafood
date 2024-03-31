import React from "react";
import './CSS/Home.css';

function Home() {
    return (
<div className="container my-3 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
                <div className=" rounded-md bg-orange-100">
                    <br/>
                    <h1 className="text-4xl font-bold   text-center text-orange-500">✨ Recommend menu ✨</h1>
                    <p className="text-center  text-orange-300">We serve the best food in heart 💖</p>
                    <br/>
                </div>
                <div className="p-8 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    <div className="flex-grow rounded-lg bg-gray-200">
                        <a href="#" className="group relative block bg-black card">
                            <img
                                alt=""
                                src="https://img.wongnai.com/p/1920x0/2019/05/13/8206fe1d60144d6094416b6431983d7a.jpg"
                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                            />

                            <div className="relative sm:p-6 lg:p-8">
                                <p className="text-sm font-medium uppercase tracking-widest text-orange-100">"Steamed Grouper with Rich Sauce"</p>

                                <p className="text-xl font-bold text-white sm:text-2xl">ปลาเก๋าแดงนึ่งซอสเข้มข้น</p>

                                <div className="mt-32 sm:mt-48 lg:mt-64">
                                    <div
                                        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <p className="text-sm text-white">
                                            ปลา ! นายเก๋ามากนักใช่มั้ย เอามานึ่งซะเลย นี่แหนะ กลายเป็น “ปลาเก๋าแดงนึ่งซอสเข้มข้น” ก็มาดิคร้าบบบ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="flex-grow h-32 rounded-lg bg-gray-200">
                        <a href="#" className="group relative block bg-black card">
                            <img
                                alt=""
                                src="https://img.wongnai.com/p/1920x0/2019/04/23/d7fe2c846ff24df2afe4a6fdefcdac63.jpg"
                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                            />

                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-sm font-medium uppercase tracking-widest text-orange-100">"Spicy Mackerel Salad with Lychee"</p>

                                <p className="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

                                <div className="mt-32 sm:mt-48 lg:mt-64">
                                    <div
                                        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <p className="text-sm text-white">
                                            เปรี้ยวปากจนต้องร้องซี้ดกับ “ยำปลาสลิดฟูลิ้นจี่” เมนูยำ สำหรับคนชอบยำ ทำกินง่าย ๆ อร่อยปลาสลิด ถูกจริตอย่างแน่นอน
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="flex-grow h-32 rounded-lg bg-gray-200">
                        <a href="#" className="group relative block bg-black card">
                            <img
                                alt=""
                                src="https://img.wongnai.com/p/1920x0/2019/06/10/738cb89d5c9249d28e81b5c5797393aa.jpg"
                                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                            />

                            <div className="relative p-4 sm:p-6 lg:p-8">
                                <p className="text-sm font-medium uppercase tracking-widest text-orange-100">"Kaisendon Volcano"</p>

                                <p className="text-xl font-bold text-white sm:text-2xl">ข้าวหน้าปลาดิบภูเขาไฟ</p>

                                <div className="mt-32 sm:mt-48 lg:mt-64">
                                    <div
                                        className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <p className="text-sm text-white">
                                            ข้าวหน้าปลาดิบล้น ๆ มาแบบพูนเป็นภูเขา กับเมนู “ข้าวหน้าปลาดิบภูเขาไฟ” รวมมิตรมาทั้งปลาดิบ ปลาหมึก ปูอัด ไข่หวาน จุใจกันไปเลย!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
