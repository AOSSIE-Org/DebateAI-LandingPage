import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg) text-(--text) transition-colors duration-200">
      <Header />
      <main className="flex-1 flex flex-col w-full">
        <LandingPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
