import PtnAddTrxFields from "../../Form_Models/PtnAddTrxModels.js";
const {
  formPtnFields: {
    usernamePenerima,
    kuantitasBawangKg,
    hargaBawangPerKg,
    ukuranUmbi,
    pupuk,
    pestisida,
    kadarAir,
    perlakuan,
    produktivitas,
  },
} = PtnAddTrxFields;

export default {
  [usernamePenerima.name]: "",
  [kuantitasBawangKg.name]: "",
  [hargaBawangPerKg.name]: "",
  [ukuranUmbi.name]: "",
  [pupuk.name]: "",
  [pestisida.name]: "",
  [kadarAir.name]: "",
  [perlakuan.name]: "",
  [produktivitas.name]: "",
};
