const db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", function(req, res) {
        db.Workout.find()
        .then(data => {
            console.log(data)
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
    });
};

