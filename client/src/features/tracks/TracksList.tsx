import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { searchQuery, selectTracks, setSearchQuery } from './trackSlice';
import TrackItem from './TrackItem';
import './trackList.scss';
import { selectUser } from '../user/redux/userSlice';
import { Link } from 'react-router-dom';
import { Button, Checkbox, TextField } from '@mui/material';
import { Form } from 'react-bootstrap';

type TracksListProps = {
  loading: boolean;
};

export default function TracksList({ loading }: TracksListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const tracks = useSelector(selectTracks);
  const search = useSelector(searchQuery);
  const user = useSelector(selectUser);

  const [poisk, setPoisk] = useState(false);
  const [inputServices, setInputServices] = useState('');

  const [sortedTracks, setSortedTracks] = useState([...tracks]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<string | null>(null);

  const [tent, setTent] = useState(false);
  const [waterfield, setWaterfield] = useState(false);
  const [bicycle, setBicycle] = useState(false);

  useEffect(() => {
    if (!loading) {
      setSortedTracks([...tracks]);
    }
  }, [loading, tracks]);

  useEffect(() => {
    setInputServices(search);
  }, [search]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value !== '') {
      setPoisk(true);
    } else {
      setPoisk(false);
    }
    dispatch(setSearchQuery(event.target.value));
  };

  const filteredAll = tracks.filter(
    (track) =>
      track.title.toLocaleLowerCase().includes(search.toLowerCase()) ||
      track.description.toLocaleLowerCase().includes(search.toLowerCase()) ||
      track.rating.toString().includes(search) ||
      track.length.toString().includes(search) ||
      track.height.toString().includes(search) ||
      track.time.toString().includes(search)
  );

  const handleSortClick = (field: string): void => {
    if (sortBy === field) {
      setSortedTracks([...sortedTracks].reverse());
      setSortBy(null);
    } else {
      const sorted = [...sortedTracks].sort((a, b) => {
        if (field === 'length') {
          return a.length - b.length;
        }
        if (field === 'time') {
          return a.time - b.time;
        }
        if (field === 'rating') {
          return b.rating - a.rating;
        }
        return 0;
      });
      setSortedTracks(sorted);
      setSortBy(field);
    }
  };
  const [selectedSortOption, setSelectedSortOption] = useState<string>(''); // Добавляем состояние для выбранной опции сортировки

  const sortOptions = [
    { value: 'length', label: 'Длина маршрута ' },
    { value: 'time', label: 'Время в пути' },
    { value: 'rating', label: 'Рейтинг' },
  ];

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedSortOption(event.target.value);
    handleSortClick(event.target.value);
  };

  const handleFilterClick = (field: string): void => {
    if (filterBy === field) {
      setSortedTracks(tracks);
      setFilterBy(null);
    } else {
      if (field === 'tent') {
        const filter = tracks.filter((track) => track.tent === true);
        setSortedTracks(filter);
        setFilterBy(field);
      }
      if (field === 'bicycle') {
        const filter = tracks.filter((track) => track.bicycle === true);
        setSortedTracks(filter);
        setFilterBy(field);
      }
      if (field === 'waterfield') {
        const filter = tracks.filter((track) => track.waterfield === true);
        setSortedTracks(filter);
        setFilterBy(field);
      }
    }
  };

  const handleShowAllClick = (): void => {
    setSortedTracks([...tracks]);
    setSortBy(null);
    setTent(false);
    setWaterfield(false);
    setBicycle(false);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {user && user.isAdmin && (
        <Link className="add-route" to={'/tracks/add/'}>
          Добавить маршрут
        </Link>
      )}
      <div className="search1">
        <TextField
          className="search"
          type="text"
          onChange={handleSearch}
          value={inputServices}
          label="Поиск по маршрутам"
        />
      </div>
      <div className="tracks-wrapper">
        <div className="tracks-container-sort">
          <div className="checkbox">
            <label className="checkbox-label">
              <div>Можно с палаткой</div>
              <Checkbox
                checked={tent}
                onChange={() => setTent((prev) => !prev)}
                onClick={() => handleFilterClick('tent')}
                name="tent"
                size="small"
              />
            </label>
            <label className="checkbox-label">
              <div>Наличие водоемов</div>
              <Checkbox
                checked={waterfield}
                onChange={() => setWaterfield((prev) => !prev)}
                onClick={() => handleFilterClick('waterfield')}
                name="waterfield"
                size="small"
              />
            </label>
            <label className="checkbox-label">
              <div>Можно на велосипеде</div>
              <Checkbox
                checked={bicycle}
                onChange={() => setBicycle((prev) => !prev)}
                onClick={() => handleFilterClick('bicycle')}
                name="bicycle"
                size="small"
              />
            </label>
            <Button className="checkbox-btn" onClick={handleShowAllClick}>
              Сбросить
            </Button>
          </div>
          <div className="select">
            <label className="select-label">Сортировка: </label>
            <Form.Select
              size="sm"
              className="tracks-container-sort-select"
              onChange={handleSortChange}
              value={selectedSortOption}
            >
              <option value="">Выберите опцию</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        {!poisk ? (
          <div className="tracks-container">
            {sortedTracks.map((track) => (
              <TrackItem track={track} key={track.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="tracks-container">
            {filteredAll.map((track) => (
              <TrackItem track={track} key={track.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
