//navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import './navbar.css';

function Navbar() {
  const [orderCount, setOrderCount] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7279/api/Orders')
      .then(response => response.json())
      .then(data => {
        const count = data.length;
        setOrderCount(count);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      setLoggedIn(true);
      setShowInput(false);
      setUserProfile(userProfile);
    }
  }, []);

  const handleLogin = () => {
    fetch('https://localhost:7279/api/Users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(users => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          setLoggedIn(true);
          setShowInput(false);
          setUserProfile(user);
          showAnimatedAlert();
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('userProfile', JSON.stringify(user));
          window.location.reload(); // รีเฟรชหน้าเว็บหลังจาก login เสร็จสิ้น
        } else {
          console.log('Invalid username or password');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };
  
  const handleLogout = () => {
    setLoggedIn(false);
    setShowInput(true);
    setUsername('');
    setPassword('');
    setUserProfile(null);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userProfile');
    window.location.reload(); // รีเฟรชหน้าเว็บหลังจาก logout เสร็จสิ้น
  };
  

  

  const showAnimatedAlert = () => {
    const alertElement = document.createElement('div');
    alertElement.classList.add('animated-alert', 'alert', 'alert-success');
    alertElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Your Login has been confirmed!</span>
    `;
    document.body.appendChild(alertElement);
    setTimeout(() => {
      alertElement.remove();
    }, 3000);
  };

  return (
    <header className="bg-white relative">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <span className="sr-only">Logo</span>
            <img src="./src/assets/longlae.png" alt="Logo" style={{ width: '100px', height: 'auto' }} />
          </div>

          <div className="md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-4 text-lg ">
                <li>
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                  <Link to="/menu" className="nav-link">Menu</Link>
                </li>
                <li>
                  <Link to="/about" className="nav-link">Team Dev</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex-none flex items-center">
            <div className="mr-4">
              <Link to="/cart" className="btn btn-ghost btn-circle items-center">
                <div className="indicator">
                  <PiShoppingCartSimpleFill className="h-5 w-5" />
                  <span className="badge badge-sm indicator-item">{orderCount}</span>
                </div>
              </Link>
            </div>

            <div className="user-dropdown dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {userProfile ? (
                    <img alt="user profile" src={userProfile.profile} />
                  ) : (
                    <img alt="default profile" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" />
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="menu w-72 menu-sm dropdown-content z-[1] p-2 shadow mt-8 bg-orange-100 rounded-box">
                {showInput && (
                  <div className='p-4'>
                    <label
                      htmlFor="Username"
                      className="relative bg-orange-50 block overflow-hidden rounded-md border mb-4 border-orange-300 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="Username"
                        placeholder=" "
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />

                      <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-orange-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                      >
                        Username
                      </span>
                    </label>

                    <label
                      htmlFor="Password"
                      className="relative bg-orange-50 block overflow-hidden rounded-md border mb-4 border-orange-300 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="password"
                        id="Password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      />

                      <span
                        className="absolute start-3 top-3 -translate-y-1/2 text-xs text-orange-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                      >
                        Password
                      </span>
                    </label>

                    {!loggedIn && (
                      <li>
                        <button className='btn border-orange-50 btn-sm h-12 bg-orange-50 text-orange-500 hover:bg-orange-500 hover:border-orange-50 hover:text-orange-50' onClick={handleLogin}>Login</button>
                        <button
                          className='btn mt-4 border-orange-50 btn-sm h-12 bg-orange-50 text-orange-500 hover:bg-orange-500 hover:border-orange-50 hover:text-orange-50'>
                          <Link to="/register">Do not have account?</Link>
                        </button>
                      </li>

                    )}
                  </div>
                )}
                {loggedIn && (
                  <li>
                    <span className="mb-2 text-black">Hello! | {userProfile.username}</span>
                    <button onClick={handleLogout} className="nav-link2 text-grey-500">Logout</button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
