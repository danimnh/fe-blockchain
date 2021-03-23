import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "justify-content": "center",
    "align-items": "center",
    height: "100%",
  },
  button: {
    width: "300px",
    marginTop: 10,
  },
}));

export default useStyles;
