import React from 'react';
import { FiDollarSign, FiCalendar, FiUsers, FiMoreHorizontal, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FiGrid, FiFileText, FiBookOpen, FiCalendar as FiCalendarNav, FiUsers as FiUsersNav, FiSettings } from 'react-icons/fi';
import FishBanner from "../assets/fish-banner-3.png";

const SidebarItem: React.FC<{ icon: React.ReactNode; text: string; active?: boolean }> = ({ icon, text, active }) => (
  <div className={`flex items-center mb-4 p-2 rounded-lg ${active ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen pt-10">
      {/* Header */}
      <header className="bg-teal-900 text-white p-4">
        {/* Header content */}
      </header>

      {/* Main content area including sidebar and main content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-4">
            <SidebarItem icon={<FiGrid />} text="Dashboard" active />
            <SidebarItem icon={<FiFileText />} text="Reports" />
            <SidebarItem icon={<FiBookOpen />} text="Booking" />
            <SidebarItem icon={<FiCalendar />} text="Calendar" />
            <SidebarItem icon={<FiUsers />} text="Team" />
            <SidebarItem icon={<FiSettings />} text="Settings" />
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Hello Admin!</h1>
          
          {/* July activity section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">July activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                icon={<img src="/path-to-dollar-icon.svg" alt="Dollar" className="w-12 h-12" />}
                title="Total earnings"
                value="24,345,55$"
                color="bg-white"
                decoration={<img src={FishBanner} alt="Arrow Up" className="absolute top-2 right-2 w-8 h-8" />}
              />
              <StatCard
                icon={<img src="/path-to-lock-icon.svg" alt="Lock" className="w-12 h-12" />}
                title="Total booking"
                value="202"
                color="bg-white"
              />
              <StatCard
                icon={<img src="/path-to-phone-icon.svg" alt="Phone" className="w-12 h-12" />}
                title="Total Customer"
                value="554"
                color="bg-white"
                decoration={<img src={FishBanner} alt="Star" className="absolute top-2 right-2 w-6 h-6" />}
              />
            </div>
          </div>

          {/* Top Service and VIP Customer sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Top Service</h2>
              <TopServices />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">VIP Customer</h2>
              <VIPCustomers />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  decoration?: React.ReactNode;
}> = ({ icon, title, value, color, decoration }) => (
  <div className={`${color} p-6 rounded-lg flex items-center relative overflow-hidden`}>
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </div>
    {decoration}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
  </div>
);

const TopServices: React.FC = () => (
  <table className="w-full">
    <thead>
      <tr className="text-left text-gray-500">
        <th className="pb-2">#</th>
        <th className="pb-2">Name</th>
        <th className="pb-2">Popularity</th>
        <th className="pb-2">Sales</th>
      </tr>
    </thead>
    <tbody>
      <ServiceRow id="01" name="Khảo sát chất lượng hồ" popularity={45} sales="45%" color="bg-blue-500" />
      <ServiceRow id="02" name="Khám tại trung tâm" popularity={29} sales="29%" color="bg-green-500" />
      <ServiceRow id="03" name="Khám tại nhà" popularity={18} sales="18%" color="bg-purple-500" />
      <ServiceRow id="04" name="Tư vấn online" popularity={25} sales="25%" color="bg-yellow-500" />
    </tbody>
  </table>
);

const ServiceRow: React.FC<{ id: string; name: string; popularity: number; sales: string; color: string }> = ({ id, name, popularity, sales, color }) => (
  <tr>
    <td className="py-2">{id}</td>
    <td className="py-2">{name}</td>
    <td className="py-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${popularity}%` }}></div>
      </div>
    </td>
    <td className="py-2">
      <span className={`${color} text-white px-2 py-1 rounded-full text-xs`}>{sales}</span>
    </td>
  </tr>
);

const VIPCustomers: React.FC = () => (
  <ul>
    <CustomerItem name="Nguyễn Thị Hồng Hạnh" value="12345$" />
    <CustomerItem name="Lê Thị Ánh Hồng" value="5678$" />
    <CustomerItem name="Đỗ Dũng" value="5$" />
    <CustomerItem name="Tân Thép" value="1$" />
  </ul>
);

const CustomerItem: React.FC<{ name: string; value: string }> = ({ name, value }) => (
  <li className="flex justify-between items-center py-2 border-b last:border-b-0">
    <span>{name}</span>
    <span className="font-semibold">{value}</span>
  </li>
);




export default Dashboard;
