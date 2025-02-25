import { useState , useEffect } from 'react'
import { ethers } from 'ethers'
import './App.css'

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  const [provider, setProvider] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectWallet = async () => {
      if(provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contract = new ethers.Contract(
          contractAddress,
          //contractABI,
          signer
        );
        setContract(contract);
        setProvider(signer);
      }
      else {
        alert("Please install Metamask");
      }
    }
    provider && connectWallet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWallet}>Connect Wallet</button>
      </header>
    </div>
  )
}

export default App
