import React from 'react'
import Logo from '../../components/Logo/Logo';
import css from './RequestResetPassPage.module.css';
import DocumentTitle from '../../components/DocumentTitle';
import PictureSection from '../../components/PictureSection/PictureSection';
import RequestResetPass from '../../components/RequestResetPass/RequestResetPass';

const RequestResetPassPage = () => {
  return (
    <div className={css.wrapper}>
      <DocumentTitle>Home Track - Request Reset Password Page</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <RequestResetPass />
      </div>
      <PictureSection />
    </div>
  )
}

export default RequestResetPassPage