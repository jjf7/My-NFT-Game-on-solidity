import Web3 from 'web3'

    if(typeof window.ethereum != "undefined") {
        window.web3 = new Web3(window.ethereum); 
        window.ethereum.enabled
    }else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider); 
    }
    else{
        window.alert("Please install Metamask")
    }
