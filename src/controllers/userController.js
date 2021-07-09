import admin from 'firebase-admin'
export default {
  createUser: async (req, res) => {
    try {
      const { password, email, role = 'student' } = req.body
      const user = await admin.auth().createUser({
        password,
        email
      })
      const { uid } = user
      await admin.auth().setCustomUserClaims(uid, { role })

      return res.status(201).send({ user })
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}
