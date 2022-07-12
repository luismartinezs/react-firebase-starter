import { FC } from 'react';

const RecaptchaMessage: FC = (): JSX.Element => {
  return (
    <div>
      This site is protected by reCAPTCHA and the Google&nbsp;
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and&nbsp;
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </div>
  );
};

export default RecaptchaMessage;
