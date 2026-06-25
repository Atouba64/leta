const fs = require('fs');
const path = require('path');

const firstNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Marcus', 'Jamal', 'Andre', 'Terrence', 'Luis', 'Carlos', 'Javier', 'Diego'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

const cities = ['Atlanta', 'Marietta', 'Alpharetta', 'Roswell', 'Sandy Springs', 'Decatur', 'Smyrna', 'Macon', 'Savannah', 'Athens', 'Augusta', 'Columbus', 'Duluth', 'Norcross', 'Lawrenceville', 'Peachtree City', 'Gainesville', 'Rome', 'Valdosta', 'Albany'];

const skillsArr = [
  'Network Troubleshooting, Cisco, Meraki',
  'Point of Sale (POS), Cabling, Desktop Support',
  'Server Maintenance, Rack Installation, UPS',
  'Printers, Break/Fix, End-User Support',
  'Digital Signage, Kiosks, AV Setup',
  'Fiber Splicing, Cat6, Patch Panels',
  'Telecom, PBX, VoIP Installation',
  'CCTV, Security Systems, Access Control',
  'Mac OS, Windows Server, Active Directory',
  'SD-WAN, Firewalls, Router Config'
];

const certsArr = [
  'CompTIA A+',
  'CompTIA Network+',
  'CompTIA Security+',
  'Cisco CCNA',
  'Microsoft Certified: Azure Fundamentals',
  'None',
  'BICSI Installer',
  'CompTIA A+, Network+',
  'Apple Certified Support Professional (ACSP)'
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  const areaCodes = ['404', '770', '678', '470'];
  const ac = randomItem(areaCodes);
  const prefix = Math.floor(Math.random() * 899) + 100;
  const line = Math.floor(Math.random() * 8999) + 1000;
  return `(${ac}) ${prefix}-${line}`;
}

const csvHeader = 'First Name,Last Name,Email,Phone,City,State,Experience (Years),Primary Skills,Certifications,Status\n';
let csvContent = csvHeader;

for (let i = 0; i < 43; i++) {
  const fn = randomItem(firstNames);
  const ln = randomItem(lastNames);
  const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random() * 999)}@gmail.com`;
  const phone = randomPhone();
  const city = randomItem(cities);
  const state = 'GA';
  const exp = Math.floor(Math.random() * 15) + 2; // 2 to 16 years
  const skills = `"${randomItem(skillsArr)}"`;
  const certs = `"${randomItem(certsArr)}"`;
  const status = 'Active';

  csvContent += `${fn},${ln},${email},${phone},${city},${state},${exp},${skills},${certs},${status}\n`;
}

const outPath = path.join(__dirname, '..', 'data', 'leta_technicians_mock.csv');

// ensure data dir exists
if (!fs.existsSync(path.dirname(outPath))) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
}

fs.writeFileSync(outPath, csvContent);
console.log('Successfully generated 43 mock technicians at:', outPath);
