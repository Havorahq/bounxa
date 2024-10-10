// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721, ERC721Burnable, Ownable {

    uint256 public minted;
    uint public maxSupply = 100000;

    constructor(
        address initialOwner, 
        string memory name, 
        string memory symbol,
        uint256 _maxSupply
    )
        ERC721(name, symbol)
        Ownable(initialOwner)
    {
        maxSupply = _maxSupply;
        minted = 0;
    }

    function safeMint(address to)
        public
        onlyOwner
    {
        require(minted < maxSupply, "Tickets are sold out"); 
        uint256 newTokenId = minted + 1;   
        _safeMint(to, newTokenId);
        minted = newTokenId;
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}