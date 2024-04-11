import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
    background: #3f3f3f;
    border-radius: 10px;
`;

const ButtonPost = styled(Button)`
    background: #a688fa;
    color: #000;
    font-weight:600;
    &:hover {
        background: #7a5af5;
    }
`;

const FaIcon = styled(FontAwesomeIcon)`
    color: #a688fa;
    font-size: 25px;
`;

const BoxC = styled(Box)`
    margin: 10px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await API.getAllComments(post._id);
    //         if (response.isSuccess) {
    //             setComments(response.data);
    //         }
    //     }
    //     getData();
    // }, [toggle, post]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
                // Handle error appropriately, such as displaying an error message
            }
        }
        getData();
    }, [toggle, post._id]); // Ensure to include post._id as a dependency
    
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
        await API.newComment(comment);
        setComment(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <BoxC>
            <Container>
                <FaIcon icon={faUser} />
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <ButtonPost 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</ButtonPost>             
            </Container>
            <Box>
                {
                    Array.isArray(comments) && comments.length > 0 ? (
                        comments.map(comment => (
                            <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                        ))
                    ) : (
                        <p>No comments available</p>
                    )
                }
            </Box>

        </BoxC>
    )
}

export default Comments;