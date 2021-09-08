pragma solidity ^0.5.10;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "./TweetherToken.sol";

contract TweetherICO {
    using SafeMath for uint256;

    TweetherToken token;

    uint256 public RATE = 1000; // 1 ETH = 1000 TWE

    constructor(address _tokenAddr) public {
        token = TweetherToken(_tokenAddr);
    }

    // convert wei to ETH then convert to TWE
    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
        return _weiAmount.div(10 ** 18).mul(RATE);
    }

    // fallback function (a function without name)
    function () external payable {
        uint256 _amount = _getTokenAmount(msg.value);

        token.transfer(msg.sender, _amount);
    }
}