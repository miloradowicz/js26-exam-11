import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { ProductBrief } from '../../../types';
import { FC } from 'react';
import { baseURL } from '../../../constants';
import img404 from '../../../assets/images/404.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
  item: ProductBrief;
}

const ProductListItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} variant='outlined'>
      <CardActionArea onClick={() => navigate(`/product/${item._id}`)}>
        <CardMedia
          component='img'
          height='140'
          width='180'
          image={
            item.imageUrl
              ? new URL(item.imageUrl, new URL('images/', baseURL)).href
              : img404
          }
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {item.title}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductListItem;
