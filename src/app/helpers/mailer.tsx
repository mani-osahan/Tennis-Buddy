import nodemailer from "nodemailer";
import User from "@/app/actions/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "773c0d426e0934",
        pass: "b224aaf369e6de",
      },
    });

    const mailOptions = {
      from: "manipalosahan@gmail.com", //TODO CHANGE THIS LATER
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a> to 
            ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            }</p>`,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
