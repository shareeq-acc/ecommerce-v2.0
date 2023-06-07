import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Sidebar from "../../components/Elements/Sidebar/Sidebar";
import SidebarCloseButton from "../../components/Elements/Sidebar/SidebarCloseButton";
import AccountDetails from "./AccountDetails";
import OrderSection from "./OrderSection";
import ReviewOrders from "./ReviewOrders";

const Account = () => {
  const [currentTab, setCurrentTab] = useState<number>(2);
  const [showSidebar, setShowSidebar] = useState<Boolean>(false);
  const tabs = [
    {
      id: 1,
      text: "Orders",
    },
    {
      id: 2,
      text: "Account Info",
    },
    {
      id: 3,
      text: "Reviews",
    },
  ];
  const userData = {
    fname: "fname",
    lname: "lname",
    email: "fn******@gmail.com",
  };
  return (
    <div className="container--padding section--margin account-page">
      <div className="account__tabs-wrap">
        <Sidebar
          showSidebar={showSidebar}
          sidebarResponsiveClass={"account__sidebar--responsive"}
          className={"account__sidebar"}
        >
          <ul className="acc__tab-list">
            {tabs.map((tab, index) => (
              <li
                className={`acc__tab-item ${
                  currentTab === tab.id ? "acc__tab-item--active " : ""
                }`}
                key={index}
                onClick={() => setCurrentTab(tab.id)}
              >
                {tab.text}
              </li>
            ))}
          </ul>
          {showSidebar && (
            <SidebarCloseButton
              setShowButton={setShowSidebar}
              className={"acc__sidebar-close-btn"}
            />
          )}
        </Sidebar>
        <div className="acc-page__toggle-icon-wrap">
          <FontAwesomeIcon
            icon={faBars}
            className="toggle-icon"
            onClick={() => setShowSidebar(showSidebar ? false : true)}
          />
        </div>
      </div>
      <div className="account__tabs-content-wrap">
        {currentTab === 1 && <OrderSection />}
        {currentTab === 2 && <AccountDetails userData={userData} />}
        {currentTab === 3 && <ReviewOrders />}
      </div>
    </div>
  );
};

export default Account;
