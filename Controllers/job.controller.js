const jobModel = require("../Models/job.model");

// @desc register new job place
// @route POST /job/
module.exports.registerJob = async (req, res) => {
  const { name, lat, lng } = req.body;
  if (!name) return res.status(400).send("Name field required");
  if (!lat) return res.status(400).send("Latitude field required");
  if (!lng) return res.status(400).send("Longitude field required");

  await jobModel.create({ name, lat, lng });
  res.status(201).json("Registered successfully");
};

module.exports.jobQuery = async (req, res) => {
  if (req.query.query.length < 3) return res.status(400).send({ message: "Too short keyword" });
  let queryResult = await jobModel
    .find({
      name: { $regex: req.query.query, $options: "i" },
    })
    .lean();

  let result = await jobModel
    .find({
      $text: { $search: req.query.query },
    })
    .lean();

  //classification [ [ [a] [b] ] [ [c] [d] [e] ] ]
  // queryResult = queryResult.map;
  res.status(200).json({ queryResult, result });
};

module.exports.autocomplete = async (req, res) => {
  if (req.query.query.length < 3) return res.status(400).send({ message: "Too short keyword" });
  let queryResult = await jobModel
    .find({
      name: { $regex: req.query.query, $options: "i" },
    })
    .lean();

  //classification [ [ [a] [b] ] [ [c] [d] [e] ] ]
  // let main = [];
  // queryResult = queryResult.map(i=>{
  //   const lowercase = i.toLowerCase()
  //   if (main.includes(lowercase))
  // });
  res.status(200).json({ queryResult, result });
};
