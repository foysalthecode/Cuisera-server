import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      const info = await transporter.sendMail({
        from: '"Cuisera" <cuisera.res@gmail.com>',
        to: user.email,
        subject: "Please Verify Your Email",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email - Cuisera</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:30px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#ff4d2d; padding:25px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:28px; letter-spacing:1px;">
                Cuisera 🍽️
              </h1>
              <p style="margin:8px 0 0; color:#ffe9e4; font-size:14px;">
                Your Food, Delivered Smartly
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 30px; color:#333333;">
              <h2 style="margin-top:0; font-size:22px;">
                Verify your email address
              </h2>

              <p style="font-size:15px; line-height:1.6; color:#555;">
                Thanks for signing up with <strong>Cuisera</strong>!  
                Please confirm your email address to start ordering delicious meals from your favorite restaurants.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" style="margin:30px auto;">
                <tr>
                  <td align="center">
                    <a href="${verificationUrl}"
                      style="background:#ff4d2d; color:#ffffff; text-decoration:none; padding:14px 30px; font-size:16px; font-weight:bold; border-radius:8px; display:inline-block;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; color:#777; line-height:1.6;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>

              <p style="font-size:13px; word-break:break-all; color:#ff4d2d;">
                ${verificationUrl}
              </p>

              <p style="font-size:14px; color:#777; margin-top:25px;">
                If you didn’t create an account on Cuisera, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#fafafa; padding:20px; text-align:center; font-size:12px; color:#999;">
              © 2026 Cuisera. All rights reserved.<br/>
              Made with ❤️ for food lovers
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
        `, // HTML version of the message
      });
    },
  },
});
