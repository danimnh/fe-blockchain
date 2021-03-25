import PkrAddTrxFields from "../../Form_Models/PkrAddTrxModels.js";
const {
  formPkrFields: { kuantitas, harga, varietas, hargaBenih },
} = PkrAddTrxFields;

export default {
  [kuantitas.name]: "",
  [harga.name]: "",
  [varietas.name]: "",
  [hargaBenih.name]: "",
};
