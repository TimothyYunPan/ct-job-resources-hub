const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full md:max-w-[1200px] mx-auto py-10 px-4">{children}</div>
  );
};

export default Layout;
