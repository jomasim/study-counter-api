import admin from 'firebase-admin'
import User from '../models/User'
export default {
  createUser: async (req, res) => {
    try {
      const { password, email, role = 'student' } = req.body
      const user = await admin.auth().createUser({
        password,
        email
      })
      console.log("user", user)
      const { uid } = user
      await admin.auth().setCustomUserClaims(uid, { role })
      const userProfile = new User({
        email: user.email,
        emailVerified: user.emailVerified,
        memberType: role
      })
      await userProfile.save()
      return res.status(201).send({ user: userProfile })
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}
