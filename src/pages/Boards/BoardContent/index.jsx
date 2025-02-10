import { Box } from '@mui/material';

function BoardContent() {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            width: '100%',
            height: theme => `calc(100vh - ${theme.Trello.BoardBarHeigth} - ${theme.Trello.AppBarHeigth})`,
            display: 'flex',
            alignItems : 'center',
        }}>
            Board content
        </Box>
    );
}

export default BoardContent;