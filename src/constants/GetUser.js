import axios from "axios";

const getUsername = async () => {
  if (localStorage.getItem("token") == null) {
    return;
  }
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  try {
    const resp = await axios.get("user", config);
    console.log("Berhasil login sebagai " + resp.data.data.orgName);
    return resp.data.data.username;
  } catch (err) {
    console.log(err);
  }
};

export default getUsername;
