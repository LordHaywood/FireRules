const authRequired = {
  title: `Allow read/write access on all documents to any user signed in to the application`,
  result:
`service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}`
}

const denayAll = {
  title: `Deny read/write access to all users under any conditions`,
  result:
`service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}`
}

const allowAll = {
  title: `Allow read/write access to all users under any conditions. Warning: **NEVER** use this rule set in production; it allows anyone to overwrite your entire database.`,
  result:
`service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`
}

const BasicRW = {
  title: `Basic read/write rules`,
  result:
`service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      allow read: if <condition>;
      allow write: if <condition>;
    }
  }
}`
}

const GranularOperations = {
  title: `Basic read/write rules`,
  result:
`service cloud.firestore {
  match /databases/{database}/documents {
    match /cities/{city} {
      allow get: if <condition>;
      allow list: if <condition>;
    }

    match /cities/{city} {
      allow create: if <condition>;
      allow update: if <condition>;
      allow delete: if <condition>;
    }
  }
}`
}