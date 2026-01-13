import './font.css';
import Login from './components/login'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <Login/>
        </div>
      </main>
    </div>

  );
}
