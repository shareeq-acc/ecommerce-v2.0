import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SidebarCloseButtonProps = {
  setShowButton: (value: Boolean) => void;
  className?: string;
};

const SidebarCloseButton = ({
  setShowButton,
  className,
}: SidebarCloseButtonProps) => {
  return (
    <div className={`sidebar__close-btn-wrap ${className ? className : ""}`}>
      <FontAwesomeIcon icon={faXmark} onClick={() => setShowButton(false)} />
    </div>
  );
};

export default SidebarCloseButton;
