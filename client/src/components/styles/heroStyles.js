const heroStyles = theme => ({
    heroText: {
        color: "white",
        fontSize: "calc(12px + 8.5vw)",
        fontFamily: "Dancing Script, cursive",
    },
    heroText1: {
        color: theme.palette.primary.main,
        fontSize: "calc(3.5vw)",
        fontFamily: "Dancing Script, cursive",
        padding: 10
    },
    buttonGroup: {
        padding: 20
    },
    Button: {
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        marginLeft: "1rem",
        marginRight: "1rem",
        fontSize: "1rem",
        fontFamily: 'Roboto',
        borderRadius: "0",
        color: "white",
        '&:active, &:focus': {
            boxShadow: 'none',
        },
    },
    wrapper1: {
        padding: 10
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
    round2: {
       fontSize: "calc(12px + 1.5vw)",
       fontFamily: "Roboto"
    },
    image: {
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
    },
    outer: {
        padding: 20
    },
    grad: {
        background: "linear-gradient(to bottom right, rgba(209, 25, 13, 0.9) 0%, rgba(34, 31, 31, 0.9) 100%)",
        height: "auto",
        minHeight: "100vh"
    },
    signIn: {
        fontFamily: "Dancing Script, cursive"
    },
    wrapper: {
        display: "inline-block",
        position: "relative",
        padding: "8.85px 13px",
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
        transition: ".4s all",
    },
    button: {
        position: "relative",
        width: "100%",
        borderRadius: "3px",
        boxSizing: "border-box",
        marginTop: "20px",
    },
})

export default heroStyles
