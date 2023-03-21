import styles from './EditPost.module.css'

import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import {useFetchDocument} from '../../hooks/useFetchDocument'


const EditPost = () => {
  const { id} = useParams()
  const {document: post} = useFetchDocument('posts', id)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() =>{
    if(post){
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)

        const textTags = post.tagsArray.join(',')
        setTags(textTags)
    }
  }, [post])

  const {user} = useAuthValue()

  const {updateDocument, response} = useUpdateDocument('posts')

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
    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }
    updateDocument(id, data)

    //redirect to home page
      navigate("/dashboard")
  }
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
            <h2>Editando Post: {post.title}</h2>
      <p>Altere os dados do post como desejar!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Titulo: </span>
          <input type="text" name='title' required placeholder='Pense num bom titulo' value={title}
           onChange={(e) => setTitle(e.target.value) } />
        </label>
        <label>
          <span>Url da imagem: </span>
          <input type="url" name='image' required placeholder='Insira uma imagem ai' value={image}
           onChange={(e) => setImage(e.target.value) } />
        </label>
        {<p className={styles.preview_title}>Preview da imagem atual:</p>}
        <img src={post.image} className={styles.image_preview} alt={post.title} />
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
        {!response.loading && <button className='btn'>Editar</button>}
        {response.loading && (
          <button className='btn' disabled>Aguarde...</button>
        )}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
        </>
      )}
      </div>
  )
}

export default EditPost