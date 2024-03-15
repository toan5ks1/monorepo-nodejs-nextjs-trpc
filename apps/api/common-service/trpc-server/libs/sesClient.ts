// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/*
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/ses-examples.html.

Purpose:
sesClient.js is a helper function that creates an Amazon Simple Email Services (Amazon SES) service client.

*/

import * as aws from '@aws-sdk/client-ses'
import * as nodemailer from 'nodemailer'

import * as dotenv from 'dotenv'

dotenv.config()

export const adminMail = process.env.ADMIN_MAIL_ADDRESS
export const webUrl = process.env.NEXT_PUBLIC_APP_URL

const ses = new aws.SESClient({
  apiVersion: '2010-12-01',
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID!,
  },
})

// create Nodemailer SES transporter
export const transporter = nodemailer.createTransport({
  SES: { ses, aws },
})
