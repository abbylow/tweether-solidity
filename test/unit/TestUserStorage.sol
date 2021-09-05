pragma solidity ^0.5.10;

import "truffle/Assert.sol";
//import "truffle/DeployedAddresses.sol";
import "../../contracts/users/UserStorage.sol";

// unit tests (in Solidity) are necessary to get the actual returned data from a writable function that performs a transaction.

contract TestUserStorage {
//    Can't use this test anymore since the createUser can only be called by controller contract
//    function testCreateFirstUser() public {
//        // Get the deployed contract
//        UserStorage _storage = UserStorage(DeployedAddresses.UserStorage());
//
//        uint _expectedId = 1;
//
//        Assert.equal(_storage.createUser("tristan"), _expectedId, "Should create user with ID 1");
//    }

//    To overcome the onlyController issue, we create a new instance of storage contract and set the controller contract to be this test contract
    UserStorage userStorage;

    constructor() public {
        userStorage = new UserStorage();
        userStorage.setControllerAddr(address(this));
    }

    function testCreateFirstUser() public {
        uint _expectedId = 1;

        Assert.equal(userStorage.createUser(
        address(0),
            "tristan",
            "Tristan",
            "Edwards",
            "bla bla",
            "lala@la.com"
        ), _expectedId, "Should create user with ID 1");
    }

}