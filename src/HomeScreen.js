import React from 'react';
import "./homeScreen.css";
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import requests from "./Request";

function HomeScreen() {
    return (
        <div className="homeScreen">
            
            <Nav/>
            
            <Banner/>
            
            {/* pass title,url as props */}
            <Row title="NETFLIX ORIGINALS" 
            fetchUrl={requests.fetchNetflixOroginals}
            isLargeRow
            />
            <Row title="Trending Now" 
            fetchUrl={requests.fetchTrending}/>
            <Row title="Top Rated" 
            fetchUrl={requests.fetchTopRated}/>
            <Row title="Action movies" 
            fetchUrl={requests.fetchActionMovies}/>
            <Row title="Comedy Movies" 
            fetchUrl={requests.fetchComedyMovies}/>
            <Row title="Horror movies" 
            fetchUrl={requests.fetchHorrorMovies}/>
            <Row title="Romance Movies" 
            fetchUrl={requests.fetchRomanceMovies}/>
            <Row title="Documentaries" 
            fetchUrl={requests.fetchDocumentaries}/>
        </div>
    )
}

export default HomeScreen;
