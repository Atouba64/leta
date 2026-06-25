const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
admin.initializeApp({
  projectId: 'leta-e7d8d'
});

const db = admin.firestore();

async function exportMailingList() {
  console.log('Fetching mailing list from Firebase...');
  try {
    const snapshot = await db.collection('mailing_list').get();
    
    if (snapshot.empty) {
      console.log('No contacts found in the mailing list.');
      return;
    }

    const outPath = path.join(__dirname, '..', 'data', 'mailing_list_export.csv');
    let csvContent = 'Email,First Name,Last Name,Source,Date Added\n';

    snapshot.forEach(doc => {
      const data = doc.data();
      const email = data.email || '';
      const firstName = data.firstName || '';
      const lastName = data.lastName || '';
      const source = data.source || '';
      
      // Handle timestamp
      let dateAdded = '';
      if (data.updatedAt && data.updatedAt.toDate) {
        dateAdded = data.updatedAt.toDate().toISOString().split('T')[0];
      }

      csvContent += `"${email}","${firstName}","${lastName}","${source}","${dateAdded}"\n`;
    });

    if (!fs.existsSync(path.dirname(outPath))) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
    }

    fs.writeFileSync(outPath, csvContent);
    console.log(`Successfully exported ${snapshot.size} contacts to ${outPath}`);
  } catch (error) {
    console.error('Error exporting mailing list:', error);
  }
}

exportMailingList();
