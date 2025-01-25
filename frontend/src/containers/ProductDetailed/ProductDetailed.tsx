import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteProduct,
  loadCategories,
  loadProduct,
} from '../../store/thunks/productsThunk';
import { selectCurrentProduct } from '../../store/slices/productsSlice';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
} from '@mui/material';
import { baseURL } from '../../constants';
import { selectUser } from '../../store/slices/usersSlice';
import img404 from '../../assets/images/404.svg';

const ProductDetailed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const product = useAppSelector(selectCurrentProduct);
  const user = useAppSelector(selectUser);

  const { id } = useParams();

  const load = useCallback(async () => {
    await dispatch(loadCategories());

    if (id) {
      await dispatch(loadProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async () => {
    if (product) {
      await dispatch(deleteProduct(product._id));
    }
    navigate('/');
  };

  return (
    <Container maxWidth='md'>
      {product && (
        <Card sx={{ mx: 'auto' }}>
          <CardMedia
            component='img'
            height='300'
            image={
              product.imageUrl
                ? new URL(product.imageUrl, new URL('images/', baseURL)).href
                : img404
            }
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {product.title}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {product.description}
            </Typography>{' '}
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {product.price}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {product.seller.displayName}
            </Typography>{' '}
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {product.seller.phoneNumber}
            </Typography>
          </CardContent>
          {user?._id === product.seller._id ? (
            <CardActions>
              <Button size='small' onClick={handleDelete}>
                Delete
              </Button>
            </CardActions>
          ) : null}
        </Card>
      )}
    </Container>
  );
};

export default ProductDetailed;
