import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Home, 
  CreditCard, 
  Settings,
  Search,
  LogOut,
  User,
  Plus,
  Trash2
} from 'lucide-react';
import SettingsPage from './components/SettingsPage';
import SubscriptionsPage from './components/SubscriptionsPage';

interface Subscription {
  id: string;
  name: string;
  plan: string;
  daysLeft: number;
  amount: string;
  icon: string;
  category?: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'settings' | 'subscriptions'>('dashboard');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: '1', name: 'Workday', plan: 'Enterprise', daysLeft: 7, amount: '₹120000', icon: '👥', category: 'HR', billingCycle: 'yearly', nextBillingDate: '2025-03-25' },
    { id: '2', name: 'SAP SuccessFactors', plan: 'Professional', daysLeft: 15, amount: '₹80000', icon: '💼', category: 'HR', billingCycle: 'yearly', nextBillingDate: '2025-04-02' },
    { id: '3', name: 'Microsoft Azure', plan: 'Enterprise', daysLeft: 12, amount: '₹250000', icon: '☁️', category: 'software', billingCycle: 'monthly', nextBillingDate: '2025-03-30' },
    { id: '4', name: 'Salesforce', plan: 'Enterprise', daysLeft: 14, amount: '₹150000', icon: '💫', category: 'software', billingCycle: 'yearly', nextBillingDate: '2025-04-01' },
    { id: '5', name: 'Dell EMC', plan: 'Server Package', daysLeft: 30, amount: '₹500000', icon: '🖥️', category: 'hardware', billingCycle: 'yearly', nextBillingDate: '2025-04-15' },
    { id: '6', name: 'Epic Systems', plan: 'Healthcare Suite', daysLeft: 5, amount: '₹300000', icon: '🏥', category: 'healthcare', billingCycle: 'yearly', nextBillingDate: '2025-03-23' },
    { id: '7', name: 'Bloomberg Terminal', plan: 'Professional', daysLeft: 20, amount: '₹200000', icon: '📊', category: 'financial', billingCycle: 'monthly', nextBillingDate: '2025-04-08' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [stats, setStats] = useState({
    totalSpent: 0,
    activeCount: 0,
    yearlyForecast: 0,
    categoryBreakdown: {} as Record<string, number>,
    monthlyRecurring: 0
  });

  const autoCategorize = (name: string): string => {
    const categories = {
      HR: ['workday', 'successfactors', 'bamboo', 'zenefits', 'paylocity'],
      software: ['microsoft', 'salesforce', 'oracle', 'sap', 'aws', 'azure'],
      hardware: ['dell', 'hp', 'lenovo', 'cisco', 'emc'],
      healthcare: ['epic', 'cerner', 'meditech', 'allscripts', 'athena'],
      financial: ['bloomberg', 'reuters', 'factset', 'morningstar', 'quickbooks']
    };

    const lowercaseName = name.toLowerCase();
    for (const [category, services] of Object.entries(categories)) {
      if (services.some(service => lowercaseName.includes(service))) {
        return category;
      }
    }
    return 'other';
  };

  useEffect(() => {
    const calculateStats = () => {
      const total = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.amount.replace('₹', '')), 0);
      const yearly = subscriptions.reduce((sum, sub) => {
        const amount = parseFloat(sub.amount.replace('₹', ''));
        return sum + (sub.billingCycle === 'yearly' ? amount : amount * 12);
      }, 0);
      
      const monthlyRecurring = subscriptions.reduce((sum, sub) => {
        const amount = parseFloat(sub.amount.replace('₹', ''));
        return sum + (sub.billingCycle === 'monthly' ? amount : amount / 12);
      }, 0);

      const categoryBreakdown = subscriptions.reduce((acc, sub) => {
        const category = sub.category || autoCategorize(sub.name);
        acc[category] = (acc[category] || 0) + parseFloat(sub.amount.replace('₹', ''));
        return acc;
      }, {} as Record<string, number>);

      setStats({
        totalSpent: total,
        activeCount: subscriptions.length,
        yearlyForecast: yearly,
        categoryBreakdown,
        monthlyRecurring
      });
    };

    calculateStats();
  }, [subscriptions]);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sub.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || (sub.category || autoCategorize(sub.name)) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string): string => {
    const colors = {
      HR: 'text-blue-400',
      software: 'text-purple-400',
      hardware: 'text-green-400',
      healthcare: 'text-red-400',
      financial: 'text-yellow-400',
      other: 'text-gray-400'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const handleDelete = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => a.daysLeft - b.daysLeft);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search subscriptions..."
                  className="w-full bg-gray-900 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
              >
                <Plus size={20} />
              </button>
              <button className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
                <Bell size={20} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-gray-400 mb-2">Monthly Recurring</h3>
                <p className="text-3xl font-bold">₹{stats.monthlyRecurring.toLocaleString('en-IN')}</p>
                <span className="text-green-400 text-sm">+12.5% from last month</span>
              </div>
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-gray-400 mb-2">Active Subscriptions</h3>
                <p className="text-3xl font-bold">{stats.activeCount}</p>
                <span className="text-purple-400 text-sm">
                  {subscriptions.filter(sub => sub.daysLeft <= 7).length} renewing soon
                </span>
              </div>
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-gray-400 mb-2">Yearly Forecast</h3>
                <p className="text-3xl font-bold">₹{stats.yearlyForecast.toLocaleString('en-IN')}</p>
                <span className="text-gray-400 text-sm">Based on current subscriptions</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(stats.categoryBreakdown).map(([category, amount]) => (
                  <div key={category} className="bg-gray-900 rounded-lg p-4">
                    <h3 className={`capitalize ${getCategoryColor(category)}`}>{category}</h3>
                    <p className="text-2xl font-bold mt-2">₹{amount.toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedSubscriptions.map((sub) => (
                <div key={sub.id} className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{sub.icon}</div>
                      <div>
                        <h3 className="font-medium">{sub.name}</h3>
                        <p className="text-sm text-gray-400">{sub.plan}</p>
                        <span className={`text-xs capitalize ${getCategoryColor(sub.category || autoCategorize(sub.name))}`}>
                          {sub.category || autoCategorize(sub.name)}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(sub.id)}
                      className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Next payment</p>
                      <p className="font-medium">{sub.amount}</p>
                      <p className="text-xs text-gray-500">{sub.billingCycle}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Renews in</p>
                      <p className="font-medium">{sub.daysLeft} days</p>
                      <p className="text-xs text-gray-500">{sub.nextBillingDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return <SettingsPage />;
      case 'subscriptions':
        return <SubscriptionsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-300">
              SubScribe
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hover:text-purple-400 transition">About</button>
            <button className="hover:text-purple-400 transition">Contact</button>
            <button 
  onClick={() => window.location.href = 'https://subscription-manager-v0.vercel.app/login'}
  className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
>
  <LogOut size={18} />
  <span>Log Out</span>
</button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 border-r border-gray-800 h-[calc(100vh-73px)] p-4">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-medium">Vikram Singh</h3>
              <p className="text-sm text-gray-400">Premium Plan</p>
            </div>
          </div>
          
          <nav>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    currentPage === 'dashboard' ? 'bg-purple-600/10 text-purple-400' : 'hover:bg-purple-600/10'
                  }`}
                >
                  <Home size={20} />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('subscriptions')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    currentPage === 'subscriptions' ? 'bg-purple-600/10 text-purple-400' : 'hover:bg-purple-600/10'
                  }`}
                >
                  <CreditCard size={20} />
                  <div className="text-left">
                    <div>Subscriptions &</div>
                    <div>Analytics</div>
                  </div>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('settings')}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                    currentPage === 'settings' ? 'bg-purple-600/10 text-purple-400' : 'hover:bg-purple-600/10'
                  }`}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>

          {currentPage === 'dashboard' && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Categories</h3>
              <div className="space-y-2">
                {Object.keys(stats.categoryBreakdown).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedCategory === category ? 'bg-purple-600/10 text-purple-400' : 'hover:bg-gray-800'
                    }`}
                  >
                    <span className={`capitalize ${getCategoryColor(category)}`}>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
