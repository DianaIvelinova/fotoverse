//Still in the making. For future development of likes,possible description of photos, etc.
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const admin = require("firebase-admin");
var serviceAccount = require('../../../adminsdk');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://fotoverse-7ad1e-default-rtdb.europe-west1.firebasedatabase.app/",
  });
}

export default async function handler(req, res) {
  const db = admin.database();

  if (req.body.action == "uploadPhoto") {
    try {
      const user = await admin.auth().verifyIdToken(req.body.token);
      if (!user && !user.uid) return;
      const profileRef = db.ref(`/${user.uid}`);
      const newProfileRef = profileRef.push();
      
      let setPhoto = {
        timestamp: new Date().getTime(),
        photos: req.body.photo,
      };

      newProfileRef.set(setPhoto);

      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  }
}
