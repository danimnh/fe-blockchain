import PkrAddTrxFields from "../../Form_Models/PkrAddTrxModels.js";
const {
  formPkrFields: {
    namaPenerima,
    alamatPengirim,
    alamatPenerima,
    kuantitas,
    harga,
    umurBenih,
    lamaPenyimpanan,
    varietas,
    hargaBenih,
  },
} = PkrAddTrxFields;

export default {
  [namaPenerima.name]: "",
  [alamatPengirim.name]: "",
  [alamatPenerima.name]: "",
  [kuantitas.name]: "",
  [harga.name]: "",
  [umurBenih.name]: "",
  [lamaPenyimpanan.name]: "",
  [varietas.name]: "",
  [hargaBenih.name]: "",
};
