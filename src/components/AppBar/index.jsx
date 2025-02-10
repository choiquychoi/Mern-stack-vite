import React from 'react';
import Box from '@mui/material/Box'
import ModeSelect from '../../components/ModeSelect'

function AppBar() {
    return (
        <Box sx = {{
            backgroundColor: 'primary.light',
            height: (theme) => theme.Trello.BoardBarHeigth,
            width: '100%',
            display: 'flex',
            alignItems: 'center'
        }}>
            <ModeSelect />
        </Box>
    );
}

export default AppBar;