pragma solidity ^0.5.10;

import "truffle/Assert.sol";
import "../../contracts/users/UserStorage.sol";

// unit tests (in Solidity) are necessary to get the actual returned data from a writable function that performs a transaction.

contract TestUserStorage {
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