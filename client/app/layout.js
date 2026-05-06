import './globals.css'

export const metadata = {
  title: 'SORTIQ // Q-AGENT VISUALIZER',
  description: 'Pixel art reinforcement learning environment visualizer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
