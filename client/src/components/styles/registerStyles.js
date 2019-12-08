const registerStyles = theme => ({
	paper: {
		boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    margin: 20
	},
	outer: {
		padding: 20
	},
	image: {
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
    },
    grad: {
        background: "linear-gradient(to bottom right, rgba(209, 25, 13, 0.9) 0%, rgba(34, 31, 31, 0.9) 100%)",
        height: "auto",
        minHeight: "100vh"
    },
    wrapper: {
      display: "inline-block",
      position: "relative",
      padding: "8.85px 13px"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch"
    },
    textField: {
      width: "100%",
      boxSizing: "border-box",
      fontWeight: "300",
      textOverflow: "ellipsis",
      transition: ".4s all"
    },
    button: {
      position: "relative",
      width: "100%",
      borderRadius: "3px",
      boxSizing: "border-box",
      marginTop: "20px"
    }
})

export default registerStyles