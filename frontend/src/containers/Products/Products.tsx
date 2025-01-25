import { Container, Grid2 as Grid } from '@mui/material';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import {
  loadCategories,
  loadProductBriefs,
  loadProductBriefsByCategory,
} from '../../store/thunks/productsThunk';
import { useParams } from 'react-router-dom';

const Products = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const load = useCallback(async () => {
    await dispatch(loadCategories());

    if (id) {
      await dispatch(loadProductBriefsByCategory(id));
    } else {
      await dispatch(loadProductBriefs());
    }
  }, [dispatch, id]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid size={4}>
          <CategoriesList />
        </Grid>
        <Grid size={8}></Grid>
      </Grid>
    </Container>
  );
};

export default Products;
