import { Header } from '../components/Header';
import './NotFound.css';
export function NotFoundPage(){
  return (
    <>
      <title>Page Not Found</title>
      <Header />
      <main className="not-found-page">
        <p>Page not found</p>
      </main>
    </>
  )
}