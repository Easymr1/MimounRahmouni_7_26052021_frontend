import { useState, useEffect } from "react";

const Home = () => {

    useEffect(async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, text: texte, employeID: employesId})
        };
        fetch('http://localhost:3001/api/employes/login', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
            },[stop])
    
    return
}

export default Home;