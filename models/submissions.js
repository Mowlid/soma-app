const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    emp_id: {
        type: String,
        required: true
    },
    submission: [
        {
            month: {
                type: String,
                required: true
            },
            year: {
                type: String,
                required: true
            },
            overtimes: [{
                startDateTime: {
                    type: String,
                    required: true
                },
                endDateTime: {
                    type: String,
                    required: true
                },
                code: {
                    type: String,
                    required: true
                },
                file: {
                    type: String,
                    required: true
                }
            }]
        }
    ]
})

module.exports = mongoose.model('Submissions', submissionSchema)



