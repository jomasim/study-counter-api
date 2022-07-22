import sgMail from '@sendgrid/mail'
console.log('key', process.env.SENDGRID_API_KEY)
const sendGrid = sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export default sendGrid
