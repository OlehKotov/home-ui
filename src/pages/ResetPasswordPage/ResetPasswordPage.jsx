import React from 'react'
import Logo from '../../components/Logo/Logo';
import css from './ResetPasswordPage.module.css';
import DocumentTitle from '../../components/DocumentTitle';
import PictureSection from '../../components/PictureSection/PictureSection';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <div className={css.wrapper}>
      <DocumentTitle>Home Track - Reset Password Page</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <ResetPassword />
      </div>
      <PictureSection />
    </div>
  )
}

export default ResetPasswordPage