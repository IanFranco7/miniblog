import styles from './CreatePost.module.css'

import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'


const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    setFormError('')

    //validate image url

    //criar array de tags
    const tagsArray = tags.split(',').map((tag) =>tag.trim().toLowerCase())

    //checar todos os valores
    if(!title || !image || !body || !tags){
      setFormError("Preencha todos os campos")
    }

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //redirect to home page
      navigate("/")
  }
  return (
    <div className={styles.createPost}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo: </span>
          <input type="text" name='title' required placeholder='Pense num bom titulo' value={title}
           onChange={(e) => setTitle(e.target.value) } />
        </label>
        <label>
          <span>Url da imagem: </span>
          <input type="url" name='image' required placeholder='Insira uma imagem' value={image}
           onChange={(e) => setImage(e.target.value) } />
        </label>
        <label>
          <span>Conteudo: </span>
          <textarea  name='body' required placeholder='Insira o conteudo do posto' value={body}
           onChange={(e) => setBody(e.target.value) } />
        </label>
        <label>
          <span>Tags</span>
          <input type="text" name='tags' required placeholder='Insira as tags separadas por virgula' value={tags}
           onChange={(e) => setTags(e.target.value) } />
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && (
          <button className='btn' disabled>Aguarde...</button>
        )}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
      </div>
  )
}

export default CreatePost