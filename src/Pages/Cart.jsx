import React, { useState, useEffect } from "react";

function Cart() {
  const [orders, setOrders] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://localhost:7279/api/Orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        // Initialize quantities object with quantity from API for each order
        const initialQuantities = {};
        data.forEach(order => {
          initialQuantities[order.orderID] = order.quantity;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  useEffect(() => {
    if (selectAll) {
      setSelectedItems(orders.map(order => order.orderID));
    } else {
      setSelectedItems([]);
    }
  }, [selectAll, orders]);

  const handleQuantityChange = (event, orderID) => {
    const newQuantities = { ...quantities };
    newQuantities[orderID] = parseInt(event.target.value);
    setQuantities(newQuantities);
  };

  const handleRemoveOrder = (orderID) => {
    fetch(`https://localhost:7279/api/Orders/${orderID}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setOrders(orders.filter(order => order.orderID !== orderID));
          // Reload the page
          window.location.reload();
        } else {
          console.error(`Failed to delete order with ID ${orderID}`);
        }
      })
      .catch(error => console.error(`Error deleting order with ID ${orderID}:`, error));
  };


  // Calculate total price
  const totalPrice = orders.reduce((total, order) => {
    return total + (order.price * quantities[order.orderID]);
  }, 0);

  // Pagination
  const itemsPerPage = 6;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentOrders = orders.slice(firstIndex, lastIndex);

  return (
    <div className="bg-orange-50 rounded-lg shadow-lg mt-4 p-8 mr-4 ml-4">
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl -mt-8 font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
            </header>
            {orders.length === 0 ? (
              <div className="text-center mt-8 text-xl font-bold text-red-500">
                ยังไม่ได้เพิ่มเมนูลงตะกร้า
              </div>
            ) : (
              <ul className="space-y-4">
                {currentOrders.map((order) => (
                  <li key={order.orderID} className="flex items-center gap-4">
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 ">
              <ul className="space-y-4">
                {currentOrders.map((order) => (
                  <li key={order.orderID} className="flex items-center gap-4 shadow-md shadow-orange-300">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="size-16 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm text-gray-900">{order.name}</h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">Order ID:</dt>
                          <dd className="inline">{order.orderID}</dd>
                        </div>

                        <div>
                          <dt className="inline">Menu ID:</dt>
                          <dd className="inline">{order.menuID}</dd>
                        </div>

                        <div>
                          <dt className="inline">Price:</dt>
                          <dd className="inline">{order.price}</dd>
                        </div>

                        <div>
                          <dt className="inline">Category:</dt>
                          <dd className="inline">{order.categoryName}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor={`Qty-${order.orderID}`} className="sr-only"> Quantity </label>
                        <input
                          type="number"
                          min="1"
                          value={quantities[order.orderID] || 1}
                          onChange={(e) => handleQuantityChange(e, order.orderID)}
                          id={`Qty-${order.orderID}`}
                          className="h-8 w-12 rounded border border-gray-300 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />

                      </form>


                      <button
                        className="text-gray-600 transition hover:text-red-600"
                        onClick={() => handleRemoveOrder(order.orderID)}
                      >
                        <span className="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12 -mb-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-lg font-medium">
                      <dt>Total</dt>
                      <dd>{`${totalPrice.toFixed(2)} ฿`}</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(orders.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-600'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cart;
