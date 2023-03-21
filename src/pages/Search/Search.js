import styles from './Search.module.css'
import { Link } from 'react-router-dom'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

//components 
import PostDetails from '../../components/PostDetails'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments('posts', search)

  return (
    <div className={styles.search_container}>
        <h1>Resultados encontrados para: {search}</h1>
        <div>
            {posts && posts.length === 0 &&(
                <>
                    <p>Não foram encontrados post a partir da sua busca...</p>
                    <Link to="/" className='btn btn-dark'>Voltar</Link>
                </>
            )}
            {posts && posts.map((post => (
                <PostDetails key={post.id} post={post}/>
            )))}
        </div>
    </div>
  )
}

export default Search