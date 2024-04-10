
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Email, url } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import imgc from '../../assets/images/i2.jpg';
const Banner = styled(Box)`
    background-image: url(${imgc});
    width: 100%;
    height: 400px;
    background-size: cover;
    @media (max-width: 1024px) {
        height: 400px;
    }
    @media (max-width: 768px) {
        height: 200px;
        margin-top:-10px;
    }
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
    text-align: center;
`;

const Text = styled(Typography)`
    color: #8b8b8b;
`;


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Text variant="h3">Get in Touch</Text>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="https://www.linkedin.com/in/vachaspati-annaldas/" color="inherit" target="_blank" style={{margin:"7px 2px"}}>
                        <LinkedIn/>
                    </Link> <br />
                    or send me an Email 
                    <Link href="mailto:annaldasvachaspati@gmail.com?Subject=This is a subject" target="_blank" color="inherit" style={{margin:"7px 2px"}}>
                        <Email />
                    </Link> <br />
                    or reach out to me via my portfolio 
                    <Link href="https://vachaspati-portfolio.vercel.app/" target="_blank" color="inherit" style={{margin:"7px 2px"}}>
                        <LanguageIcon />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;