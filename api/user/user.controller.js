const UserModel = require('../../modules/User')
const createHttpErrors = require('http-errors')

class UserController {
  static async getUserDetail(req, res, next) {
    let limit = 5
    try {
      const user = await UserModel.findById({
        _id: req.payload.id,
        status: 'active',
      }).populate({
        path: 'feeds',
        options: { sort: { updated_at: -1 }, limit },
      })

      // .then((data) => console.log(data))

      if (!user) throw new createHttpErrors.NotFound('User Not Found')

      const result = user.jsonData()

      return res.status(200).json({
        success: true,
        result,
      })
    } catch (error) {
      next(error)
    }
  }

  static async follow(req, res, next) {
    try {
      const user = await UserModel.findById({
        _id: req.params.follower_id,
      })

      if (!user) throw new createHttpErrors.NotFound('User Not Found')

      const me = await UserModel.findById({
        _id: req.payload.id,
      })

      if (me.followers.includes(req.params.follower_id))
        throw new createHttpErrors.BadRequest('User is really on friend ship')
      me.update(
        {
          $push: { followers: req.params.follower_id },
        },
        {
          new: true,
        }
      ).exec((error) => {
        if (error) {
          throw new createHttpErrors.BadRequest('')
        }
        return res.status(200).send({
          success: true,
        })
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
