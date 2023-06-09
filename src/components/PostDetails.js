import styles from './PostDetails.module.css'

import {Link} from 'react-router-dom'

const PostDetails = ({post}) => {
  return (
    <div className={styles.post_detail}>
      <div className={styles.control}>
        <img src={post.image} alt={post.title} />
      </div>
        <h2>{post.title}</h2>
        <p className={styles.createdby}>{post.createdBy}</p>
        <div className={styles.tags}>
            {post.tagsArray.map((tag) =>(
                <p key={tag}><span>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className={styles.btn}>Ler</Link>
    </div>
  )
}

export default PostDetails