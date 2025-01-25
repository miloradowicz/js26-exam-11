import { Container } from '@mui/material';

import Header from './components/UI/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Products from './containers/Products/Products';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import { useSnackbar } from 'notistack';
import { useAppSelector } from './app/hooks';
import { selectLastError } from './store/slices/productsSlice';
import { useEffect } from 'react';
import Page404 from './containers/Page404/Page404';
import NewProduct from './containers/NewProduct/NewProduct';
import ProductDetailed from './containers/ProductDetailed/ProductDetailed';

const App = () => {
  const { enqueueSnackbar } = useSnackbar();

  const lastError = useAppSelector(selectLastError);

  useEffect(() => {
    if (lastError) {
      enqueueSnackbar(lastError.message, { variant: 'error' });
    }
  }, [enqueueSnackbar, lastError]);

  return (
    <>
      <Header />
      <Container sx={{ py: 3, px: 2 }}>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/categories/:id' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetailed />} />
          <Route path='/new' element={<NewProduct />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
