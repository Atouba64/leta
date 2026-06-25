import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
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
// Use us-east1 since backend functions are deployed there
const functions = getFunctions(app, 'us-east1');

const form = document.getElementById('onboard-form');
const authWarning = document.getElementById('auth-warning');
const submitBtn = document.getElementById('submit-btn');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    authWarning.style.display = 'none';
    form.style.display = 'block';
    
    // Auto-fill name if available
    if (user.displayName) {
      document.getElementById('emp-name').value = user.displayName;
    }
  } else {
    currentUser = null;
    authWarning.style.display = 'block';
    form.style.display = 'none';
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  errorMsg.style.display = 'none';
  
  const payload = {
    name: document.getElementById('emp-name').value.trim(),
    role: document.getElementById('emp-role').value,
    department: document.getElementById('emp-dept').value
  };

  try {
    const onboardEmployee = httpsCallable(functions, 'onboardEmployee');
    const result = await onboardEmployee(payload);
    
    if (result.data && result.data.ok) {
      successMsg.style.display = 'block';
      form.style.display = 'none';
      
      // Force refresh token to pick up new claims
      await currentUser.getIdToken(true);
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 2000);
    } else {
      throw new Error(result.data.message || 'Unknown error occurred.');
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent = err.message;
    errorMsg.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Complete Onboarding';
  }
});
