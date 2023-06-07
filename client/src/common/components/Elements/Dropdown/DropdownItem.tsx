type DropdownItem = {
  className?: string;
  children?: React.ReactNode | string;
};
const DropdownItem = ({ className, children }: DropdownItem) => {
  return (
    <li className={`dropdown__list__item ${className ? className : ""}`}>
      {children}
    </li>
  );
};

export default DropdownItem;
