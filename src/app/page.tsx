import Hero from "./components/Hero/HeroSection"
import ProductTable from "./components/Product/ProductTable"

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto">
      <Hero />
      <ProductTable />
    </main>
  )
}

