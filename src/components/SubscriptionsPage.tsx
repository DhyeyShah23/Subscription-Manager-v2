import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DollarSign, Calendar, CreditCard } from 'lucide-react';

interface SubscriptionData {
  name: string;
  value: number;
}

const SubscriptionsPage = () => {
  // Data for Total Subscriptions by Status
  const statusData: SubscriptionData[] = [
    { name: 'Active', value: 7 },
    { name: 'Expiring Soon', value: 2 },
    { name: 'Expired', value: 1 }
  ];

  // Data for Subscriptions by Category
  const categoryData: SubscriptionData[] = [
    { name: 'HR', value: 2 },
    { name: 'Software', value: 2 },
    { name: 'Hardware', value: 1 },
    { name: 'Healthcare', value: 1 },
    { name: 'Financial', value: 1 }
  ];

  // Monthly expenditure data
  const monthlyData = [
    { month: 'Jan', amount: 1200000 },
    { month: 'Feb', amount: 1350000 },
    { month: 'Mar', amount: 1280000 },
    { month: 'Apr', amount: 1420000 },
    { month: 'May', amount: 1380000 },
    { month: 'Jun', amount: 1500000 },
    { month: 'Jul', amount: 1320000 },
    { month: 'Aug', amount: 1450000 },
    { month: 'Sep', amount: 1380000 },
    { month: 'Oct', amount: 1520000 },
    { month: 'Nov', amount: 1480000 },
    { month: 'Dec', amount: 1600000 }
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f472b6', '#fb923c'];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8">Subscription Analytics</h1>

      {/* Monthly Expenditure Line Chart */}
      <div className="bg-gray-900 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Expenditure Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" tickFormatter={(value) => `₹${value / 100000}L`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                labelStyle={{ color: '#111827' }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Total Subscriptions Chart */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Expenditure Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Monthly Expenditure */}
        <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <DollarSign size={24} />
            </div>
            <h3 className="text-lg font-semibold">Monthly Expenditure</h3>
          </div>
          <p className="text-3xl font-bold mb-2">{formatCurrency(1600000)}</p>
          <p className="text-sm text-gray-400">Average monthly spending</p>
        </div>

        {/* Yearly Expenditure */}
        <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-indigo-600 rounded-lg">
              <Calendar size={24} />
            </div>
            <h3 className="text-lg font-semibold">Yearly Expenditure</h3>
          </div>
          <p className="text-3xl font-bold mb-2">{formatCurrency(19200000)}</p>
          <p className="text-sm text-gray-400">Projected yearly spending</p>
        </div>

        {/* Billing Cycles */}
        <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-pink-600 rounded-lg">
              <CreditCard size={24} />
            </div>
            <h3 className="text-lg font-semibold">Billing Cycles</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Monthly</span>
              <span className="font-semibold">2 subscriptions</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Yearly</span>
              <span className="font-semibold">5 subscriptions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;