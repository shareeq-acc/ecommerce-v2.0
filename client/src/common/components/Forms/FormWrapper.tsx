type FormProps = {
  children: React.ReactNode;
  className?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
const FormWrapper = ({ children, className, onSubmit }: FormProps) => {
  return (
    <form
      className={`form form--wrapper ${className && className}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default FormWrapper;
