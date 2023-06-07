import keys from "./keys.js";

export const verificationEmailTemplate = (fname, token) => {
  const url = keys.clientUrl + "/api/auth/activate/" + token;
  return `<div>
                <h2>Hi ${fname}</h2>
                <p>Thank you for Creating an Account on XYZ Store. \n Please Click on the Link to Activate Your Account. \n If You did not request for an Email, Please Ignore this Email</p>
                <button>
                    <a href=${url}>
                        Click Here
                    </a>
                </button>
            </div>`;
};

export const passwordChangeTemplate = (fname, token) => {
  const url = keys.clientUrl + "/api/auth/reset/" + token;
  return `<div>
                <h2>Hi ${fname}</h2>
                <p>You Requested for Password Reset, Here is the Link \n Please Click on this Link to Reset Your Password \n If You did Not Request For this Email, Please Ignore It</p>
                <button>
                    <a href=${url}>
                        Click Here
                    </a>
                </button>
        </div>`;
};

export const orderConfirmationEmail = (fname) => {
  return `<div>
                <h2>Hi ${fname}, Thank you for placing an Order</h2>
                <p>We've received your order and will contact you as soon as your package is shipped</p>\
        </div>`;
};
