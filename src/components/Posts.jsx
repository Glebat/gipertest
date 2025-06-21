import { useEffect, useState } from 'react';
import './Posts.css';

function Posts() {
  const [data, setData] = useState([]);
  const [list, setList] = useState(1);
  const numberposts = 10;

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=${numberposts}&_page=${list}`
        );
        if (!response.ok) {
          throw new Error('Ошибка загрузки');
        }
        const jsonData = await response.json();
        setData(list === 1 ? jsonData : olddata => [...olddata, ...jsonData]);
      } catch (error) {
        console.error('Ошибка при загрузке:', error);
      }
    }

    loadData();
  }, [list]);

  const handleBack = () => {
    if (list > 1) {
      setList(list - 1);
      setData(prevData => prevData.slice(0, -numberposts));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Посты</h2>
        <div className="buttons">
          <button className="button" onClick={() => setList(oldlist => oldlist + 1)}>Загрузить ещё</button>
          {list > 1 && (
            <button className="button back" onClick={handleBack}> Назад </button> )}
        </div>
      </div>
      
      <ul className="posts-list">
        {data.map((post) => (
          <li key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;