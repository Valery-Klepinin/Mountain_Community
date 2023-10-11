import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { RegisterUserData } from '../types/User';
import { register } from '../redux/userSlice';
import useStyles from '../css/RegisterFormPage.module.css'; // Импортируем стили

function RegisterFormPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onHandleRegSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const data: RegisterUserData = {
      email,
      name,
      password,
    };

    dispatch(register(data));
    navigate('/');
  };

  return (
    <div className={useStyles.formContainer}>
      <form
        onSubmit={onHandleRegSubmit}
        className={useStyles.form_addUser}
        id="regUser"
      >
        <h2 className={useStyles.regTitle}>Регистрация</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your name"
          name="name"
          className={useStyles.input}
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          name="email"
          className={useStyles.input}
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          name="password"
          className={useStyles.input}
          required
        />

        <button id="regBtn" type="submit" className={useStyles.input}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default RegisterFormPage;
