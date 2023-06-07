type ButtonProps = {
  children: React.ReactNode | string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button className={`btn ${className && className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
