import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://admin:Q6gjhpctds@cluster0.vc7ix2m.mongodb.net/paytmtest";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error in connection: ", err);
  });

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, //reference to user model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

export { User, Account };
