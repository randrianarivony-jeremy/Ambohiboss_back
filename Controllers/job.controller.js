import { faker } from "@faker-js/faker/locale/fr";
import { jobModel } from "../Models/job.model.js";

// @desc register new job place
// @route POST /job/
export const registerJob = async (req, res) => {
  const { name, lat, lng, category, description, opening } = req.body;
  if (!name) return res.status(400).send("Name field required");
  if (!lat) return res.status(400).send("Latitude field required");
  if (!lng) return res.status(400).send("Longitude field required");

  await jobModel.create({ name, lat, lng, category, description, opening });
  res.status(201).json("Registered successfully");
};

export const jobQuery = async (req, res) => {
  if (req.query.query.length < 3) return res.status(400).send({ message: "Too short keyword" });
  let queryResult = await jobModel
    .find({
      category: { $regex: req.query.query, $options: "i" },
    })
    .lean();

  let classifiedResult = [];
  let i = 0;
  while (queryResult.length > 0) {
    classifiedResult.push([queryResult[0]]);
    queryResult.shift();
    for (let j = 0; j < queryResult.length; j++) {
      if (queryResult[j].category.toLowerCase().match(classifiedResult[i][0].category.toLowerCase()) !== null) {
        classifiedResult[i].push(queryResult[j]);
        delete queryResult[j];
      }
    }
    queryResult = queryResult.filter((a) => a !== "empty");
    i++;
  }
  res.status(200).json(classifiedResult);
};

export const autocomplete = async (req, res) => {
  if (req.query.query.length < 3) return res.status(400).send({ message: "Too short keyword" });
  let queryResult = await jobModel
    .find(
      {
        category: { $regex: req.query.query, $options: "i" },
      },
      "category"
    )
    .lean();

  let classifiedResult = [];
  let i = 0;
  while (queryResult.length > 0) {
    classifiedResult.push(queryResult[0].category);
    queryResult.shift();
    for (let j = 0; j < queryResult.length; j++) {
      if (queryResult[j].category.toLowerCase().match(classifiedResult[i].toLowerCase()) !== null) {
        delete queryResult[j];
      }
    }
    queryResult = queryResult.filter((a) => a !== "empty");
    i++;
  }
  res.status(200).json(classifiedResult);
};

export const generateData = async (req, res) => {
  const posts = [];

  let name, category, description, lat, lng, opening, location;
  for (let i = 0; i < req.params.nb; i++) {
    name = faker.company.name();
    category = "Coiffure mpanety";
    description = faker.lorem.paragraphs({ min: 2, max: 4 }, "\n");
    location = faker.location.nearbyGPSCoordinate({
      origin: [-18.915515990399303, 47.52165967702609],
      radius: 10,
      isMetric: true,
    });
    lat = location[0];
    lng = location[1];
    opening = faker.number.int({ min: 1980, max: 2023 });

    posts.push({
      name,
      category,
      description,
      lat,
      lng,
      opening,
    });
  }

  const result = await jobModel.insertMany(posts);
  res.status(201).json("Registred successfully");
};
