import "./globals.css"

export const metadata = {
  title: "DentalDiagnose - AI-Powered Orthodontic Analysis",
  description: "Upload dental images for AI-powered analysis and disease prediction",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
