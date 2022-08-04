import sgMail from '@sendgrid/mail'
const sendGrid = sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export default sendGrid
