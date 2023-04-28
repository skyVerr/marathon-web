import "./styles/globals.sass"
import styles from "./layout.module.sass"
import React, {ReactNode, useState} from "react";
import {countdown} from "@/app/modules/countdown/countdown";

export const metadata = {
  title: "Marathon Skills 2015",
}

const getNearestMarathonDate = (marathonDate: Date): Date => {
  const today = new Date()
  if (marathonDate.getTime() > today.getTime()) {
    return marathonDate
  }

  // clone to prevent unnecessary mutation
  const newDate = new Date(marathonDate.getTime())
  if (new Date(newDate.setFullYear(today.getFullYear())).getTime() < today.getTime()) {
    newDate.setFullYear(newDate.getFullYear() + 1)
  }

  return newDate
}

export default function RootLayout({children,}: { children: ReactNode }) {
  const marathonDate = new Date(2015, 8, 5, 6)
  // use client
  const [contdown, setCountdown] = useState(countdown(getNearestMarathonDate(marathonDate)))

  return (
    <html lang="en">
      <body>
        <div className={styles.window}>
          <div className={styles.mainContainer}>
            <div>{children}</div>
            <div className={styles.footer}>
              {contdown} until the race starts!
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
