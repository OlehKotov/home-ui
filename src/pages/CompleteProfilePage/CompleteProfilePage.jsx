import React from 'react'
import Logo from '../../components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from './CompleteProfilePage.module.css';
import PictureSection from '../../components/PictureSection/PictureSection';
import DocumentTitle from '../../components/DocumentTitle';
import CompleteProfile from '../../components/CompleteProfile/CompleteProfile';

const CompleteProfilePage = () => {
  return (
    <div className={css.wrapper}>
      <DocumentTitle>Home Track - Complete Profile Page</DocumentTitle>
      <div className={css.backdrop}>
        <Logo />
        <CompleteProfile />
      </div>
      <PictureSection />
    </div>
  )
}

export default CompleteProfilePage