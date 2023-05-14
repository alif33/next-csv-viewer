export default async function handler(req, res) {
  try {
   if(req.body.password !== process.env.SECRET_KEY){
        return res.status(500).send({ success: false, message: "Invalid Credentials" });
   } 
    return res.status(200).send({ success: true, token: process.env.SECRET_TOKEN, message: "Loged in successfully" });	
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Internal Server Error", msg: error });
  }
}