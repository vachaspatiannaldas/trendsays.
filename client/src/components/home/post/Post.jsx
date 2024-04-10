
import { styled, Box, Typography } from '@mui/material';
import imagec from '../../../assets/images/i2.jpg';
const Container = styled(Box)`
    border: 1px solid #282828;
    background: #282828;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #8b8b8b;
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    color: #8b8b8b;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : imagec;
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    )
}

export default Post;