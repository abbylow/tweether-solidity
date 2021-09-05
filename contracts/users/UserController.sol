pragma solidity ^0.5.10;

import '../helpers/BaseController.sol';
import '../ContractManager.sol';
import './UserStorage.sol';

contract UserController is BaseController {

    function createUser(
        bytes32 _username,
        bytes32 _firstName,
        bytes32 _lastName,
        string memory _bio,
        string memory _gravatarEmail
    ) public returns(uint) {
        ContractManager _manager = ContractManager(managerAddr);

        address _userStorageAddr = _manager.getAddress("UserStorage");
        UserStorage _userStorage = UserStorage(_userStorageAddr);

        require(_userStorage.addresses(msg.sender) == 0);
        require(_userStorage.usernames(_username) == 0);

        return _userStorage.createUser(
            msg.sender,
            _username,
            _firstName,
            _lastName,
            _bio,
            _gravatarEmail
        );
    }
}