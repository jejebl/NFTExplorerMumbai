import './App.css';
import { useState } from 'react';
import { NFTCard } from "./Component/nftCard";

function App() {

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);

  function onChangeWalletAddress(e) {
    setWalletAddress(e.target.value);
  }

  function onChangeCollection(e) {
    setCollectionAddress(e.target.value);
  }

  const fetchNFTs = async() => {
    console.log(wallet.length);
    console.log(collection.length);
    let nfts; 
    console.log("fetching nfts");
    const api_key = "ppApZP_xrsh7MnIjQfte-8VLzxzAfAjX"
    let baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (collection.length===0 && wallet.length!==0) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      if (nfts) {
        console.log("nfts:", nfts)
        setNFTs(nfts.ownedNfts)
      }
    } else if(collection.length!==0 && wallet.length===0) {
      baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      if(nfts){
        setNFTs(nfts.nfts)
      }
    } else if(collection.length!==0 && wallet.length!==0){
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json());
      if (nfts) {
        console.log("nfts:", nfts)
        setNFTs(nfts.ownedNfts)
      }
    }
  
  }

  return (
    <div className="home_container">
      <div className='title_container'>
        <p className='title'>NFT Explorer for Polygon Mumbai network</p>
      </div>
      <div className="input_wallet_collection_container">
        <label className='label_wallet'>Wallet address:</label>
        <input className='input' onChange={onChangeWalletAddress} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <br></br><br></br>
        <label className="label_collection">Collection address:</label>
        <input className='input' onChange={onChangeCollection} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <br></br><br></br>
        <button className={"button_collection"} onClick={() => {
            fetchNFTs()
          }
        }>Search NFTs</button>
      </div>
      <br></br><br></br><br></br>
      <div className='nftCard_container'>
        {
          NFTs.length!==0 && NFTs.map((nft, index) => {
            return (
              <NFTCard key={index} nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
