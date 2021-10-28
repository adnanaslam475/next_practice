import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Cookies from 'cookies';
import { register } from "../redux/action";
import { wrapper } from "../redux";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect, useDispatch, useSelector } from "react-redux";

const theme = createTheme();

function SignUp({ }) {
    const s = useSelector(s => s)
    console.log('whiole state=========>', s)
    const dispatch = useDispatch()
    const [err, setErr] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let obj = {};
        for (var pair of data.entries()) {
            if (!pair[1].length) {
                setErr(`please enter ${pair[0]}`);
                return;
            }
            obj[pair[0]] = pair[1];
        }
        dispatch(register(obj));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={() => setErr("")}
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onChange={() => setErr("")}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


SignUp.getInitialProps = ({ req, res }) => {
    const cookies = new Cookies(req, res)
    cookies.get('myCookieName')
    cookies.set('myCookieName', 'some-value', {
        httpOnly: true // true by default
    })
    // Delete a cookie
    cookies.set('myCookieName')
    console.log(req, 'res============>',res)
    return {};
}

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//         async ({ req }) => {
//             // console.log("req->>>>>", store.getState().auth);
//         }
// );

export default SignUp;
