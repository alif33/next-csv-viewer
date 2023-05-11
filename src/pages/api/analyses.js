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

    db.collection("users").doc(req.query.uid).collection("analyses").doc(req.query.aid).collection("analysed_frames").get().then(analyses => {

        let analysesList = [];
        analyses.forEach(el => {
            el.data().pose.landmarks.forEach(info=>{
                analysesList.unshift({ ...info.position, frame: parseInt(el.id.split('_')[1]), beTypeString: info.beTypeString })
            })
        })
        // setLoading(false);
        // setAnalyses(analysesList);
        // const sortedList = _.orderBy(analysesList, ['frame'], ['asc']);
        // setAnalyses(sortedList);
        return res.status(200).send({ status: "Success", data: analysesList });
    })


    // db.collection("users").doc(req.query.uid).collection("analyses").get().then((sp) => {
    //     let videoList = [];
    //     sp.forEach(dc => {
    //         videoList.push({ aid: dc.id, ...dc.data() });
    //     });
    //     return res.status(200).send({ status: "Success", data: videoList });
    // });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Failed", msg: error });
  }

}












