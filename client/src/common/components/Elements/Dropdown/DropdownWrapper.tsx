type DropdownProps = {
  className?: string;
  children: React.ReactNode;
};
const DropdownWrapper = ({ className, children,}: DropdownProps) => {
  return (
    <div className={`dropdown ${className ? className : ""}`} >
      <ul className="dropdown__list">{children}</ul>
    </div>
  );
};

export default DropdownWrapper;
