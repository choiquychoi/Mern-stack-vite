import Box from '@mui/material/Box'

function BoardContent() {
    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            width: '100%',
            height: () => `calc(100vh - $(theme.trello.appBarHeigth) - $(theme.trello.BoardHeigth))`,
            display: 'flex',
            alignItems: 'center'
        }}
        >
        </Box>
    )
}

export default BoardContent
