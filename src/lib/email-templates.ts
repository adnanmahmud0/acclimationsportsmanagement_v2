export interface ICreateAccount {
  name: string;
  otp: number;
  email: string;
}

export interface IResetPassword {
  otp: number;
  email: string;
}

const createAccount = (values: ICreateAccount) => {
  return {
    to: values.email,
    subject: 'Verify your account',
    html: `
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
        <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1a3c6e; font-size: 24px; margin-bottom: 20px; text-align:center;">Acclimation Sports Management</h2>
          <h3 style="color: #1a3c6e; font-size: 18px; margin-bottom: 20px;">Hey ${values.name}! Verify your account</h3>
          <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your single use code is:</p>
            <div style="background-color: #1a3c6e; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
          </div>
        </div>
      </body>`,
  };
};

const resetPassword = (values: IResetPassword) => {
  return {
    to: values.email,
    subject: 'Reset your password',
    html: `
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 50px; padding: 20px; color: #555;">
        <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1a3c6e; font-size: 24px; margin-bottom: 20px; text-align:center;">Acclimation Sports Management</h2>
          <div style="text-align: center;">
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your password reset code is:</p>
            <div style="background-color: #1a3c6e; width: 80px; padding: 10px; text-align: center; border-radius: 8px; color: #fff; font-size: 25px; letter-spacing: 2px; margin: 20px auto;">${values.otp}</div>
            <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">This code is valid for 3 minutes.</p>
            <p style="color: #b9b4b4; font-size: 16px; line-height: 1.5; margin-bottom: 20px; text-align:left">If you didn't request this code, you can safely ignore this email. Someone else might have typed your email address by mistake.</p>
          </div>
        </div>
      </body>`,
  };
};

export const emailTemplate = {
  createAccount,
  resetPassword,
};
