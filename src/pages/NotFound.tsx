import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main style={{ padding: '0 16px 24px' }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <p>
        <Link to="/">Go home</Link>
      </p>
    </main>
  )
}

