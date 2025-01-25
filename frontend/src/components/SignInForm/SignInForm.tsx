import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  selectLoading,
  selectLoginError,
} from '../../store/slices/usersSlice.ts';
import { login } from '../../store/thunks/usersThunk.ts';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { GenericError, AuthenticationError } from '../../types';

interface FormData {
  username: string;
  password: string;
}

const initialData: FormData = {
  username: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loading = useAppSelector(selectLoading);
  const loginError = useAppSelector(selectLoginError);

  const [data, setData] = useState<FormData>(initialData);

  const getFieldError = (fieldName: string) => {
    try {
      return loginError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login(data)).unwrap();
      navigate('/');
    } catch (e) {
      if ((e as AuthenticationError).errors) {
        return;
      }

      if ((e as GenericError).message) {
        enqueueSnackbar((e as GenericError).message, { variant: 'error' });
      } else if ((e as Error).message) {
        enqueueSnackbar((e as Error).message, { variant: 'error' });
      }
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <PersonAddIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12} minHeight={80}>
            <TextField
              required
              fullWidth
              label='Username'
              name='username'
              value={data.username}
              onChange={handleChange}
              error={!!getFieldError('username')}
              helperText={getFieldError('username')}
            />
          </Grid>
          <Grid size={12} minHeight={80}>
            <TextField
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              value={data.password}
              onChange={handleChange}
              error={!!getFieldError('password')}
              helperText={getFieldError('password')}
            />
          </Grid>
        </Grid>
        <Button
          type='submit'
          loading={loading}
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default SignInForm;
