import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"
function App() {
const [livros, setLivros] = useState([]);
const [novoLivro, setNovoLivro] = useState({
  isbn: '',
  titulo: '',
  editora : '',
  genero: '',
  autor: '',
});
useEffect(() => {
  fetchLivros();
}, []);
const fetchLivros = async () => {
  try {
    const response = await axios.get('http://localhost:8090/livros');
    setLivros(response.data);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
  }
};
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNovoLivro((prevLivro) => ({
    ...prevLivro,
    [name]: value,
  }));
};
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post('http://localhost:8090/livros', novoLivro);
    fetchLivros();
    setNovoLivro({
      placa: '',
      montadora: '',
      modelo: '',
      ano: '',
    });
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
  }
};
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8090/livros/${id}`);
    fetchLivros();
  } catch (error) {
    console.error('Erro ao excluir veículo:', error);
  }
};
const handleUpdate = async (id, livroAtualizado) => {
  try {
    await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
    fetchLivros();
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
  }
};
return (
  <div>
    {/* Cabeçalho */}
    <h1>Gerenciamento de Veículos</h1>

    {/* Formulário de adição de veículo */}
    <form onSubmit={handleSubmit}>
      {/* Campo para a placa */}
      <input
        type="text"
        name="placa"
        placeholder="Placa"
        value={novoLivro.placa}
        onChange={handleInputChange}
      />
      {/* Campo para a montadora */}
      <input
        type="text"
        name="montadora"
        placeholder="Montadora"
        value={novoLivro.montadora}
        onChange={handleInputChange}
      />
      {/* Campo para o modelo */}
      <input
        type="text"
        name="modelo"
        placeholder="Modelo"
        value={novoLivro.modelo}
        onChange={handleInputChange}
      />
      {/* Campo para o ano */}
      <input
        type="number"
        name="ano"
        placeholder="Ano"
        value={novoLivro.ano}
        onChange={handleInputChange}
      />
      {/* Botão de envio do formulário */}
      <button type="submit">Adicionar Veículo</button>
    </form>

    {/* Lista de veículos */}
    <ul>
      {/* Mapeamento dos veículos */}
      {livros.map((livro) => (
        <li key={livro.id}>
          {/* Exibição dos detalhes do veículo */}
          {livro.isbn} - {livro.titulo} {livro.editora} ({livro.genero}) ({livro.autor})
          
          {/* Botão de exclusão */}
          <button onClick={() => handleDelete(livro.id)}>Excluir</button>
          
          {/* Botão de atualização */}
          <button
            onClick={() =>
              handleUpdate(livro.id, {
                ...livro,
                modelo: 'Novo livro Atualizado', // Exemplo de atualização
              })
            }
          >
            Atualizar
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;