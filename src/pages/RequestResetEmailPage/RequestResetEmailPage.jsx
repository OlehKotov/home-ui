import React from 'react'
import Logo from '../../components/Logo/Logo';
import css from './RequestResetEmailPage.module.css';
import DocumentTitle from '../../components/DocumentTitle';
import PictureSection from '../../components/PictureSection/PictureSection';
import RequestResetEmail from '../../components/RequestResetEmail/RequestResetEmail';

const RequestResetEmailPage = () => {
  return (
    <div className={css.wrapper}>
      <DocumentTitle>Home Track - Reset Password Page</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <RequestResetEmail />
      </div>
      <PictureSection />
    </div>
  )
}

export default RequestResetEmailPage