import './nftCard.css';

export const NFTCard = ({ nft }) => {

  return (
      <div className="nftCard_display">

        <div className="nftCard_img_container">
            <img alt='nft' className="nftCard_img" src={nft.media[0].gateway} ></img>
        </div>

        <div className="nftCard_metadata_container">

            <div>
                <h2 className="nftCard_title">{nft.title}</h2>
                <p className="nftCard_tokenId">Token Id:</p>
                {parseInt(nft.id.tokenId)}
                <p className="nftCard_name_collection" >Name of the collection:</p>
                {nft.contractMetadata.name}
                <p className="nftCard_address" >Address of the collection:</p>
                <p className='nftCard_contractaddress'>{nft.contract.address}</p>
            </div>

            <div className="nftCard_description_container">
                <p className="nftCard_description">Description:</p>
                {nft.description}
            </div>

        </div>

      </div>
  )
}