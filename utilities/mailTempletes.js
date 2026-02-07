const verifyemailTemplate = (userName,otp) => {
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Verification Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Poppins', Arial, sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 30px 20px; text-align: center;">
        <!-- Header -->
        <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 10px;">Hi ${userName}. <br/>Verify Your Email</h1>
        <p style="color: #6b7280; font-size: 15px; margin-bottom: 30px;">
          Thank you for signing up! Please use the following OTP to complete your verification.
        </p>

        <!-- OTP Box -->
        <div style="display: inline-block; background-color: #f1f5f9; padding: 15px 25px; border-radius: 8px; margin-bottom: 20px;">
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #1e3a8a;">${otp}</span>
        </div>

        <!-- Info Text -->
        <p style="color: #374151; font-size: 14px; margin-bottom: 25px;">
          This code will expire in <strong>10 minutes</strong>. Please don’t share it with anyone.
        </p>

        <!-- Verify Button -->
        <a href="#" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 15px;">
          Verify Now
        </a>

        <!-- Footer -->
        <p style="margin-top: 35px; color: #9ca3af; font-size: 12px;">
          If you didn’t request this, you can safely ignore this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`
}