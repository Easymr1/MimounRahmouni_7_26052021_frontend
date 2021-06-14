import React from 'react';
import axios from 'axios';
import Publier from './Publier'

export default class Home extends React.Component {
    state = {
      publications: []
    }
  
    componentDidMount() {
      axios.get(`http://localhost:3001/api/publication/`)
        .then(res => {
          const publications =res.data.results;
          console.log(publications)
          this.setState( {publications} );
        })
    }
  
    render() {
      return (
        <div>
            <Publier />

        <h3>Écrire une publication</h3>
        <section>
          { this.state.publications.map(publication => 
          <article> 
                <h2>{publication.titre}</h2>
                <p>{publication.texte}</p>
          </article>
             
          
          
          
        
          
          )}
        </section>
        
        </div>
      )
    }
  }