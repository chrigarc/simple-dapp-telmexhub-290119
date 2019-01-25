var SaveInfo = artifacts.require("./SaveInfo.sol");

module.exports = function(deployer) {
  deployer.deploy(SaveInfo, 1260);
};
