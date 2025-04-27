const styles = {
  root: {
      marginTop: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
  },
  form: {
      width: "100%",
      "& > * ": {
          marginTop: 8,
      },
  },
  textField: {
      width: "80%",
      maxWidth: "40ch",
  },
  buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
  },
  submit: {
      marginRight: 2,
  },
  snack: {
      width: "50%",
      "& > * ": {
          width: "100%",
      },
  },
  genre: {
      marginLeft: 2,
      marginTop: 1
  },
  fab: {
      marginLeft: 1,
  },
  imageButton: {
      marginTop: 1,
      marginBottom: 2
  },
  imageBox: {
      display: "flex",
      alignItems: "center",
  },
  imageText: {
      marginTop: 2,
      marginLeft: 2,
  }
};

export default styles;
