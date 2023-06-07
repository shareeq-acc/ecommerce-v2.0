type SidebarProps = {
  className?: string;
  showSidebar: Boolean;
  sidebarResponsiveClass?: string;
  children: React.ReactNode;
};
const Sidebar = ({
  children,
  className,
  sidebarResponsiveClass,
  showSidebar,
}: SidebarProps) => {
  return (
    <div
      className={`sidebar ${className ? className : ""} ${
        showSidebar
          ? sidebarResponsiveClass
            ? `${sidebarResponsiveClass} sidebar--responsive`
            : "sidebar--responsive"
          : ""
      }
     
      `}
    >
      {children}
    </div>
  );
};

export default Sidebar;
