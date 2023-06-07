type AccountDetailsProps = {
  userData: {
    fname: string;
    lname: string;
    email: string;
  };
};
const AccountDetails = ({ userData }: AccountDetailsProps) => {
  return (
    <div className="account-details">
      {/* <h1 className="account__tab-content-title">Account Details</h1> */}
      <div className="acc-details--wrap">
        <div className="acc-details__field">
          <span className="acc-details__key">First Name</span>
          <div className="acc-details__value">
            <span className="value">{userData.fname}</span>
          </div>
        </div>
        <div className="acc-details__field">
          <span className="acc-details__key">Last Name</span>
          <div className="acc-details__value">
            <span className="value">{userData.lname}</span>
          </div>
        </div>
        <div className="acc-details__field">
          <span className="acc-details__key">Email</span>
          <div className="acc-details__value">
            <span className="value">
              {userData.email}
              {/* <FontAwesomeIcon icon={faPen} className="field-icon"/> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
