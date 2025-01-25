import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { loadCategories } from '../../store/thunks/productsThunk';
import { useAppDispatch } from '../../app/hooks';
import NewProductForm from '../../components/NewProductForm/NewProductForm';

const NewProduct = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <>
      <Typography component='h1' variant='h5'>
        List your product
      </Typography>
      <NewProductForm />
    </>
  );
};

export default NewProduct;
