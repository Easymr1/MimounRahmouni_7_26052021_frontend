import {useState, useEffect} from 'react';
import Publier from './Publier';
import axios from 'axios';


 const Home = () => {
    const [getPublication, setGetPublication] = useState([])

    const [refresh, setRefresh] = useState(false)
    console.log(refresh)
    useEffect(() => {
        axios.get('http://localhost:3001/api/publication/')
        .then(res => setGetPublication(res.data.results), setRefresh(false))
        .catch(err => console.error(err))
    }, [refresh])

    


    return (
        <section className='section'>
            <Publier />
            <button onClick={() => setRefresh(true)}>Actualiser</button>
            {getPublication.map(publication =>
                <article key={publication.id}>
                <h3>{publication.titre}</h3>
                <p>{publication.texte}</p>
                <Commentaire id={publication.id} refresh={refresh}/>
            </article>
                )}
        </section>
    )
}

function Commentaire ({id, refresh}) { 
    const [getCommentaires, setGetCommentaires] = useState([])
useEffect(() => {
        axios.get(`http://localhost:3001/api/commentaire/${id}`)
        .then(res => setGetCommentaires(res.data.results))
        .catch(err => console.error(err))
    }, [refresh])

    return (
        <div>
            {getCommentaires.map(commentaire => 
                <div key={commentaire.id}>
                    <h5>{commentaire.texte}</h5>
                </div>
            )}
        </div>
    )
}

export default Home