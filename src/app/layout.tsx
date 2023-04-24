import "./styles/globals.sass"
import styles from "./layout.module.sass"

export const metadata = {
  title: "Marathon Skills 2015",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.window}>
          {children}
        </div>
      </body>
    </html>
  )
}
