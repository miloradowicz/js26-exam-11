import { Container, Grid2 as Grid, Link } from '@mui/material';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Link as routerLink } from 'react-router-dom';

const SignUp = () => {
  return (
    <Container maxWidth='sm'>
      <SignUpForm />
      <Grid container justifyContent='center'>
        <Grid>
          <Link component={routerLink} variant='body2' to='/signin'>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
