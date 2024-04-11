import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Component = styled(Box)`
    margin-top: 30px;
    background: #282828;
    padding: 10px;
    border-radius: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
    color: #908d96;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
    color: #908d96;
`;

const CommentDetail = styled(Typography)`
    font-size: 16px;
    color: #908d96;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
    cursor: pointer;
    color: #a688fa;
`;

const FaIcon = styled(FontAwesomeIcon)`
    color: #a688fa;
    font-size: 16px;
    margin: 5px;
`;

const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext)
    
    const removeComment = async () => {
       await API.deleteComment(comment._id);
       setToggle(prev => !prev);
    }

    return (
        <Component>
            <Container>
                <FaIcon icon={faUserCircle} />
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === account.username && <DeleteIcon onClick={() => removeComment()} /> }
            </Container>
            <CommentDetail>{comment.comments}</CommentDetail>
        </Component>
    )
}

export default Comment;