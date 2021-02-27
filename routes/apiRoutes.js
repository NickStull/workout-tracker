const db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", function(req, res) {
        db.Workout.aggregate(
            [
                {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" }
                }
            }
        ])
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.post("/api/workouts", function(req, res) {
        db.Workout.create(req.body)
          .then(function(dbWorkout) {
            res.json(dbWorkout);
          })
          .catch(function(err) {
            res.json(err);
          });
      });

      app.put("/api/workouts/:id", function(req, res) {
        db.Workout.updateOne({ _id: req.params.id },
          { $push: 
            { exercises: req.body }
          })
          .then(function(results) {
            res.json(results);
          })
          .catch(function(err) {
            res.json(err);
          }); 
      });

      app.get("/api/workouts/range", function(req, res) {      
        db.Workout.aggregate(
          [
            {
              $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
              }
            }
            // sort the data by descending order and get only the last 7 entries
          ]).sort({ day: -1 }).limit(7)
          .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
    });
};
