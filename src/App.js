import React, { useState, useEffect } from "react";
import  api from './services/api';
import "./styles.css";
var _ = require("lodash");



function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
      console.log(response.data, "dados");
    });
  }, []);
  
  
  async function handleAddRepository() {
    const repository = {
      title: "test title",
      url: "https://github.com/repoteste",
      techs: ['tech1', 'tech2']
    };
    const response = await api.post('/repositories', repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      setRepositories(_.reject(repositories, {id: id}))
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
