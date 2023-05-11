const admin = require("firebase-admin");
const serviceAccount = require("../../credentials.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
    console.log(error);
}

const db = admin.firestore();

export default async function handler(req, res) {

  try {
    const query = db.collection("users");
    const lists = [];

    await query.get().then((data) => {
      const docs = data.docs; // query results

      docs.map((doc) => {
        lists.push(doc.data())
      });
      return lists;
    });

    return res.status(200).send({ status: "Success", data: lists });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Failed", msg: error });
  }

}
