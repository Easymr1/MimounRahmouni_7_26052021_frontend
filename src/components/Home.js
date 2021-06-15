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
            </article>
                )}
        </section>
    )
}

export default Home