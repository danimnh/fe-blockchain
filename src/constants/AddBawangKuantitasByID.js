import axios from "axios";

const AddBawangKuantitasByID = async (values, fcnName) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  console.log("fetchapi " + fcnName);

  let body = {
    fcn: fcnName,
    peers: [
      "peer0.penangkar.example.com",
      "peer0.petani.example.com",
      "peer0.pengumpul.example.com",
      "peer0.pedagang.example.com",
    ],
    chaincodeName: "bawangmerah_cc",
    channelName: "mychannel",
    args: values,
  };
  console.log(body);
  console.log("send to");
  console.log(
    "/channel/" + body.channelName + "/chaincodes/" + body.chaincodeName
  );
  try {
    const respBM = await axios.post(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      body,
      config
    );
    await alert("Transaksi berhasil disimpan");
    return respBM;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export default AddBawangKuantitasByID;
