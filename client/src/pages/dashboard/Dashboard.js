import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import DashboardNavbar from "../../components/DashboardNavbar";
import {
    Container,
    Content,
    LeftSide,
    RightSide,
    Input,
    LeftWrapper,
    Title,
    Text,
    Button,
    SvgItem,
    Form
} from "./Styled";

const Dashboard = () => {
    const url = process.env.REACT_APP_API_ENDPOINT
    const navigate = useNavigate()
    const [formData,setFormData] =  useState()
    const {user} = useSelector(state => state.auth)
    const onSubmit = async(e) =>{
        e.preventDefault();
        const res = await axios.get(url+'/users/'+formData);
        const message = res.data.message;
        const email = res.data.email;
        if(email) {
            navigate('/login',{state:{email}})
        }else if(message) {
            navigate('/register',{state:{email:formData}})
        }
    }


    return (
        <>
            <DashboardNavbar/>
            <Container>
                <Content>
                    <LeftSide>
                        <LeftWrapper>
                            <Title>Trello helps teams move work forward.</Title>
                            <Text>
                                Collaborate, manage projects, and reach new productivity peaks.
                                From high rises to the home office, the way your team works is
                                unique—accomplish it all with Trello.
                            </Text>
                            {user ? (
                                    <main>
                                        Welcome to Trello
                                    </main>)
                                : (
                                    <>
                                        <Form onSubmit={onSubmit}>
                                            <Input type="email" placeholder='Email' onChange={(e) =>{setFormData(e.target.value)}}/>
                                            <Button type='submit'>Sign up-It's free</Button>
                                        </Form>
                                    </>
                                )
                            }
                        </LeftWrapper>
                    </LeftSide>
                    <RightSide>
                        <SvgItem src="https://images.ctfassets.net/rz1oowkt5gyp/5QIzYxue6b7raOnVFtMyQs/113acb8633ee8f0c9cb305d3a228823c/hero.png?w=1200&fm=webp" />
                    </RightSide>
                </Content>
            </Container>
        </>
    );
};

export default Dashboard;