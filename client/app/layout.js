import './globals.css'

export const metadata = {
  title: 'SORTIQ // Q-AGENT VISUALIZER',
  description: 'Pixel art reinforcement learning environment visualizer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
