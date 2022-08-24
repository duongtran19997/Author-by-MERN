import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useLocation, useNavigate, Link} from "react-router-dom"
import {register, reset} from "../../redux/auth/authSlice";
import LoadingScreen from "../../components/LoadingScreen";
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
    Text,
    Icon,
    Hr
} from "./Styled";
import Background from "../../components/Background";

function Register() {
    const {state} = useLocation()
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
    const {email, username, phoneNumber, password, confirmPassword} = formData
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
            navigate('/login')
        }
        dispatch(reset);
    }, [user, isLoading, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            console.log('password not match')
        } else {
            const userData = {
                username,
                email,
                password,
                phoneNumber
            }
            dispatch(register(userData))
        }
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
                <TrelloIconContainer onClick={() => navigate('/')}>
                    <Icon
                        src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"/>
                </TrelloIconContainer>
                <FormSection>
                    <FormCard>
                        <Form onSubmit={handleSubmit}>
                            <Title>Sign up for your account</Title>
                            <Input type='text' placeholder='Email' name='email' value={formData.email}
                                   onChange={handleChange}/>
                            <Input type='text' placeholder='Username' name='username' onChange={handleChange}/>
                            <Input type='text' placeholder='phoneNumber' name='phoneNumber' onChange={handleChange}/>
                            <Input type='password' placeholder='Password' name='password' onChange={handleChange}/>
                            <Input type='password' placeholder='Confirm Password' name='confirmPassword'
                                   onChange={handleChange}/>
                            <Button type="submit">Register</Button>
                            <Text>
                                By signing up, you confirm that you've read and accepted our{" "}
                                <Link fontSize="0.75rem"
                                      to='https://thuvienphapluat.vn/van-ban/Trach-nhiem-hinh-su/Bo-luat-hinh-su-2015-296661.aspx'> Terms
                                    of Service</Link> and{" "}
                                <Link fontSize="0.75rem"
                                      to='https://thuvienphapluat.vn/van-ban/Trach-nhiem-hinh-su/Bo-luat-hinh-su-2015-296661.aspx'>Privacy
                                    Policy</Link>.
                            </Text>
                        </Form>
                       <Text>You have a account?<Link to='/login'>Login</Link></Text>
                        <Hr/>
                    </FormCard>
                </FormSection>
            </Container>
        </>
    )
}

export default Register