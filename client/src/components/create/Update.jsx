import React, { useState, useEffect } from 'react';

import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../service/api';
import imagec from '../../assets/images/i2.jpg';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '500px',
    marginTop: '5px',
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
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    color:#8b8b8b;
    &:focus-visible {
        outline: none;
    }
    background: #282828;
    border-radius: 10px;
`;

const BoxTA = styled(Box)`
    margin: 10px;
`;

const FaIcon = styled(FontAwesomeIcon)`
    color: #a688fa;
    font-size: 30px;
    margin:7px;
    cursor: pointer;
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

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');

    const { id } = useParams();

    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    post.picture = response.data;
                    setImageURL(response.data);    
                }
            }
        }
        getImage();
    }, [file])

    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={post.picture || imagec} alt="post" />

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
                <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                <ButtonC onClick={() => updateBlogPost()} variant="contained" color="primary">Update</ButtonC>
            </StyledFormControl>
            <BoxTA>
            <StyledTextArea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
                value={post.description}
            />
            </BoxTA>
        </Container>
    )
}

export default Update;