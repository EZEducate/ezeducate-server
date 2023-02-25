const UserSchema = new mongoose.Schema({
  username: {
    require: true,
    type: String,
  },
  avatar: {
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
  password: {
    type: String,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  last_seen: {
    type: Date,
    default: new Date(),
  },
  name: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  authority: {
    type: String,
  },
  status: {
    type: String,
    default: false,
  },
  //   grades: {},
  //   calendar: {},
})
UserSchema.pre('save', function (next) {})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
