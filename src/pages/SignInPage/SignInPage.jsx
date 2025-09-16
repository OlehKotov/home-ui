import React from 'react'
import Logo from '../../components/Logo/Logo';
import css from './SignInPage.module.css';
import DocumentTitle from '../../components/DocumentTitle';
import PictureSection from '../../components/PictureSection/PictureSection';
import SignInForm from '../../components/SignInForm/SignInForm';

const SignInPage = () => {
  return (
    <div className={css.wrapper}>
      <DocumentTitle>Home Track - Register</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <SignInForm />
      </div>
      <PictureSection />
    </div>
  )
}

export default SignInPage