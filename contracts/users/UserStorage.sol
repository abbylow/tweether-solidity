pragma solidity ^0.5.10;

import "../helpers/BaseStorage.sol";

contract UserStorage is BaseStorage{
    struct Profile {
        uint id;
        bytes32 username;
        bytes32 firstName;
        bytes32 lastName;
        string bio;
        string gravatarEmail;
    }

    mapping(uint => Profile) public profiles;
    mapping(address => uint) public addresses; // address => user ID
    mapping(bytes32 => uint) public usernames; // username => user ID

    uint latestUserId = 0;

    function createUser(
        address _address,
        bytes32 _username,
        bytes32 _firstName,
        bytes32 _lastName,
        string memory _bio,
        string memory _gravatarEmail
    ) public onlyController returns(uint) {
        latestUserId++;

        profiles[latestUserId] = Profile(
            latestUserId,
            _username,
            _firstName,
            _lastName,
            _bio,
            _gravatarEmail
        );

        addresses[_address] = latestUserId;
        usernames[_username] = latestUserId;

        return latestUserId;
    }

}