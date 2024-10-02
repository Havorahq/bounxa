//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract BounxaEvent {

    struct SoldTickets {
        address owner;
        uint256 quantityOwned;
    }

    address public owner;
    uint256 public eventId;
    string public visibility;
    string public name;
    uint256 public startTime;
    uint256 public endTime;
    string public location;
    string public description;
    string public image;
    uint256 public ticketPrice;
    uint256 public ticketQuantity;
    uint256 public ticketsRemaining;
    mapping(address => SoldTickets) public ticketsSold;
    bool public isActive = true;

    constructor(
        string memory _visibility,
        uint256 _startTime,
        uint256 _endTime,
        string memory _location,
        string memory _description,
        string memory _image,
        string memory _name,
        uint256 _ticketPrice,
        uint256 _ticketQuantity,
        uint256 _eventId,
        address _owner
    ) {
        visibility = _visibility;
        startTime = _startTime;
        endTime = _endTime;
        location = _location;
        description = _description;
        image = _image;
        name = _name;
        ticketPrice = _ticketPrice;
        ticketQuantity = _ticketQuantity;
        ticketsRemaining = _ticketQuantity;
        owner = _owner;
        eventId = _eventId;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not allowed to carry out this action"
        );
        _;
    }

    // TODO: FUNCTIONS TO IMPLEMENT
    // BUY TICKET
    // GET TICKETS SOLD
    // CANCEL EVENT
    // WITHDRAW FUNDS

    function buyTickets(uint256 quantity) external payable {
        require(isActive, "Event has either been ended or cancelled");
        // require(block.timestamp >= startTime && block.timestamp <= endTime, "Event hasn't started or ended");
        require(msg.value >= ticketPrice * quantity, "Insufficient funds");
        require(ticketsRemaining >= quantity, "No tickets remaining");
        ticketsRemaining = ticketsRemaining - quantity;
        ticketsSold[msg.sender].quantityOwned += quantity;
        ticketsSold[msg.sender].owner = msg.sender;
        // address payable paymentAddress =payable(msg.sender);
        // paymentAddress.transfer(ticketPrice * quantity);

        if (ticketsRemaining == 0) {
            isActive = false;
        }
    }


    function getTicketsSold() external view returns (uint256) {
        return ticketsSold[msg.sender].quantityOwned;
    }

    function withdraw() external payable {
        // require(block.timestamp >= endTime, "Event hasn't ended");
        payable(owner).transfer(address(this).balance);
    }

    function cancelEvent() external onlyOwner {
        isActive = false;
    }

}