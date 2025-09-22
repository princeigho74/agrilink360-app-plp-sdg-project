// marketplace.js

let trialCount = 0;
let maxTrials = 3;
let isPaidUser = false;

// Products across Africa
const products = [
  { name: "Rice", country: "Nigeria" },
  { name: "Beans", country: "Ghana" },
  { name: "Tomatoes", country: "Kenya" },
  { name: "Onions", country: "Ethiopia" },
  { name: "Cassava", country: "Uganda" },
  { name: "Fish", country: "Senegal" },
  { name: "Pepper", country: "Cameroon" },
  { name: "Bush Meat", country: "Congo" },
  { name: "Maize", country: "Zambia" },
  { name: "Wheat", country: "South Africa" }
];

// Display products
function showMarketplace() {
  const container = document.getElementById("marketplace");
  container.innerHTML = "<h2>Marketplace</h2>";
  
  products.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.innerText = `${p.name} - ${p.country}`;
    btn.onclick = () => handlePurchase(p);
    container.appendChild(btn);
  });
}

// Handle product purchase
function handlePurchase(product) {
  if (!isPaidUser) {
    if (trialCount < maxTrials) {
      trialCount++;
      alert(`✅ You selected ${product.name} from ${product.country}. (${trialCount}/${maxTrials} free trials used)`);
      if (trialCount === maxTrials) {
        alert("⚠️ Free trials exhausted. Please pay to continue.");
        showPaymentButton();
      }
    } else {
      alert("⚠️ Please complete payment to continue.");
    }
  } else {
    alert(`✅ Purchase confirmed for ${product.name} from ${product.country}.`);
  }
}

// Show payment button
function showPaymentButton() {
  const payDiv = document.getElementById("payment");
  payDiv.innerHTML = `
    <h3>Upgrade to Full Access</h3>
    <button id="flutterwavePay">💳 Pay with Flutterwave ($10)</button>
  `;

  document.getElementById("flutterwavePay").onclick = mockFlutterwavePayment;
}

// Mock payment
function mockFlutterwavePayment() {
  alert("Redirecting to Flutterwave checkout...");
  
  // Simulate payment success
  setTimeout(() => {
    alert("🎉 Payment successful! You now have unlimited access.");
    isPaidUser = true;
    document.getElementById("payment").innerHTML = "";
  }, 2000);
}

// IoT Mock Monitoring
function startIoTMonitoring() {
  const monitor = document.getElementById("iotMonitor");
  let temp = 20 + Math.random() * 10;
  let humidity = 50 + Math.random() * 20;

  monitor.innerHTML = `<p>🌡️ Temp: ${temp.toFixed(1)}°C | 💧 Humidity: ${humidity.toFixed(1)}%</p>`;

  if (temp > 30 || humidity > 70) {
    monitor.innerHTML += `<p style="color:red">⚠️ Warning: Possible spoilage detected!</p>`;
  }
}

setInterval(startIoTMonitoring, 5000);

// Initialize
window.onload = () => {
  showMarketplace();
  startIoTMonitoring();
};


