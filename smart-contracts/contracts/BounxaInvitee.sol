//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "./BounxaEvent.sol";


// this is a smart contract that keeps track of all the events a user has tickets for.

contract BounxaInvitee {
    mapping(address => address[]) public eventsInvitedTo;

    function addEvent(address eventAddress, address userAddress) public {
        eventsInvitedTo[userAddress].push(eventAddress);
    }

    function getEventsInvitedTo(address userAddress) public view returns (address[] memory) {
        return eventsInvitedTo[userAddress];
    }
}