import { Grid2 as Grid } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectProducts } from '../../store/slices/productsSlice';
import ProductsListItem from './ProductsListItem/ProductsListItem';

const ProductsList = () => {
  const products = useAppSelector(selectProducts);

  return (
    <Grid container spacing={1} alignItems='stretch'>
      {products.map((x) => (
        <Grid key={x._id} size={4}>
          <ProductsListItem item={x} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
