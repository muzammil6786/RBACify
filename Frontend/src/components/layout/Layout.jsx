import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <main className="flex-1 w-full overflow-y-auto">
        <div className="w-full p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;