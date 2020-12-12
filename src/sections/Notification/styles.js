import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 330,
  },
  toolbar: theme.mixins.toolbar,
  notifCardNew: {
    backgroundColor: "#F0F0F0",
    height: 100,
    opacity: "100%",
  },
  notifCardOld: {
    height: 100,
    opacity: "30%",
  },
}));

export default useStyles;
