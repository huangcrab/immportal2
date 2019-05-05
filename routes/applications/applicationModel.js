const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  applicationForm: {
    type: Schema.Types.ObjectId,
    ref: "applicationForm"
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "review"],
    default: "pending"
  },
  preApprove: {
    type: Boolean,
    default: false
  },
  populatedFields: {
    type: Object,
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

exports.model = mongoose.model("applications", ApplicationSchema);
