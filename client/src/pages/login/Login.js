import {useEffect, useState} from "react";
import {login, reset} from "../../redux/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Background from "../../components/Background";
import {
    BgContainer,
    Container,
    TrelloIconContainer,
    FormSection,
    FormCard,
    Form,
    Title,
    Input,
    Button,
    Icon,
    Hr,
    Link,
} from "./Styled";
import LoadingScreen from "../../components/LoadingScreen";
import {Alert} from "@mui/material";

function Login() {
    const {state} = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isSuccess, isLoading, isError, message} = useSelector((state => state.auth))
    const [formData, setFormData] = useState({});
    const [status,setStatus] = useState(true)
    const {email, password} = formData
    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    useEffect(() => {
        if (state) {
            setFormData(prevState => ({
                ...prevState,
                email: state.email
            }))
        }
        if (isError) {
            console.log(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset)
    }, [user, isSuccess, isError, message, navigate, dispatch])
    const handleSubmit = (e) => {
        e.preventDefault()
        if(status === true) {
            const userData = {
                email,
                password
            }
            dispatch(login(userData))
        }
    }

    const onValidateEmail = () =>{
        const emailRGEX = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
        const emailResult = emailRGEX.test(formData.email);
        setStatus(emailResult)
        console.log(status)
    }
    const onValidatePassword = () =>{

    }

    if (isLoading) {
        return (
            <LoadingScreen/>
        )
    }
    return (
        <>
            <BgContainer>
                <Background/>
            </BgContainer>
            <Container>
                <TrelloIconContainer onClick={() => {
                    navigate('/')
                }}>
                    <Icon
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"/>
                </TrelloIconContainer>
                <FormSection>
                    <FormCard>

                        <Form onSubmit={handleSubmit}>
                            <Title>Log in to Trello</Title>
                            <Input type='text' placeholder='Email' name='email' value={formData.email || ''}
                                   onChange={handleChange}  onBlur={onValidateEmail} />
                            {/*<p style={{color:'red',margin:0,padding:0}} hidden={status}>Please enter your email</p>*/}
                            {!status &&<Alert severity="error">

                                You need to enter your email — <strong>it wrong now!</strong>
                            </Alert>}
                            <Input type='password' placeholder='Password' name='password'
                                   value={formData.password || ''} onChange={handleChange}/>
                            <Button type="submit" disabled={!status}>Login</Button>
                            <Hr/>
                            <Link
                                fontSize="0.85rem"
                                onClick={() => navigate('/register')}
                            >
                                Sign up for an account
                            </Link>
                        </Form>
                    </FormCard>
                </FormSection>
            </Container>
        </>
    )
}

export default Login