import PtnAddTrxFields from "../../Form_Models/PtnAddTrxModels.js";
const {
  formPtnFields: {
    batchID,
    namaPenerima,
    alamatPengirim,
    alamatPenerima,
    kuantitas,
    harga,
    ukuranBenih,
    kadarAir,
    pupuk,
    pestisida,
    perlakuan,
  },
} = PtnAddTrxFields;

export default {
  [batchID.name]: "",

  [namaPenerima.name]: "",
  [alamatPengirim.name]: "",
  [alamatPenerima.name]: "",
  [kuantitas.name]: "",
  [harga.name]: "",
  [ukuranBenih.name]: "",
  [kadarAir.name]: "",
  [pupuk.name]: "",
  [pestisida.name]: "",
  [perlakuan.name]: "",
};
