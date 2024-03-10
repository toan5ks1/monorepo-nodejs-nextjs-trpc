import * as aws from 'aws-sdk'
import * as nodemailer from 'nodemailer'

import { publicProcedure, router } from '../trpc'

import { prisma } from '@foundation-trpc/db'
import { FormTypeSendMail } from '@foundation-trpc/forms/src'
import { schemaSendMail } from '@foundation-trpc/forms/src/schemas'

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  region: 'us-east-1',
})

aws.config.getCredentials(function (error) {
  if (error) {
    console.log(error.stack)
  }
})

const ses = new aws.SES({ apiVersion: '2010-12-01' })

const adminMail = 'support@becodemy.com'

// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({
  SES: ses,
})

export const sendEmail = async ({
  userEmail,
  subject,
  content,
}: FormTypeSendMail) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail,
      to: userEmail,
      subject: subject,
      html: content,
    })

    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const emailRoutes = router({
  // user: publicProcedure
  //   .input(schemaSendMail)
  //   .query(({ input: { uid }, ctx }) => {
  //     return prisma.user.findUnique({ where: { uid } })
  //   }),
})
