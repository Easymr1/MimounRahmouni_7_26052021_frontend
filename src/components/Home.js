import {useState, useEffect} from 'react';
import Publier from './Publier';
import axios from 'axios';
import Commentaire from './Commentaire'


 const Home = () => {
    const [getPublication, setGetPublication] = useState([])

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/api/publication/')
        .then(res => setGetPublication(res.data.results), setRefresh(false))
        .catch(err => console.error(err))
    }, [refresh])

    return (
        <section className='section'>
            <Publier setRefresh={true}/>
            <button onClick={() => setRefresh(true)}>Actualiser</button>
            {getPublication.map(publication =>
                <article className='publication' key={publication.id}>
                <h3>{publication.titre}</h3>
                <p>{publication.texte}</p>
                
                <Commentaire id={publication.id}/>
            </article>
                )}
        </section>
    )
}



export default Home