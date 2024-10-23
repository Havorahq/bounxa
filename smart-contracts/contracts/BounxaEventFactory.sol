//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./BounxaEvent.sol";


contract BounxaEventFactory {

    uint256 public eventCount = 0;
    mapping(address => address[]) public deployedEvents;

    event newEventCreated(address indexed newEventAddress);

    function createBounxaEvent(
        string memory _name,
        uint256 _ticketPrice,
        uint256 _ticketQuantity,
        address _owner) external returns (address) {
        ++eventCount;
        BounxaEvent bounxaEvent = new BounxaEvent(
            _name, 
            _ticketPrice, 
            _ticketQuantity, 
            _owner
        );

        deployedEvents[_owner].push(address(bounxaEvent));
        emit newEventCreated(address(bounxaEvent));
        return address(bounxaEvent);
    }

    function getEvents(address userAddress) public view returns (address[] memory) {
        return deployedEvents[userAddress];
    }

}