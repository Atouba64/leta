import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-functions.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHbmsrUCRX2lKptFVSkSThbgZwUo7lnpw",
  authDomain: "leta-e7d8d.firebaseapp.com",
  projectId: "leta-e7d8d",
  storageBucket: "leta-e7d8d.firebasestorage.app",
  messagingSenderId: "977631910626",
  appId: "1:977631910626:web:12188222e51bf9e4449cbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, 'us-east1');

const authGuard = document.getElementById('auth-guard');
const appEl = document.getElementById('dashboard-app');
const userInfoEl = document.getElementById('user-info');
const tableBody = document.getElementById('table-body');
const searchFilter = document.getElementById('search-filter');
const statusFilter = document.getElementById('status-filter');
const partnerFilter = document.getElementById('partner-filter');
const signOutBtn = document.getElementById('sign-out-btn');

let workOrders = [];
let currentSort = { key: 'date', asc: false };

signOutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    window.location.href = 'auth.html';
  });
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'auth.html';
    return;
  }
  
  const token = await user.getIdTokenResult();
  const role = token.claims.role;

  if (!['admin', 'support', 'employee'].includes(role)) {
    authGuard.innerHTML = `<h2 style="color: #dc2626;">Access Denied</h2><p>Your role (${role}) does not have access to this dashboard.</p><a href="auth.html" style="color: var(--accent);">Go Back</a>`;
    return;
  }

  userInfoEl.textContent = `${user.email} (${role})`;
  authGuard.style.display = 'none';
  appEl.style.display = 'block';
  
  fetchWorkOrders();
});

async function fetchWorkOrders() {
  tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Loading work orders...</td></tr>';
  try {
    const getWorkOrders = httpsCallable(functions, 'getWorkOrders');
    const result = await getWorkOrders();
    workOrders = result.data.orders || [];
    renderTable();
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #dc2626;">Failed to load data: ${err.message}</td></tr>`;
  }
}

function renderTable() {
  const searchStr = searchFilter.value.toLowerCase();
  const statusStr = statusFilter.value;
  const partnerStr = partnerFilter.value;

  let filtered = workOrders.filter(o => {
    const matchSearch = (o.id + o.partner + o.location + (o.tech || '')).toLowerCase().includes(searchStr);
    const matchStatus = statusStr === 'all' || o.status.toLowerCase() === statusStr;
    const matchPartner = partnerStr === 'all' || o.partner.toLowerCase() === partnerStr;
    return matchSearch && matchStatus && matchPartner;
  });

  filtered.sort((a, b) => {
    let valA = a[currentSort.key] || '';
    let valB = b[currentSort.key] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    
    if (valA < valB) return currentSort.asc ? -1 : 1;
    if (valA > valB) return currentSort.asc ? 1 : -1;
    return 0;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No work orders found.</td></tr>';
    return;
  }

  tableBody.innerHTML = filtered.map(o => {
    let badgeClass = 'status-open';
    if (o.status === 'assigned') badgeClass = 'status-assigned';
    if (o.status === 'completed') badgeClass = 'status-completed';

    return `
      <tr>
        <td style="font-family: monospace;">${o.id}</td>
        <td style="text-transform: capitalize;">${o.partner}</td>
        <td>${o.location}</td>
        <td>${new Date(o.date).toLocaleDateString()}</td>
        <td><span class="status-badge ${badgeClass}">${o.status}</span></td>
        <td>${o.tech || '<span style="color:var(--muted)">Unassigned</span>'}</td>
        <td><button style="padding: 6px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">View</button></td>
      </tr>
    `;
  }).join('');
}

// Event Listeners for filtering and sorting
searchFilter.addEventListener('input', renderTable);
statusFilter.addEventListener('change', renderTable);
partnerFilter.addEventListener('change', renderTable);

document.querySelectorAll('th[data-sort]').forEach(th => {
  th.addEventListener('click', () => {
    const key = th.getAttribute('data-sort');
    if (currentSort.key === key) {
      currentSort.asc = !currentSort.asc;
    } else {
      currentSort.key = key;
      currentSort.asc = true;
    }
    renderTable();
  });
});
