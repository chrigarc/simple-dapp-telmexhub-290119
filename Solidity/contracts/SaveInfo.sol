pragma solidity ^0.5.0;

contract SaveInfo{

    uint entero;

    bytes32 cadena_bytes;

    string cadena;

    struct estructura{ //no es posible por el momento de manera standar retornar estructuras :(
        uint dato1;
        bytes32 cadena_bytes;
    }

    mapping(address => uint32) map; //no es posible retornar datos mapping :(

    uint[] enteros; //estos si se pueden retornar

    bool booleano;

    address owner;

    constructor(uint a) public {
        entero = a;
        owner = msg.sender;
    }

    function getA() public view returns (uint){
        return entero;
    }

    function getA2() view  public returns (uint){
        return entero;
    }

    function getAB() view public returns (uint, bytes32){
        return (entero, cadena_bytes);
    }

    function setA(uint nuevo) public {
        entero = nuevo;
    }

    function guardarDinero() payable public{
        address(this).transfer(msg.value); // funcion transfer ParaQuien.transfer(Cantidad)
    }

    function getDinero() view public returns(uint){
        return address(this).balance;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function destroy() onlyOwner payable public{ //finaliza la instancia y nadie mas va poder modificar los datos
        selfdestruct(msg.sender);
    }

    function() external payable{ // Es necesaria esta funcion así tal cual para transferir valor al mismo contrato

    }
}