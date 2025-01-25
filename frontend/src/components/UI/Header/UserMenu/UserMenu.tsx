import { FC, useRef, useState } from 'react';

import { Button, Menu, MenuItem } from '@mui/material';

import { User } from '../../../../types';
import { useAppDispatch } from '../../../../app/hooks';
import { logout } from '../../../../store/thunks/usersThunk';

interface Props {
  user: User;
}

const UserMenu: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button ref={ref} onClick={() => setOpen(true)} variant='contained' disableElevation>
        {user.displayName}
      </Button>
      <Menu anchorEl={ref.current} open={open} onClose={() => setOpen(false)}>
        <MenuItem onClick={async () => await dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
