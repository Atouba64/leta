const admin = require('firebase-admin');

// Initialize Firebase Admin (Assumes GOOGLE_APPLICATION_CREDENTIALS or running via firebase functions:shell)
// Using default application credentials or project ID
admin.initializeApp({
  projectId: 'leta-e7d8d' // Set the project ID explicitly
});

const db = admin.firestore();

async function setAdminRole(email) {
  try {
    console.log(`Searching for user with email: ${email}`);
    const userRecord = await admin.auth().getUserByEmail(email);
    
    console.log(`User found! UID: ${userRecord.uid}`);
    
    // Update Firestore to trigger the role sync function
    await db.collection('users').doc(userRecord.uid).set({
      role: 'admin',
      email: email,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    console.log(`Successfully promoted ${email} to Admin!`);
    console.log('The syncUserRoleClaims Cloud Function will propagate this to the Auth Token shortly.');
  } catch (error) {
    console.error('Error setting admin role:', error.message);
    if (error.code === 'auth/user-not-found') {
      console.error('Please ensure you have signed up on the website first!');
    }
  }
}

const targetEmail = process.argv[2];
if (!targetEmail) {
  console.log('Usage: node set-admin.js <user-email>');
  process.exit(1);
}

setAdminRole(targetEmail);
