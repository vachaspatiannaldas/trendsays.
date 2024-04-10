import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import imagec from '../../assets/images/i2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '500px',
    objectFit: 'contain',
    '@media (max-width: 768px)': {
        height: 'auto',
    },
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
    color:#8b8b8b;
`;

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    background: #282828;
    border-radius: 10px;
    color: #8b8b8b;
`;

const BoxT = styled(Box)`
    margin: 5px 10px;
`;

const ButtonC = styled(Button)`
    background: #a688fa;
    color: #000;
    font-weight:600;
    margin: 5px;
    &:hover {
        background: #7a5af5;
    }
`;

const FaIcon = styled(FontAwesomeIcon)`
    color: #a688fa;
    font-size: 30px;
    margin:7px;
    cursor: pointer;
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : imagec;
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file])

    const savePost = async () => {
        await API.createPost(post);
        navigate('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <FaIcon icon={faPlusCircle} />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <ButtonC onClick={() => savePost()} variant="contained" color="primary">Publish</ButtonC>
            </StyledFormControl>
            <BoxT>
            <StyledTextArea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
            </BoxT>
        </Container>
    )
}

export default CreatePost;