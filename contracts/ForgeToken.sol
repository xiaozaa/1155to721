// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error AddressNotAllowlistVerified();

contract ForgeToken is Ownable, ERC721A, ReentrancyGuard {
    uint256 public immutable collectionSize;
    address public immutable redeemAddress;

    uint256 public publicSaleStartTime;

    // metadata URI
    string private _baseTokenURI;

    constructor(uint256 collectionSize_, address redeemAddress_)
        ERC721A("Catchon", "CATCHON")
    {
        collectionSize = collectionSize_;
        redeemAddress = redeemAddress_;
    }

    // Public Mint
    // *****************************************************************************
    // Public Functions
    function mint(address to, uint256 quantity) public nonReentrant {
        require(
            msg.sender == redeemAddress,
            "Can only mint by redeem contract"
        );
        require(isPublicSaleOn(), "Public sale has not begun yet");
        require(
            totalSupply() + quantity <= collectionSize,
            "Reached max supply"
        );
        _safeMint(to, quantity);
    }

    function isPublicSaleOn() public view returns (bool) {
        require(publicSaleStartTime != 0, "Public Sale Time is TBD.");

        return block.timestamp >= publicSaleStartTime;
    }

    // Owner Controls

    // Public Views
    // *****************************************************************************
    function numberMinted(address minter) public view returns (uint256) {
        return _numberMinted(minter);
    }

    // Contract Controls (onlyOwner)
    // *****************************************************************************
    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function withdrawMoney() external onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function setupPublicSaleStartTime(uint256 _publicSaleStartTime)
        external
        onlyOwner
    {
        publicSaleStartTime = _publicSaleStartTime;
    }

    // Internal Functions
    // *****************************************************************************

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }
}
