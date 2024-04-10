
import { styled, Box, Typography } from '@mui/material';
import image from "../../assets/images/i1.jpg";
const Image = styled(Box)`
    width: 100%;
    background: url(${image})  center/100% #000;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 1024px) {
        height: 400px;
    }
    @media (max-width: 768px) {
        height: 200px;
        margin-top:-10px;
    }
`;

const Heading = styled(Typography)`
    font-size: 60px;
    color: #a688fa;
    background:#000;
    line-height: 1;
    @media (max-width: 768px) {
        font-size: 30px; 
    }
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
    padding:0px 30px;
    @media (max-width: 768px) {
        font-size: 12px; 
    }
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>TrendSays.</Heading>
            <SubHeading>Stay Ahead with TrendSays: Unveiling Tomorrow's Trends Today</SubHeading>
        </Image>
    )
}

export default Banner;