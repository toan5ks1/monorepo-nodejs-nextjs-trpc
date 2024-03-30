import { publicProcedure, router } from '../trpc'

import {
  FormTypeEmailToken,
  FormTypeSendMail,
} from '@foundation-trpc/forms/src'
import { schemaEmailToken } from '@foundation-trpc/forms/src/validations/auth'
import { adminMail, transporter, webUrl } from '../libs/sesClient'

export const sendEmail = async ({
  receiver,
  subject,
  content,
}: FormTypeSendMail) => {
  try {
    return transporter.sendMail({
      from: adminMail,
      to: receiver,
      subject: subject,
      html: content,
      // attachments: [{ content: 'Hello World!', filename: 'hello.txt' }],
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const sendVerificationEmail = async ({
  email,
  token,
}: FormTypeEmailToken) => {
  const confirmLink = `${webUrl}/signup/verify-email?token=${token}`

  return sendEmail({
    receiver: email,
    subject: 'Confirm your email',
    content: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  })
}

export const emailRoutes = router({
  sendVerificationEmail: publicProcedure
    .input(schemaEmailToken)
    .mutation(async ({ input: { email, token } }) => {
      return await sendVerificationEmail({ email, token })
    }),
})
