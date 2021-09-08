pragma solidity ^0.5.10;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "../helpers/Owned.sol";

contract TweetherToken is StandardToken, Owned {
    string public name = "TweetherToken";
    string public symbol = "TWE";
    uint8 public decimals = 0;

    uint256 public FOR_ICO = 750000;
    uint256 public FOR_FOUNDER = 250000;

    constructor() public {
        totalSupply_ = FOR_FOUNDER + FOR_ICO;
        balances[msg.sender] = totalSupply_;
    }

    // send 75% of our token supply to ICO contract
    function fundICO(address _icoAddr) onlyOwner public {
        transfer(_icoAddr, FOR_ICO);
    }
}