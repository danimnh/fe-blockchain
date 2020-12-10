export default {
  formId: "SignUpForm",
  formField: {
    name: {
      name: "name",
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
      label: "Nomor Kartu Keluarga",
      requiredErrorMsg: "Nomor Kartu Keluarga is required",
      invalidErrorMsg: "Nomor Kartu Keluarga is not valid (e.g. 70000)",
    },
    noNPWP: {
      name: "noNPWP",
      label: "Nomor NPWP",
      requiredErrorMsg: "Nomor NPWP is required",
    },
    noNIK: {
      name: "noNIK",
      label: "Nomor Induk Kependudukan (NIK)",
    },
    memberType: {
      name: "memberType",
      label: "memberType*",
      requiredErrorMsg: "memberType is required",
    },
    memberInfo: {
      luasLahan: {
        name: "luasLahan",
        label: "Luas Lahan (dalam hektar)",
      },
      alamatToko: {
        name: "alamatToko",
        label: "Alamat Toko",
      },
      alamatLahan: {
        name: "alamatLahan",
        label: "Alamat Lahan",
      },
      kelompokTani: {
        name: "kelompokTani",
        label: "Kelompok Tani",
      },
      name: "memberInfo",
      label: "memberInfo*",
      requiredErrorMsg: "memberInfo required",
    },
  },
};
