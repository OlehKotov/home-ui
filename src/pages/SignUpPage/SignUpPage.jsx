import React from 'react'
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from './SignUpPage.module.css';
import DocumentTitle from '../../components/DocumentTitle';
import PictureSection from '../../components/PictureSection/PictureSection';

const SignUpPage = () => {
  return (
    <div className={css.wrapper}>
      <DocumentTitle>Home Track - Register Page</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <SignUpForm />
      </div>
      <PictureSection />
    </div>
  )
}

export default SignUpPage