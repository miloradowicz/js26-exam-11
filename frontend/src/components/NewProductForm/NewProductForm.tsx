import {
  Button,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectError, selectSending } from '../../store/slices/newProductSlice';
import { createProduct } from '../../store/thunks/newProductThunk';
import { GenericError, ValidationError } from '../../types';
import { CloudUpload } from '@mui/icons-material';
import FileInput from '../UI/FileInput/FileInput';
import { enqueueSnackbar } from 'notistack';
import { selectCategories } from '../../store/slices/productsSlice';

interface Data {
  title: string;
  description: string;
  price: number;
  image: File | null;
  category: string;
}

const initialData: Data = {
  title: '',
  description: '',
  price: 0,
  image: null,
  category: '',
};

const NewProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector(selectCategories);

  const [data, setData] = useState<Data>(initialData);

  const sending = useAppSelector(selectSending);
  const error = useAppSelector(selectError);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setData((data) => ({ ...data, [e.target.name]: file }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createProduct(data)).unwrap();
      navigate('/');
    } catch (e) {
      if ((e as ValidationError).errors) {
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={12} minHeight={80}>
          <TextField
            required
            fullWidth
            label='Title'
            name='title'
            value={data.title}
            onChange={handleChange}
            error={!!getFieldError('title')}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid size={12} minHeight={80}>
          <TextField
            required
            fullWidth
            name='description'
            label='Description'
            type='description'
            value={data.description}
            onChange={handleChange}
            error={!!getFieldError('description')}
            helperText={getFieldError('description')}
          />
        </Grid>
        <Grid size={12} minHeight={80}>
          <TextField
            required
            fullWidth
            name='price'
            label='Price'
            value={data.price}
            onChange={handleChange}
            error={!!getFieldError('price')}
            helperText={getFieldError('price')}
          />
        </Grid>
        <Grid size={12} minHeight={80}>
          <FileInput
            fullWidth
            label='Image'
            name='image'
            required
            buttonText='Upload'
            buttonProps={{ startIcon: <CloudUpload /> }}
            onChange={handleFileInputChange}
            error={!!getFieldError('imageUrl')}
            helperText={getFieldError('imageUrl')}
          />
        </Grid>
        <Grid size={12} minHeight={80}>
          <FormControl fullWidth>
            <InputLabel id='category-label'>Category</InputLabel>
            <Select
              labelId='category-label'
              name='category'
              required
              value={data.category}
              label='Category'
              onChange={handleSelectChange}
              error={!!getFieldError('imageUrl')}
            >
              {categories.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.name}
                </MenuItem>
              ))}
            </Select>
            {!!getFieldError('category') && (
              <FormHelperText error>{getFieldError('category')}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Button
        type='submit'
        loading={sending}
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default NewProductForm;
