import Image from 'next/image'
import React from 'react'
import styles from '../../../styles/login.module.css'
import Form from './signupForm'
import Link from 'next/link'
import Close from '../closeButton'


const ContainerCard = () => {
  return (
    <div className={styles.mainContainer}>
        <Image src="/images/spellboundlogo.png" className={styles.logo} width={125} height={130} />
        <div className={styles.formContainer}>
            <Close/>
            <div className={styles.header}>
                Create Account
                <Image src='/images/underline.png' width={200} height={10} />
            </div>
            <Form/>
            <div className={styles.bottomBanner}>
              <Link href="/authentication/login">Already have an Account?</Link>
          </div>
        </div>
    </div>
  )
}

export default ContainerCard