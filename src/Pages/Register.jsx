//Register.jsx

import React, { useState } from 'react';

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    roll: 'user', // ตั้งค่า default ของ roll เป็น 'user'
    profile: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    profile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      profile: ''
    };

    if (!userData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!userData.firstname) {
      newErrors.firstname = 'First Name is required';
      isValid = false;
    }

    if (!userData.lastname) {
      newErrors.lastname = 'Last Name is required';
      isValid = false;
    }

    if (!userData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (!userData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if (!userData.profile) {
      newErrors.profile = 'Profile is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const createAccount = () => {
    if (validate()) {
      fetch('https://localhost:7279/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // เมื่อสร้างบัญชีสำเร็จ
          window.location.href = '/'; // เปลี่ยนเส้นทางไปยังหน้าหลัก
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    }
  };
  

  return (
    <div className='p-4 flex justify-center'>
      <div className="bg-white rounded-lg p-6 w-auto md:w-96">

        <h1>Register</h1>
        <label
          htmlFor="username"
          className="relative mt-4 block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Username
          </span>
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </label>
        <label
          htmlFor="firstname"
          className="relative mt-4 block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            First Name
          </span>
          {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
        </label>
        <label
          htmlFor="lastname"
          className="relative mt-4 block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Last Name
          </span>
          {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
        </label>
        <label
          htmlFor="email"
          className="relative mt-4 block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Email
          </span>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </label>
        <label
          htmlFor="password"
          className="relative mt-4 block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Password
          </span>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </label>
        <label
          htmlFor="profile"
          className="relative mt-4 block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <input
            type="text"
            id="profile"
            name="profile"
            value={userData.profile}
            onChange={handleChange}
            placeholder="Profile"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
          <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
          >
            Profile
          </span>
          {errors.profile && <p className="text-red-500 text-xs mt-1">{errors.profile}</p>}
        </label>

        <button className='btn btn-sm mt-4' onClick={createAccount}>Create Account</button>
        
      </div>
      
    </div>
  );
}

export default Register;
