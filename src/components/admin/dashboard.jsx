import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
    TrendingUp,
    ShoppingCart,
    DollarSign,
    Package,
    CheckCircle,
    XCircle

} from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { API_URL } from '../../constants';

const Dashboard = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false)

    const getOrderData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/get-orders`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrdersData(data.orders);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getOrderData();
    }, [refresh]);

    const totalOrders = ordersData.length;
    const deliveredOrders = ordersData.length;
    const completionRate = totalOrders > 0
        ? Math.round((deliveredOrders / totalOrders) * 100)
        : 0;

    const totalRevenue = ordersData.reduce((sum, order) => sum + (order.price || 0), 0);
    const profitMargin = 65;

    const orderData = [
        { name: 'Completed', value: deliveredOrders, color: '#000000' },
        { name: 'Pending', value: totalOrders - deliveredOrders, color: '#555555' }
    ];

    const revenueData = [
        { name: 'Profit', value: profitMargin, color: '#000000' },
        { name: 'Cost', value: 100 - profitMargin, color: '#555555' }
    ];

    const growthData = [
        { name: 'Growth', value: 82, color: '#000000' },
        { name: 'Target', value: 18, color: '#555555' }
    ];

    // Loading State
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black mx-auto mb-4"></div>
                    <p className="text-black text-xl">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
                    <XCircle className="mx-auto h-16 w-16 text-black mb-4" />
                    <h2 className="text-2xl font-bold text-black mb-4">Dashboard Error</h2>
                    <p className="text-gray-800 mb-6">{error}</p>
                    <button
                        onClick={getOrderData}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Dashboard Render
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-black">Dashboard</h1>
                        <p className="text-gray-800">Welcome back to Taylorzone Admin!</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center" onClick={e => { setRefresh(!refresh) }}>
                        <TrendingUp className="mr-2 h-5 w-5" /> Refresh Data
                    </button>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        {
                            icon: <ShoppingCart className="text-black" />,
                            title: "Total Orders",
                            value: totalOrders,
                            change: 12
                        },
                        {
                            icon: <CheckCircle className="text-black" />,
                            title: "Orders Delivered",
                            value: deliveredOrders,
                            change: 100
                        },
                        {
                            icon: <FaRupeeSign className="text-black" />,
                            title: "Revenue Generated",
                            value: `₹${totalRevenue.toLocaleString()}`,
                            change: 15
                        },
                        {
                            icon: <Package className="text-black" />,
                            title: "Total Products",
                            value: 89,
                            change: 5
                        }
                    ].map((metric, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-b-4 border-black"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div className="bg-gray-200 p-3 rounded-full">
                                    {metric.icon}
                                </div>
                                <span className={`text-sm font-medium ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ↑ {metric.change}%
                                </span>
                            </div>
                            <h3 className="text-gray-800 text-sm mb-2">{metric.title}</h3>
                            <p className="text-2xl font-serif font-bold text-black">{metric.value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Order Status",
                            data: orderData,
                            percentage: completionRate,
                            description: "Completion Rate"
                        },
                        {
                            title: "Revenue Analytics",
                            data: revenueData,
                            percentage: profitMargin,
                            description: "Profit Margin"
                        },
                        {
                            title: "Customer Growth",
                            data: growthData,
                            percentage: 82,
                            description: "Growth Rate"
                        }
                    ].map((chart, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-black"
                        >
                            <h2 className="text-lg font-serif font-semibold text-black mb-4">{chart.title}</h2>
                            <div className="h-64 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={chart.data}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chart.data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center mt-4">
                                <p className="text-3xl font-serif font-bold text-black">{chart.percentage}%</p>
                                <p className="text-gray-800">{chart.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;