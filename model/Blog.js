import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogschema = new Schema({
  title: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required: true,
  },
image: {
    data: Buffer,
    contentType: String,
},
user: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
}
});

export default mongoose.model("Blog", blogschema);

