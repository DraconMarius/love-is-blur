//mongoose model schema
const { Schema, model } = require("mongoose");
//bcrypt for hasing pw before saving
const bcrypt = require("bcrypt");

//user model
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //regex for validate
    match: [/.+@.+\..+/, "Must be a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstname: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  bio: {
    type: String,
    require: true,
  },
  likedBy: [
    {
      type: String,
    },
  ],
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "Match",
    },
  ],
});

//presave Hook for PW update / new user
//hashing pw before saving to db
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const saltRounds = 8;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
  //relinquish control
  next();
});

//Making sure every instance of user can access `validate PW`
userSchema.methods.validatePW = async function (password) {
  return bcrypt.compare(password, this.password);
};

//creating model from schema,
const User = model("User", userSchema);
//export
module.exports = User;
