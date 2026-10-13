import { Header } from '../components/Header';
import './NotFound.css';
export function NotFoundPage({cart}){
  return (
    <>
      <title>Page Not Found</title>
      <Header cart={cart} />
      <main className="not-found-page">
        <p>Page not found</p>
      </main>
    </>
  )
}