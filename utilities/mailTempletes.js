const verifyemailTemplate = (userName,otp) => {
  return`<!DOCTYPE html>
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

const restpasswordTemplate = (userName,resetLink,token,expiryTime)=>{
  return`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8; padding:20px 0;">
    <tr>
      <td align="center">
        
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; padding:40px 30px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333333;">Reset Your Password</h2>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="color:#555555; font-size:16px; line-height:24px; padding-bottom:20px;">
              Hello <strong>{{userName}}</strong>,<br><br>
              We received a request to reset your password. Click the button below to set a new password.
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding:20px 0;">
              <a href="{{resetLink}}" 
                 style="background-color:#2563eb; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-size:16px; display:inline-block;">
                 Reset Password
              </a>
            </td>
          </tr>

          <!-- Token Section -->
          <tr>
            <td style="color:#555555; font-size:14px; line-height:22px; padding-top:20px;">
              Or copy and paste this token into the reset page:
              <div style="margin-top:10px; padding:12px; background:#f1f5f9; border-radius:6px; font-family:monospace; font-size:14px; word-break:break-all;">
                {{token}}
              </div>
            </td>
          </tr>

          <!-- Expiry Notice -->
          <tr>
            <td style="color:#888888; font-size:13px; padding-top:20px;">
              This link and token will expire in {{expiryTime}}.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="color:#999999; font-size:12px; padding-top:30px; border-top:1px solid #eeeeee;">
              If you did not request a password reset, please ignore this email. Your password will remain unchanged.
              <br><br>
              © 2026 Your Company. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
}

module.exports ={
    verifyemailTemplate,
    restpasswordTemplate,
}