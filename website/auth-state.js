import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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

// Update all <ul class="nav-list"> found on the page
function updateNav(user, role) {
  const navLists = document.querySelectorAll('.nav-list');
  navLists.forEach(navList => {
    // Remove any previously added auth links
    const existingAuthLinks = navList.querySelectorAll('.auth-link');
    existingAuthLinks.forEach(el => el.remove());

    if (!user) {
      // Logged out
      const signInLi = document.createElement('li');
      signInLi.className = 'auth-link';
      signInLi.innerHTML = `<a href="/auth/signin.html" style="font-weight: 600;">Sign In</a>`;
      navList.appendChild(signInLi);

      const signUpLi = document.createElement('li');
      signUpLi.className = 'auth-link';
      signUpLi.innerHTML = `<a href="/auth/signup.html" style="font-weight: 600; color: var(--accent);">Sign Up</a>`;
      navList.appendChild(signUpLi);
    } else {
      // Logged in
      const dashLi = document.createElement('li');
      dashLi.className = 'auth-link';
      
      let dashUrl = '/tech-onboarding.html';
      let dashText = 'My Portal';
      if (role === 'admin' || role === 'support' || role === 'employee') {
        dashUrl = '/dashboard.html';
        dashText = 'Dashboard';
      }
      
      dashLi.innerHTML = `<a href="${dashUrl}" style="font-weight: 600;">${dashText}</a>`;
      navList.appendChild(dashLi);

      const signOutLi = document.createElement('li');
      signOutLi.className = 'auth-link';
      const signOutA = document.createElement('a');
      signOutA.href = "#";
      signOutA.textContent = "Sign Out";
      signOutA.onclick = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
          window.location.reload();
        });
      };
      signOutLi.appendChild(signOutA);
      navList.appendChild(signOutLi);
    }
  });
}

onAuthStateChanged(auth, async (user) => {
  let role = 'unassigned';
  if (user) {
    try {
      const tokenResult = await user.getIdTokenResult();
      role = tokenResult.claims.role || 'unassigned';
    } catch (err) {
      console.error("Failed to get token result:", err);
    }
    
    // If visitor is already logged in and on an auth page, redirect them to the right spot next
    const path = window.location.pathname;
    if (path.includes('/auth/')) {
      let dashUrl = '/tech-onboarding.html';
      if (role === 'admin' || role === 'support' || role === 'employee') {
        dashUrl = '/dashboard.html';
      }
      window.location.href = dashUrl;
      return;
    }
  }
  updateNav(user, role);
});
