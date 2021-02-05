import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  copyright: {
    "user-select": "none",
    paddingTop: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    // width: "300px",
    // "justify-content": "space-between",
    // marginTop: "20px",
    // height: `calc(100% - ${theme.mixins.toolbar.minHeight + 8}px)`,
  },
  contentHorizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    paddingTop: "4px",
    paddingRight: "10px",
    alignSelf: "center",
    height: "42px",
  },
  logoBigger: {
    alignSelf: "center",
    height: "60px",
  },
}));

export default useStyles;
