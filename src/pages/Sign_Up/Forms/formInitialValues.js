import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    name,
    username,
    password,
    contact,
    dateOfBirth,
    noKK,
    noNPWP,
    noNIK,
    memberType,
    memberInfo,
  },
} = checkoutFormModel;

export default {
  [name.name]: "",
  [username.name]: "",
  [password.name]: "",
  [contact.name]: "",
  [dateOfBirth.name]: "",
  [noKK.name]: "",
  [noNPWP.name]: "",
  [noNIK.name]: "",
  [memberType.name]: "",
  [memberInfo.name]: "",
};
