import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  login,
  logout,
  register,
  selectUser,
} from '../features/user/redux/userSlice';
import { useAppDispatch } from '../store';
import { Link, Outlet } from 'react-router-dom';
import './header.scss';
import { Button } from 'react-bootstrap';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { LoginUserData, RegisterUserData } from '../features/user/types/User';

export default function Header(): JSX.Element {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  // const openBurgerMenu = (): void => {
  //   setIsBurgerMenuOpen(true);
  // };
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  useEffect(() => {
    // Функция для закрытия бургер-меню при клике за его пределами
    const handleDocumentClick = (e: MouseEvent): void => {
      if (isBurgerMenuOpen) {
        const headerContainer = document.querySelector('.header-container');
        if (headerContainer && !headerContainer.contains(e.target as Node)) {
          // Клик был за пределами хедера, закрываем бургер-меню
          closeBurgerMenu();
        }
      }
    };

    // Добавляем обработчик события клика на весь документ
    document.addEventListener('click', handleDocumentClick);

    // Удаляем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isBurgerMenuOpen]);

  const closeBurgerMenu = (): void => {
    setIsBurgerMenuOpen(false);
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(logout());
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
    setName('');
    setEmail('');
    setPassword('');
  };
  const handleClickOpenSgn = (): void => {
    setOpen2(true);
  };
  const handleCloseSgn = (): void => {
    setOpen2(false);
    setEmail('');
    setPassword('');
  };
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emptyFieldMatchError, setEmptyFieldMatchError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const isEmailValid = (email: string): any => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const onHandleRegSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      setEmptyFieldMatchError(true);
      return;
    }
    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);

      if (password !== confirmPassword) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);

        const data: RegisterUserData = {
          email,
          name,
          password,
        };

        dispatch(register(data));
        setOpen(false);
        setName('');
        setEmail('');
        setPassword('');
      }
    }
  };

  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setEmptyFieldMatchError(true);
      return;
    }

    const data: LoginUserData = {
      email,
      password,
    };

    dispatch(login(data));
    setEmail('');
    setPassword('');
    setOpen2(false);
  };

  const toggleBurgerMenu = (): void => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <>
      <div className="header">
        <div className="header-container">
          <div className="burger-menu" onClick={toggleBurgerMenu}>
            ☰
          </div>

          <div className="left">
            <Link to="/" className="link">
              Главная
            </Link>
            <Link to="/tracks" className="link">
              Маршруты
            </Link>
            <Link to="/map" className="link">
              Карта
            </Link>
          </div>
          <div className="right">
            {user ? (
              <>
                <div className="user"> {user.name}</div>
                <Link to="/favotites">
                  <Button className="link button favorites">Избранное</Button>
                </Link>
                <Link to="/">
                  <button className="link button logout" onClick={handleClick}>
                    Выйти
                  </button>
                </Link>
              </>
            ) : (
              <>
                {/* <Link to="/auth/register" className="link">
                  Регистрация
                </Link> */}
                <Button
                  className="link button register"
                  onClick={handleClickOpen}
                >
                  Регистрация
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                  <form onSubmit={onHandleRegSubmit}>
                    <DialogContent>
                      <DialogContentText></DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Логин"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        error={emptyFieldMatchError}
                        helperText={
                          emptyFieldMatchError ? 'Заполните все поля' : ''
                        }
                      />
                      <TextField
                        margin="dense"
                        id="email"
                        label="Почта"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        error={EmailError}
                        helperText={
                          EmailError
                            ? 'Пожалуйста, введите корректный адрес электронной почты(example@example.com)'
                            : ''
                        }
                      />
                      <TextField
                        margin="dense"
                        id="pass"
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        error={passwordError}
                        helperText={
                          passwordError
                            ? 'Пароль должен содержать минимум 6 символов'
                            : ''
                        }
                      />
                      <TextField
                        margin="dense"
                        id="checkPass"
                        label="Повторите пароль"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        error={passwordMatchError}
                        helperText={
                          passwordMatchError ? 'Пароли не совпадают' : ''
                        }
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Отмена
                      </Button>
                      <Button type="submit" color="primary">
                        Зарегистрироваться
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
                <Button
                  className="link button signin"
                  onClick={handleClickOpenSgn}
                >
                  Войти
                </Button>
                <Dialog
                  open={open2}
                  onClose={handleCloseSgn}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                  <form onSubmit={onHandleSubmit}>
                    <DialogContent>
                      <DialogContentText></DialogContentText>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="email2"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        error={emptyFieldMatchError}
                        helperText={
                          emptyFieldMatchError ? 'Заполните все поля' : ''
                        }
                      />
                      <TextField
                        margin="dense"
                        id="pass2"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        error={emptyFieldMatchError}
                        helperText={
                          emptyFieldMatchError ? 'Заполните все поля' : ''
                        }
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseSgn} color="primary">
                        Отмена
                      </Button>
                      <Button type="submit" color="primary">
                        Войти
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
                {/* <Link to="/auth/login" className="link">
                  Войти
                </Link> */}
              </>
            )}
          </div>
        </div>
        {isBurgerMenuOpen ? (
          <div className="mobile-menu">
            <Link to="/" className="link">
              Главная
            </Link>
            <Link to="/tracks" className="link">
              Маршруты
            </Link>
            <Link to="/map" className="link">
              Карта
            </Link>
            {!user ? (
              <>
                <Button
                  className="link button register"
                  onClick={handleClickOpen}
                >
                  Регистрация
                </Button>
                <Button
                  className="link button signin"
                  onClick={handleClickOpenSgn}
                >
                  Войти
                </Button>
              </>
            ) : (
              <>
                <Link to="/favotites" className="link">
                  Избранное
                </Link>
                <Link to="/">
                  <button className="link button logout" onClick={handleClick}>
                    Выйти
                  </button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}
