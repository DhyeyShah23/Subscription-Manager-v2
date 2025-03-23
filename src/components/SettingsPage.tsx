import React, { useState } from 'react';
import { ChevronDown, User, CreditCard, HelpCircle, KeyRound, Trash2, Wallet, History, FileText, MessageSquare, HelpCircleIcon } from 'lucide-react';

interface DropdownProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const Dropdown = ({ title, children, icon }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-800 rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition rounded-lg"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <ChevronDown
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          {children}
        </div>
      )}
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      {/* Account Settings */}
      <Dropdown title="Account Settings" icon={<User size={20} />}>
        <div className="space-y-4">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <User size={18} />
            <span>Personal Details</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <KeyRound size={18} />
            <span>Change Password</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left text-red-400">
            <Trash2 size={18} />
            <span>Delete Account</span>
          </button>
        </div>
      </Dropdown>

      {/* Subscription & Billing */}
      <Dropdown title="Subscription & Billing" icon={<CreditCard size={20} />}>
        <div className="space-y-4">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <Wallet size={18} />
            <span>Current Plan</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <CreditCard size={18} />
            <span>Payment Methods</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <History size={18} />
            <span>Payment History</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <FileText size={18} />
            <span>Cancellation Policy</span>
          </button>
        </div>
      </Dropdown>

      {/* Support & Help Center */}
      <Dropdown title="Support & Help Center" icon={<HelpCircle size={20} />}>
        <div className="space-y-4">
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <HelpCircleIcon size={18} />
            <span>FAQs</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition text-left">
            <MessageSquare size={18} />
            <span>Raise a Support Ticket</span>
          </button>
        </div>
      </Dropdown>
    </div>
  );
};

export default SettingsPage;