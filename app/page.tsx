import { SearchForm } from "@/components/search-form"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-500 to-yellow-500">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                    Compare Instant Car Service Deals
                  </h1>
                  <p className="max-w-[600px] text-white md:text-xl">
                    UK drivers have compared prices on BookMyGarage to book their MOT, service and repairs.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row lg:flex-col">
                <div className="flex-1 rounded-lg border bg-background p-8">
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How it works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Book your car service in 3 simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-black">
                  1
                </div>
                <h3 className="text-xl font-bold">Enter Details</h3>
                <p className="text-center text-muted-foreground">
                  Enter your vehicle registration and postcode
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-black">
                  2
                </div>
                <h3 className="text-xl font-bold">Compare Prices</h3>
                <p className="text-center text-muted-foreground">
                  Compare instant prices from local garages
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-bold text-black">
                  3
                </div>
                <h3 className="text-xl font-bold">Book Online</h3>
                <p className="text-center text-muted-foreground">
                  Book your service online instantly
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

