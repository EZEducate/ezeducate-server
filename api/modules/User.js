const mongoose = require('mongoose')
const { generateRandomPassword } = require('../../plugins/helpers')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      require: true,
      type: String,
    },
    hash: {
      type: String,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    last_seen: {
      type: Date,
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
      enum: ['active', 'banned', 'deleted'],
      default: 'active',
    },
    //   grades: {},
    //   calendar: {},
  },
  {
    timestamps: true,
  }
)
UserSchema.methods.setPassword = async function (password) {
  const salt = 16
  this.hash = await bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.hash)
}
UserSchema.methods.jsonData = function () {
  return {
    username: this.username,
    avatar: this.avatar,
    name: this.name,
    email: this.email,
    visibility: this.visibility,
    last_seen: this.last_seen,
    verified: this.verified,
    authority: this.authority,
    status: this.status,
  }
}
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
