import axios from "axios";
//username
const InvokeTrxPkr = async (values, fcnName) => {
  console.log("invoke");
  console.log(values);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  let prevID = values.prevID;
  delete values["prevID"];

  let arrayValue = [JSON.stringify(values)];
  console.log(arrayValue);
  let newArgs = [arrayValue, prevID];
  console.log(newArgs);
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
    args: newArgs,
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

export default InvokeTrxPkr;
