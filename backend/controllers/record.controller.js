const Record = require('../models/record.model.js');

exports.findAll = (req, res) => {
    // Validate
    if (!req.body.startDate) {
        return res.status(400).send({
            message: "Record startDate can not be empty"
        });
    }

    Record.aggregate([
        {
            $project: {
                "key": 1,
                "createdAt": 1,
                "totalCount": {
                    $reduce: {
                        input: "$counts",
                        initialValue: 0,
                        in: { $add: ["$$value", "$$this"] }
                    }
                }
            }
        }
    ])
        .then(records => {

            const filteredItems = records.filter((item) => {
                return (
                    new Date(item.createdAt).getTime() >= new Date(req.body.startDate).getTime()
                    && new Date(item.createdAt).getTime() <= new Date(req.body.endDate).getTime()
                    && item.totalCount >= req.body.minCount
                    && item.totalCount <= req.body.maxCount);
            });

            const finalData = {
                "code": 0,
                "msg": "Success",
                "records": filteredItems.map(x => ({
                    "key": x.key,
                    "createdAt": x.createdAt,
                    "totalCount": x.totalCount
                }))
            };
            res.send(finalData);
        }).catch(err => {
            res.status(500).send({ "code": 1, "msg": err, "records": [] });
        });
};