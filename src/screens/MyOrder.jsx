import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail'),
            }),
        }).then(async (res) => {
            let response = await res.json();
            setOrderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="container mt-5">
                <h2 className="text-center mb-4 text-white">My Orders</h2>
                <div className="row">
                    {orderData?.orderData ? (
                        orderData.orderData.order_data
                            .slice(0)
                            .reverse()
                            .map((order, idx) => (
                                <div key={idx} className="col-12 mb-4">
                                    <div className="card p-3 shadow">
                                        <h5 className="card-header bg-primary text-white">
                                            Order Date: {order[0].Order_date}
                                        </h5>
                                        <div className="card-body">
                                            {order.slice(1).map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                                                >
                                                    <div>
                                                        <strong>Item:</strong> {item.name}
                                                    </div>
                                                    <div>
                                                        <strong>Qty:</strong> {item.qty}
                                                    </div>
                                                    <div>
                                                        <strong>Size:</strong> {item.size}
                                                    </div>
                                                    <div>
                                                        <strong>Price:</strong> ₹{item.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="text-center">
                            <p>You have not ordered anything yet.</p>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}
