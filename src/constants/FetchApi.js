import axios from "axios";

const FetchApi = async (values, fcnName, username) => {
  // eslint-disable-next-line
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  console.log("fetchapi " + fcnName);
  values.usernamePengirim = username;
  let arrayValue = [JSON.stringify(values)];
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
    args: arrayValue,
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
    if (respBM.data.result.result.txid !== "") {
      return respBM.data.result.result.txid;
    }
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export default FetchApi;
