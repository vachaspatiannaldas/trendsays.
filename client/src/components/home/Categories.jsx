
import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid #282828;
    border-radius: 5px;
`;
    
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #a688fa;
    color: #000;
    font-weight: 600;
    text-decoration: none;
    &:hover {
        background: #7a5af5;
    }
`;
    
const StyledLink = styled(Link)`
    text-decoration: none;
    color: #908d96;
`;
    
    
const BoxTable = styled(Box)`
    margin: 10px;
`;
    
const TableCells = styled(TableCell)`
    background: #282828;
    border-bottom: 1px solid #908d96;

`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    
    return (
        <>
            <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>
            <BoxTable>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCells>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </TableCells>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCells>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink>
                                </TableCells>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
            </BoxTable>
        </>
    )
}

export default Categories;