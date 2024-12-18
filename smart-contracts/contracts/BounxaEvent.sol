//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./Ticket.sol";

interface IBounxaInvitee {
    function addEvent(address eventAddress, address userAddress) external;
}

contract BounxaEvent {
    struct SoldTickets {
        address owner;
        uint256 quantityOwned;
    }

    address public owner;
    string public name;
    uint256 public ticketPrice;
    uint256 public ticketQuantity;
    uint256 public ticketsRemaining;
    mapping(address => SoldTickets) public ticketsSold;
    bool public isActive = true;
    // address public inviteeManagementContractAddress = 0x814a35AF277a9a19051Fc9FD5C646277C4D0D91a;
    // IBounxaInvitee bounxaInviteeContract = IBounxaInvitee(inviteeManagementContractAddress);
    address public ticketNftMinterAddress;

    constructor(
        string memory _name,
        uint256 _ticketPrice,
        uint256 _ticketQuantity,
        address _owner
    ) {
        // TODO: modify to deploy NFT contracts for tickets on creation
        name = _name;
        ticketPrice = _ticketPrice;
        ticketQuantity = _ticketQuantity;
        ticketsRemaining = _ticketQuantity;
        owner = _owner;
        TicketNFT ticketNFT = new TicketNFT(
            address(this), 
            name, 
            "BOUNXA",
            _ticketQuantity
        );
        console.log("the minter", address(ticketNFT));
        ticketNftMinterAddress = address(ticketNFT);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not allowed to carry out this action"
        );
        _;
    }

    function buyTickets(uint256 quantity, address userAddress) external payable {
        require(isActive, "Event has either ended or cancelled");
        require(ticketsRemaining >= quantity, "No tickets remaining");
        ticketsRemaining = ticketsRemaining - quantity;
        TicketNFT ticketNft = TicketNFT(ticketNftMinterAddress);
        // mint ticket here
        for (uint256 i=0; i < quantity; i++) {  //for loop example
            // mint to this address  
            ticketNft.safeMint(userAddress);      
        }
        ticketsSold[userAddress].quantityOwned += quantity;
        ticketsSold[userAddress].owner = userAddress;
        // bounxaInviteeContract.addEvent(address(this), msg.sender);
        // address payable paymentAddress =payable(msg.sender);
        // paymentAddress.transfer(ticketPrice * quantity);

        if (ticketsRemaining == 0) {
            isActive = false;
        }
    }


    function getTicketsSold(address userAddress) external view returns (uint256) {
        return ticketsSold[userAddress].quantityOwned;
    }

    function withdraw() external payable {
        // require(block.timestamp >= endTime, "Event hasn't ended");
        payable(owner).transfer(address(this).balance);
    }

    function cancelEvent() external onlyOwner {
        isActive = false;
    }

    function getTicketNFTAddress() external view returns (address) {
        return ticketNftMinterAddress;
    }

}