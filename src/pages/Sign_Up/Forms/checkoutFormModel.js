export default {
  formId: "SignUpForm",
  formField: {
    name: {
      name: "Name",
      label: "Nama",
      requiredErrorMsg: "Name is required",
    },
    username: {
      name: "username",
      label: "Username",
      requiredErrorMsg: "username is required",
    },
    password: {
      name: "password",
      label: "Password",
      requiredErrorMsg: "password is required",
    },
    contact: {
      name: "contact",
      label: "Nomor Handphone",
      requiredErrorMsg: "Nomor Handphone is required",
    },
    dateOfBirth: {
      name: "dateOfBirth",
      label: "Tanggal Lahir (Hari/Bulan/Tahun)",
      requiredErrorMsg: "date of birth is required",
    },
    noKK: {
      name: "noKK",
      label: "noKK*",
      requiredErrorMsg: "Nomor Kartu Keluarga is required",
      invalidErrorMsg: "Nomor Kartu Keluarga is not valid (e.g. 70000)",
    },
    noNPWP: {
      name: "noNPWP",
      label: "noNPWP*",
      requiredErrorMsg: "Nomor NPWP is required",
    },
    noNIK: {
      name: "noNIK",
      label: "NIK is required.",
    },
    memberType: {
      name: "memberType",
      label: "memberType*",
      requiredErrorMsg: "memberType is required",
    },
    memberInfo: {
      name: "memberInfo",
      label: "memberInfo*",
      requiredErrorMsg: "Card number is required",
    },
  },
};
