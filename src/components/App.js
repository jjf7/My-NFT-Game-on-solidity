import React, { useState, useEffect } from "react";
import "../web3";
import Token from "../abis/Token.json";
import Navbar from "./Navbar";
import Main from "./Main";
import CARD_ARRAY from "../db";

export default function App() {
  const [acc, setAcc] = useState("");
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenURIs, setTokenURIs] = useState([]);

  const [cardArray, setCardArray] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenId, setCardsChosenId] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);

  useEffect(() => {
    async function loadBlockchainData() {
      const web3 = window.web3;

      const accounts = await web3.eth.getAccounts();

      setAcc(accounts[0]);

      const netId = await web3.eth.net.getId();

      const networkData = Token.networks[netId];

      const token = new web3.eth.Contract(Token.abi, networkData.address);
      setToken(token);

      const totalSupply = await token.methods.totalSupply().call();
      setTotalSupply(totalSupply);

      // Load tokens
      const balanceOf = await token.methods.balanceOf(accounts[0]).call();

      for (var i = 0; i < balanceOf; i++) {
        let id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call();
        let tokenURI = await token.methods.tokenURI(id).call();
        setTokenURIs((prev) => [...prev, tokenURI]);
      }

      setCardArray(CARD_ARRAY.sort(() => 0.5 - Math.random()));
      setLoading(false);
    }

    loadBlockchainData();
  }, []);

  useEffect(() => {
    let alreadyChosen = cardsChosen.length;
    if (alreadyChosen === 2) {
      setTimeout(checkForMatch, 100);
    }
  }, [cardsChosen]);

  useEffect(() => {
    if (cardsWon.length == CARD_ARRAY.length) {
      alert("Has conseguido todos los tokens ");
    }
  }, [cardsWon]);

  function chooseImage(cardId) {
    cardId = cardId.toString();

    if (cardsWon.includes(cardId)) {
      return window.location.origin + "/images/white.png";
    } else if (cardsChosenId.includes(cardId)) {
      return cardArray[cardId].img;
    } else {
      return window.location.origin + "/images/blank.png";
    }
  }

  async function checkForMatch() {
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId === optionTwoId) {
      alert("Has seleccionado la misma imagen hehe!");
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert("Felicidades conseguiste este token!");

      await token.methods
        .mint(acc, CARD_ARRAY[optionOneId].img)
        .send({ from: acc })
        .on("transactionHash", async (hash) => {
          setCardsWon((prev) => [...prev, optionOneId, optionTwoId]);
          setTokenURIs((prev) => [...prev, CARD_ARRAY[optionOneId].img]);
        });
    } else {
      alert("Intenta de nuevo!");
    }

    setCardsChosenId([]);
    setCardsChosen([]);
  }

  async function flipCard(cardId) {
    setCardsChosen((prev) => [...prev, cardArray[cardId].name]);
    setCardsChosenId((prev) => [...prev, cardId]);
  }

  return (
    <>
      <Navbar account={acc} />

      {loading ? (
        <div className="text-center">Cargando ...</div>
      ) : (
        <Main
          totalSupply={totalSupply}
          cardArray={cardArray}
          chooseImage={chooseImage}
          flipCard={flipCard}
          cardsWon={cardsWon}
          tokenURIs={tokenURIs}
        />
      )}
    </>
  );
}
