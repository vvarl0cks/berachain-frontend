// Main Function
// ========================================================
/**
 * Main wallet connection interaction
 */
const connect = async () => {
    console.group('connect');

    // Hide errors when trying to connect
    const devErrorConnect = document.getElementById('div-error-connect');
    devErrorConnect.innerHTML = '';
    devErrorConnect.classList = devErrorConnect.classList.value.includes('hidden')
        ? devErrorConnect.classList.value
        : `${devErrorConnect.classList.value} hidden`;

    // Attempt to connect to wallet with JSON-RPC request
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await ethereum.request({ method: 'eth_chainId' });

        // Disable connect button
        const buttonConnect = document.getElementById('button-connect');
        buttonConnect.setAttribute('disabled', true);
        buttonConnect.innerHTML = 'Connected';

        // Show connected section
        const sectionConnected = document.getElementById('section-connected');
        sectionConnected.classList = '';

        // Display wallet connected
        const preWalletAddress = document.getElementById('pre-wallet-address');
        preWalletAddress.innerHTML = accounts[0];

        // Display current network connected
        const preWalletNetwork = document.getElementById('pre-wallet-network');
        preWalletNetwork.innerHTML = `${chainId}`;
    } catch (error) {
        console.log({ error });
        devErrorConnect.innerHTML = error?.message ?? 'Unknown wallet connection error.'
        devErrorConnect.classList = devErrorConnect.classList.value.replaceAll('hidden', '');
    }
    console.groupEnd();
};

/**
 * Main function that disconnects from the browser
 */
const disconnect = () => {
    console.group('disconnect');
  
    // Hide connected section
    const sectionConnected = document.getElementById('section-connected');
    sectionConnected.classList = 'hidden';

    // Enabled connect button
    const buttonConnect = document.getElementById('button-connect');
    buttonConnect.removeAttribute('disabled');
    buttonConnect.innerHTML = 'Connect Wallet';
  
    console.groupEnd();
};

/**
 * Main function that handles the form request for a read JSON-RPC request
 * @param {*} event 
 */
const onSubmitEthBlockNumber = async (event) => {
    event.preventDefault();
    console.group('onSubmitEthBlockNumber');

  // Reset & Set Loading State
  const preEthBlockNumber = document.getElementById('pre-eth-blocknumber');
  const button = document.querySelector(`#${event.currentTarget.id} button`);
  button.setAttribute('disabled', true);
  button.innerHTML = `${button.innerHTML} (Loading...)`;

  // Attempt request for block number
  try {
    const result = await window.ethereum.request({
      method: 'eth_blockNumber'
    });

    console.log({ result });

    preEthBlockNumber.innerHTML = `${result}\n\n// Block Number:\n// ${parseInt(result, 16)}`;
  } catch (error) {
    console.log({ error });
    preEthBlockNumber.innerHTML = error?.message ?? 'Unknown JSON-RPC error.';
  }

  button.removeAttribute('disabled');
  button.innerHTML = "Get Block Number";
};

// Initial Script Loaded On Window Loaded
// ========================================================
/**
 * Init
 */
window.onload = async () => {
    console.log('WINDOW ONLOAD!');

    // Get All Elements
    const buttonConnect = document.getElementById('button-connect');
    const buttonDisconnect = document.getElementById('button-disconnect');
    const formEthBlockNumber = document.getElementById('form-eth-blocknumber');

    // Add Interactions
    buttonConnect.addEventListener('click', connect);
    buttonDisconnect.addEventListener('click', disconnect);
    formEthBlockNumber.addEventListener('submit', onSubmitEthBlockNumber);

    // Check if browser has wallet integration
    if (typeof window?.ethereum !== "undefined") {
        // Activate elements
        buttonConnect.removeAttribute('disabled');
        buttonConnect.innerHTML = "Connect Wallet";
    }
};