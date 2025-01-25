import { Link } from 'react-router-dom';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../store/slices/usersSlice';
import UserMenu from './UserMenu/UserMenu';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position='static'>
      <Toolbar
        component='nav'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          variant='h6'
          component={Link}
          color='white'
          sx={{ textDecoration: 'none' }}
          to='/'
        >
          FleaMarket
        </Typography>
        {user ? (
          <Box display='flex' gap={1}>
            <Button
              component={Link}
              variant='contained'
              disableElevation
              to='/new'
            >
              Sell
            </Button>
            <UserMenu user={user} />
          </Box>
        ) : (
          <Box display='flex' gap={1}>
            <Button
              component={Link}
              variant='contained'
              disableElevation
              to='/signin'
            >
              Sign In
            </Button>
            <Button
              component={Link}
              variant='contained'
              disableElevation
              to='/signup'
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
