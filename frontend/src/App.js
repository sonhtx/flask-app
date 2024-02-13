import './App.css';
import {useState, useEffect} from 'react';
import ArticlesList from './components/ArticlesList';
import Form from './components/Form';

function App() {
  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method': 'GET', 
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  })

  const editArticle = (article) => {
    setEditedArticle(article)
  }

  const updatedData = (article) => {
    const new_articles = articles.map(my_article => {
      if (my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_articles)
  }

  const insertedArticle = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false
      } else {
        return true
      }
    })
    setArticles(new_articles)
  }

  const openForm = () => {
    setEditedArticle({title: '', body: ''})
  }
  
  return (
    <div className="App">
      <div className='row'>
        <div className='col'>
          <h1>Flask and ReactJS App</h1>
        </div>

        <div className='col'>
          <button
          className='btn btn-success'
          onClick={openForm}>
            Insert Article 
          </button>
        </div>
      </div>
      
      

      <ArticlesList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle}/>
      {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} insertedArticle = {insertedArticle}/> : null}

    </div>
  );
}

export default App;
