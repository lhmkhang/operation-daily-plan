import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import styles from '../../public/styles/Navbar.module.scss'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className={styles.mainNavBar}>
      <div className={styles.navBrand}>
        <span className={styles.navBrand_logo}>
          <Image
            src='/Logo_DIGI-TEXX_Rut_Gon_2021_White.png'
            width={50}
            height={35}
            alt="Logo Navbar"
          />
        </span>
        <span className={styles.navBrand_title}>DIGI-OPS</span>
      </div>
      <div className={styles.navBar}>
        <ul>
          <li className={[styles.list, styles.active].join(" ")}>
            <Link href="#">
              <span className={styles.icon}></span>
              <span className={styles.title}>Home</span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="#">
              <span className={styles.icon}></span>
              <span className={styles.title}>Report</span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="#">
              <span className={styles.icon}></span>
              <span className={styles.title}>Dashboard</span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="#">
              <span className={styles.icon}></span>
              <span className={styles.title}>Logs Upload</span>
            </Link>
          </li>
          <li className={styles.list}>
            <Link href="#">
              <span className={styles.icon}></span>
              <span className={styles.title}>Setting</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar