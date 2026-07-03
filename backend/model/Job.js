const mongoose=require("mongoose");

const jobSchema = new mongoose.Schema({
    company: { type: String, required: true, trim: true},
    role: { type: String, required: true , trim: true},
    status: { type: String,enum: ["Applied", "Interview", "Offer", "Rejected"],default: "Applied"},
    appliedDate: {type: Date,default: Date.now },
    postingLink: { type: String, default: "", },
    salary: { type: String, default: "", },
    notes: { type: String, default: "", },
},{
    timestamps: true,
});

module.exports = mongoose.model("Job", jobSchema);