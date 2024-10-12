//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./BounxaEvent.sol";


contract BounxaEventFactory {

    uint256 public eventCount = 0;
    mapping(address => address[]) public deployedEvents;

    event newEventCreated(address indexed newEventAddress);

    function createBounxaEvent(
        string memory _visibility,
        uint256 _startTime,
        uint256 _endTime,
        string memory _location,
        string memory _description,
        string memory _image,
        string memory _name,
        uint256 _ticketPrice,
        uint256 _ticketQuantity) external returns (address) {
        ++eventCount;
        BounxaEvent bounxaEvent = new BounxaEvent(
            _visibility, 
            _startTime, 
            _endTime, 
            _location, 
            _description, 
            _image, 
            _name, 
            _ticketPrice, 
            _ticketQuantity, 
            eventCount,
            msg.sender
        );

        deployedEvents[msg.sender].push(address(bounxaEvent));
        emit newEventCreated(address(bounxaEvent));
        return address(bounxaEvent);
    }

    function getEvents(address userAddress) public view returns (address[] memory) {
        return deployedEvents[userAddress];
    }

}