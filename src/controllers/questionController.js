import slugify from 'slugify'
import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import generateUniqueId from 'generate-unique-id'
import Field from '../models/Field'
import Question from '../models/Question'
import SendGrid from '../utils/SendGrid'

export default {
  list: async (req, res) => {
    const { limit = 10, page = 1 } = req.query
    const total = (await Question.countDocuments()) || 0
    const questions = await Question.find({}, null, {
      sort: { created_at: -1 },
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit)
    }).populate('subject_code')

    const questionData = {
      page,
      nextPage: page + 1,
      prevPage: page - 1 > 0 ? page - 1 : null,
      count: Math.ceil(total / limit),
      questions
    }
    return res.status(200).json(questionData)
  },
  availableQuestions: async (req, res) => {
    try {
      const { limit = 10, page = 1 } = req.query
      const total = (await Question.countDocuments()) || 0
      const questions = await Question.find(
        { $or: [{ status: 'available' }, { status: 'AVAILABLE' }] },
        null,
        {
          sort: { created_at: -1 },
          limit: parseInt(limit),
          skip: (parseInt(page) - 1) * parseInt(limit)
        }
      ).populate('subject_code')

      const questionData = {
        page,
        nextPage: page + 1,
        prevPage: page - 1 > 0 ? page - 1 : null,
        count: Math.ceil(total / limit),
        questions
      }
      return res.status(200).json(questionData)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  listByAuthor: async (req, res) => {
    const { limit = 10, page = 1 } = req.query
    const author = res.locals.user.user_id
    const total = (await Question.countDocuments({ author })) || 0
    let questions = []
    if (author) {
      questions = await Question.find({}, null, {
        sort: { created_at: -1 },
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit)
      })
        .where('author')
        .equals(author)
        .populate('subject_code')
    }
    return res.status(200).json({
      page,
      nextPage: page + 1,
      prevPage: page - 1 > 0 ? page - 1 : null,
      count: Math.ceil(total / limit),
      questions
    })
  },
  getBySlug: async (req, res) => {
    const { slug } = req.params
    const data = await Question.findOne({ slug }).populate('subject_code')
    return res.status(200).json(data)
  },
  getByShortCode: async (req, res) => {
    const { short_code } = req.params
    const data = await Question.findOne({ shortCode: short_code }).populate(
      'subject_code'
    )
    return res.status(200).json(data)
  },
  add: async (req, res) => {
    const author = res.locals.user.user_id
    const data = req.body
    data.author = author
    const authorMail = res.locals.user.email
    // append slug
    data.slug = slugify(data.title, { lower: true }) + '-' + generateUniqueId()

    // validate subject
    const field = Field.findOne({ _id: data.subject_code })

    if (!field) {
      res.send(400).json({ message: 'field does not exist' })
    }

    const question = new Question(data)
    question
      .save(data)
      .then(async doc => {
        const targetPath = path.resolve(
          __dirname,
          '../email_templates/order_placed.html'
        )
        const targetEmail = fs.readFileSync(targetPath, 'utf8')

        const emailTemplate = _.template(targetEmail)

        const html = emailTemplate({
          QUESTION_LINK: `https://studycounter.com/questions/${doc.slug}`,
          QUESTION_TITLE: doc.title
        })

        // forward email to user
        const mailData = {
          from: 'support@studycounter.com',
          to: authorMail,
          subject: 'Your question has been Posted!',
          text: 'Hello you got your first order!',
          html
        }

        await SendGrid.send(mailData)

        return res.status(201).json(doc)
      })
      .catch(err => {
        console.log('error', err)
        res.status(500).json({ message: 'Error occured while saving', err })
      })
  },
  answer: async (req, res) => {
    const { id } = req.params
    const data = req.body.answer || ''
    Question.findByIdAndUpdate(
      id,
      { $push: { answers: data } },
      { upsert: true },
      (err, doc) => {
        if (err) return res.send(500, { message: err })
        return res
          .status(200)
          .send({ message: 'Succesfully saved.', data: doc })
      }
    )
  }
}
