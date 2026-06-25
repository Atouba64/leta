import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { app } from "../firebase-init.js";

const auth = getAuth(app);

export function showError(msg) {
  const el = document.getElementById('auth-error');
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
    // Remove animation and re-add to retrigger
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null; 
  }
}

export function showSuccess(msg) {
  const el = document.getElementById('auth-success');
  const errEl = document.getElementById('auth-error');
  if (errEl) errEl.style.display = 'none';
  
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
  }
}

export async function handleSignIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/";
  } catch (error) {
    showError(error.message);
  }
}

export async function handleSignUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Attempt to send verification
    try {
      await sendEmailVerification(userCredential.user);
    } catch (e) {
      console.error("Verification email error", e);
    }

    // Since they need to verify or we just direct them to the verify page
    window.location.href = "/auth/verify-email.html";
  } catch (error) {
    showError(error.message);
  }
}

export async function handlePasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    showSuccess("Password reset email sent! Check your inbox.");
  } catch (error) {
    showError(error.message);
  }
}

export function setupPasswordStrength(inputId, barId) {
  const input = document.getElementById(inputId);
  const bar = document.getElementById(barId);
  if (!input || !bar) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value;
    bar.parentElement.style.display = val.length > 0 ? 'block' : 'none';
    
    bar.className = 'password-strength-bar';
    if (val.length > 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)) {
      bar.classList.add('strength-strong');
    } else if (val.length > 5) {
      bar.classList.add('strength-medium');
    } else if (val.length > 0) {
      bar.classList.add('strength-weak');
    }
  });
}
