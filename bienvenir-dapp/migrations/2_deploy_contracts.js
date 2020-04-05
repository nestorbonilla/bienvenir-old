var HelloWorld = artifacts.require('HelloWorld');
var Bienvenir = artifacts.require("Bienvenir");

module.exports = function(deployer) {
  deployer.deploy(HelloWorld);
  deployer.deploy(Bienvenir);
};