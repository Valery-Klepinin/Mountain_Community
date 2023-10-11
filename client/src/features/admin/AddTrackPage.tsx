import React, { useRef, useState } from 'react';
import { useAppDispatch } from '../../store';
import { addTrack } from '../tracks/trackSlice';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel, Button } from '@mui/material';

type TracksListProps = {
  loading: boolean;
};

function FormAdd({ loading }: TracksListProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [length, setLength] = useState(0);
  const [tent, setTent] = useState(false);
  const [waterfield, setWaterfield] = useState(false);
  const [bicycle, setBicycle] = useState(false);
  const [time, setTime] = useState(0);
  const [height, setHeight] = useState(0);
  const [startLatitude, setStartLatitude] = useState('');
  const [startLongitude, setStartLongitude] = useState('');
  const [endLatitude, setEndLatitude] = useState('');
  const [endLongitude, setEndLongitude] = useState('');

  const img = useRef<HTMLInputElement>(null);

  const handleAddTrack = (e: React.FormEvent): void => {
    e.preventDefault();
    if (img.current?.files?.length) {
      let formData = new FormData();
      for (let key in img.current.files) {
        formData.append(`img`, img.current.files[key]);
      }

      formData.append('title', title);
      formData.append('description', description);
      formData.append('length', length.toString());
      formData.append('tent', tent.toString());
      formData.append('waterfield', waterfield.toString());
      formData.append('bicycle', bicycle.toString());
      formData.append('time', time.toString());
      formData.append('height', height.toString());
      formData.append('startLatitude', startLatitude);
      formData.append('startLongitude', startLongitude);
      formData.append('endLatitude', endLatitude);
      formData.append('endLongitude', endLongitude);
      dispatch(addTrack(formData));
    }
    navigate('/tracks');
  };
  return (
    <Box
      component="form"
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleAddTrack}
    >
      <input id="outlined-basic" type="file" ref={img} name="img" multiple />
      <div className="prodForm__div"></div>
      <TextField
        id="outlined-basic"
        label="Заголовок"
        variant="outlined"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        id="outlined-basic"
        label="Долгота начала маршрута"
        variant="outlined"
        type="text"
        value={startLongitude}
        onChange={(e) => setStartLongitude(e.target.value)}
        name="startLongitude"
      />

      <TextField
        id="outlined-basic"
        label="Описание"
        variant="outlined"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
      />
      <TextField
        id="outlined-basic"
        label="Долгота завершения маршрута"
        variant="outlined"
        type="text"
        value={endLongitude}
        onChange={(e) => setEndLongitude(e.target.value)}
        name="endLongitude"
      />

      <TextField
        id="outlined-basic"
        label="Длинна маршрута в метрах"
        variant="outlined"
        type="number"
        value={length}
        onChange={(e) => setLength(+e.target.value)}
        name="length"
      />
      <TextField
        id="outlined-basic"
        label="Широта начала маршрута"
        variant="outlined"
        type="text"
        value={startLatitude}
        onChange={(e) => setStartLatitude(e.target.value)}
        name="startLatitude"
      />
      <TextField
        id="outlined-basic"
        label="Время в пути (мин)"
        variant="outlined"
        type="number"
        value={time}
        onChange={(e) => setTime(+e.target.value)}
        name="time"
      />

      <TextField
        id="outlined-basic"
        label="Широта завершения маршрута"
        variant="outlined"
        type="text"
        value={endLatitude}
        onChange={(e) => setEndLatitude(e.target.value)}
        name="endLatitude"
      />
      <TextField
        id="outlined-basic"
        label="Максимальная высота (м)"
        variant="outlined"
        type="number"
        value={height}
        onChange={(e) => setHeight(+e.target.value)}
        name="height"
      />

      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={tent}
              onChange={() => setTent((prev) => !prev)}
              name="tent"
            />
          }
          label="Можно с палаткой"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={waterfield}
              onChange={() => setWaterfield((prev) => !prev)}
              name="waterfield"
            />
          }
          label="Наличие водоемов"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={bicycle}
              onChange={() => setBicycle((prev) => !prev)}
              name="bicycle"
            />
          }
          label="Можно с велосипедом"
        />
      </div>
      <Button
        className="checkbox-btn"
        variant="contained"
        color="success"
        type="submit"
      >
        Добавить
      </Button>
    </Box>
  );
}

export default FormAdd;
