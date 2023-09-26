const User = require("../models/users.model");
const Exercise = require("../models/exercises.model");

module.exports = {
  findAll: async (req, resp) => {
    try {
      const result = await User.find({}, { __v: 0 });
      resp.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  },
  findById: async (req, resp) => {
    try {
      const { _id } = req.params;
      let { from, to, limit } = req.query;

      let dateRange = {};
      if (from && !to) {
        dateRange.date = { $gte: new Date(from) };
      } else if (!from && to) {
        dateRange.date = { $lte: new Date(to) };
      } else if (from && to) {
        dateRange.date = { $gte: new Date(from), $lte: new Date(to) };
      }

      let result = await Exercise.find(
        { userId: _id, ...dateRange },
        { __v: 0 }
      ).limit(limit);

      const log = result.map((obj) => ({
        description: obj.description,
        duration: obj.duration,
        date: obj.date,
      }));

      const user = await User.findById(_id);
      result = {
        username: user.username,
        count: log.length,
        _id,
        log,
      };

      resp.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  },
  storeUser: async (req, resp) => {
    try {
      const { username } = req.body;
      const user = new User({ username });
      const result = await user.save();
      console.log(result);
      resp.status(201).json(result);
    } catch (err) {
      console.log(err);
    }
  },
  storeUserExercise: async (req, resp) => {
    try {
      const { _id: userId } = req.params;
      let { description, duration, date } = req.body;

      if (!date) date = new Date();

      const user = await User.findById(userId);
      const exercise = new Exercise({
        username: user.username,
        description,
        duration,
        date,
        userId,
      });

      let result = await exercise.save();

      // result = {
      //   uername: result.username,
      //   description: result.description,
      //   duration: result.duration,
      //   date: result.date,
      //   _id: result.userId,
      // };

      result._id = userId;
      result = result.toObject();
      const { userId: _, __v, ...formattedResult } = result;

      resp.status(201).json(formattedResult);
    } catch (err) {
      console.log(err);
      resp.status(400).send(err.message);
    }
  },
};
