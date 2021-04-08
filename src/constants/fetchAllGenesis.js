import axios from "axios";

const fetchAllGenesis = async (props) => {
  console.log(props);
  try {
    let config = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
      params: {
        peer: "peer0.penangkar.example.com",
        fcn: "GetBawangForQuery",
        args:
          '["' +
          '{\\"selector\\":{\\"usernamePengirim\\":\\"' +
          props +
          '\\", \\"isGenesis\\":true}}' +
          '"]',
      },
    };
    const resp = await axios.get(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      config
    );

    return resp.data.result;
  } catch (err) {
    console.log(err);
  }
};

export default fetchAllGenesis;
