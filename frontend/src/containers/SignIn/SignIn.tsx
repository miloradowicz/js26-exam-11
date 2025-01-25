import { Container, Grid2 as Grid, Link } from '@mui/material';
import { Link as routerLink } from 'react-router-dom';
import SignInForm from '../../components/SignInForm/SignInForm';

const SignIn = () => {
  return (
    <Container maxWidth='sm'>
      <SignInForm />
      <Grid container justifyContent='center'>
        <Grid>
          <Link component={routerLink} variant='body2' to='/signup'>
            Not registered yet? Sign up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
