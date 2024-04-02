const CarData = require("../models/cars");

exports.handleAddTank = async (req, res) => {
    console.log(req.body);
    if (req) {
      res.send(await addTank(req.body));
    } else {
      res.send({ message: "fail, not manager/connected" });
    }
};
  
exports.
handleTanks = async (req, res) => {
  
      res.send(await getAllTanks());
   
};

exports.getKshirut=async (req, res) => {
  try {
    const kshirutData = await getKshirut1();
    res.send(kshirutData);
    console.log(kshirutData);
  } catch (error) {
    // console.error("Error fetching kshirut data:", error);
    res.status(500).send("Internal Server Error");
  }
}

const getKshirut1 = async (obj) => {
  return await CarData.find({kshirot : true});
  
}

const addTank = async (obj) => {
  console.log(obj);
  try {
    return { message: "success", data: await CarData.create(obj) };
  } catch {
    return { message: "failed" };
  }
};


  
  const getAllTanks = async () => {
    // console.log(await CarData.find());
    return await CarData.find();
    
  };
  
  

  const isManager = (req) => {
  return req.user && req.user.isManager == 1;
};