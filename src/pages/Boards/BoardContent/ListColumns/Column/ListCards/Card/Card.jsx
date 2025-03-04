import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import Attachment from '@mui/icons-material/Attachment'

function Card() {
    return (
        <MuiCard sx={{
            cursor: 'pointer',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
            overflow: 'unset'
        }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://d2zp5xs5cp8zlg.cloudfront.net/image-68676-800.jpg"
                title="green iguana"
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Lizard Green But Sometime ....</Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon/ >}>20</Button>
                <Button size="small" startIcon={<CommentIcon/ >}>15</Button>
                <Button size="small" startIcon={<Attachment/ >}>10</Button>
            </CardActions>
        </MuiCard>
    )
}

export default Card
