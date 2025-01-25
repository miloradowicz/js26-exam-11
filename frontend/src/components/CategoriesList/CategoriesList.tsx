import { List, ListItem, ListItemText } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectCategories } from '../../store/slices/productsSlice';
import { Link } from 'react-router-dom';

const CategoriesList = () => {
  const categories = useAppSelector(selectCategories);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem component={Link} key='_default' to={`/`}>
        <ListItemText primary='All categories' />
      </ListItem>
      {categories.map((x) => (
        <ListItem component={Link} key={x._id} to={`/categories/${x._id}`}>
          <ListItemText primary={x.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default CategoriesList;
