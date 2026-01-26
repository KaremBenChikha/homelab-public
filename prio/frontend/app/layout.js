import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0, background: '#f4f4f5' }}>
        {children}
      </body>
    </html>
  );
}