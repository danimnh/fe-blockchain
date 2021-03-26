// import React from "react";
// import axios from "axios";

const FetchApi = async (values, fcnName) => {
  // eslint-disable-next-line
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
  // API not ready

  //   axios({
  //     method: "post",
  //     url: "/channel/" + body.channelName + "/chaincodes/" + body.chaincodeName,
  //     data: {
  //       args,
  //     },
  //     config: {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     },
  //   });
};

export default FetchApi;
