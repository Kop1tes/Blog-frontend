import React from 'react';
import {Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { Link, useParams } from 'react-router-dom';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {   //добавление картинки
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);   //передаем картинку на сервер
      const {data} = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error)
      alert('Ошибка при загрузке файла!')
    }
  };

  const onClickRemoveImage = () => {    //удаление картинки
    setImageUrl();
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

//   const onSubmit = async () => {
//    try {
//      setLoading(true);

//      const fields = {
//        title,
//        imageUrl,
//        tags: tags.split(','),
//        text,
//      };

//      const { data } = await axios.post('/posts', fields);
     
//      const id = data._id;   // вытаскиваем статью

//      navigate(`/posts/${id}`);    //делаем переход на posts, то есть переводим пользователя на статью если она создана
//    } catch (error) {
//      console.warn(error);
//      alert('Ошибка при создании статьи!')
//    }
//  }

const onSubmit = async () => {
  try {
    setLoading(true);

    const fields = {
      title,
      imageUrl,
      tags,
      text,
    };

    const response = await axios.post('/posts', fields);
    const { data } = response;

    // Проверка наличия _id в ответе
    const id = data.post._id;

    if (id) {
      navigate(`/posts/${id}`);
    } else {
      console.error('Отсутствует _id в ответе сервера');
      alert('Ошибка при создании статьи!');
    }
  } catch (error) {
    console.error(error);

    // Проверьте дополнительные сведения об ошибке, если они есть
    if (error.response && error.response.data) {
      console.error('Подробности об ошибке:', error.response.data);
    }

    alert('Ошибка при создании статьи!');
  } finally {
    setLoading(false);
  }
};



  
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if  (!window.localStorage.getItem('token') && !isAuth) {    //если нет токена для доступа, то выкидывает на главную
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={()=> inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options} />
      <div className={styles.buttons}>
  <Button onClick={onSubmit} size="large" variant="contained">
    Опубликовать
  </Button>
  <Link to="/">
    <Button size="large">Отмена</Button>
  </Link>
</div>
    </Paper>
  );
};
