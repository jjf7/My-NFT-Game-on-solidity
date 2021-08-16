import React from "react";

export default function Main({
  totalSupply,
  cardArray,
  chooseImage,
  flipCard,
  cardsWon,
  tokenURIs
}) {
  return (
    <div className="container-fluid mt-5 text-center">
      <h1>COLECCIONA TOKENS CON <i><code>JFDESOUSA</code></i> GAMES</h1>
      <div className="row">
        <div className=" ">
          <div className="col-md-4 mx-auto">
            {cardArray.map((card, key) => {
              return (
                <img
                  key={key}
                  src={chooseImage(key)}
                  data-id={key}
                  onClick={(event) => {
                    let cardId = event.target.getAttribute("data-id");
                    
                    if (!cardsWon.includes(cardId.toString())) {
                      flipCard(cardId);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="col-md-4  mx-auto">
            <h3>Mis tokens coleccionables: {totalSupply}</h3>
            {tokenURIs.map( (tokenURI, index) => {
                return(
                    <img key={index} src={tokenURI} />
                )
            })}
        </div>
      </div>
    </div>
  );
}
