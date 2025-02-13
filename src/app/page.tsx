"use client";
import Header from "./ui/main/header";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { Footer } from "./ui/main/footer";
import PricingCard from "./ui/main/pricingcard";

export default function Home() {
  const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
  );
  const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
  );
  const stats = [
    { label: "Active Players", value: "1,000+" },
    { label: "Matches Played", value: "5,000+" },
    { label: "Tennis Courts", value: "50+" },
    { label: "Avg Rating", value: "4.8" },
  ];
  const pricingPlans = [
    {
      name: "Free Tier",
      description: "Perfect for casual players looking to find matches",
      price: "$0",
      buttonText: "Get Started",
      features: [
        { text: "Basic matchmaking", included: true },
        { text: "Court discovery", included: true },
        { text: "Basic stats", included: true },
        { text: "Priority queue", included: false },
        { text: "Advanced analytics", included: false },
      ],
    },
    {
      name: "Premium",
      description:
        "Enhanced matching & priority features for dedicated players",
      price: "$5",
      buttonText: "Upgrade Now",
      isPopular: true,
      features: [
        { text: "Basic matchmaking", included: true },
        { text: "Court discovery", included: true },
        { text: "Basic stats", included: true },
        { text: "Priority queue", included: true },
        { text: "Advanced analytics", included: true },
      ],
    },
    {
      name: "Club Membership",
      description: "Join your local club's network",
      price: "Custom",
      buttonText: "Contact Us",
      features: [
        { text: "All Premium features", included: true },
        { text: "Club network access", included: true },
        { text: "Tournament access", included: true },
        { text: "Custom branding", included: true },
        { text: "Dedicated support", included: true },
      ],
    },
  ];
  return (
    <main>
      <div
        className="z-0 h-screen bg-no-repeat bg-cover bg-center relative"
        style={{
          backgroundImage: `radial-gradient(circle at center, #0c0c0c2b 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      >
        <Header />
        {/* <div className="flex fit-items-center justify-center m-28 p-4 "> */}
        {/* <div className="flex flex-box text-black text-center mt-46 m-1">
            <h1 className="text-9xl font-bold  md:text-5xl lg:text-6xl">
              <span className="text-secondary">Gamify</span> your Tennis
              Experience
              <br />
              to the<span className="text-secondary"> Next Level</span>
            </h1>
          </div>
        </div> */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold leading-tight mb-6">
                  Level Up Your
                  <span className="text-secondary"> Tennis Game</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Connect with players at your skill level, track your progress,
                  and discover new tennis courts in your area.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/signup"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
                  >
                    Start Playing Free
                    {/* <ArrowRight className="ml-2 w-5 h-5" /> */}
                  </a>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10"
                  >
                    How it Works
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                  <MapContainer
                    style={{ height: "100%", width: "100%" }}
                    center={[45.34472, -75.695]}
                    zoom={12}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="py-16 m-auto">
          <div className="max-w-5xl mx-auto ">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Choose the plan that works best for you
              </p>
            </div>
            <div className="grid grid-cols-3 text-text justify-center gap-10 max-w-8xl  ">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  name={plan.name}
                  description={plan.description}
                  price={plan.price}
                  buttonText={plan.buttonText}
                  isPopular={plan.isPopular}
                  features={plan.features}
                  // onButtonClick={() => handlePlanSelection(plan.name)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Improve Your Game?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of tennis players and start finding your perfect
              matches today.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
            >
              Get Started Free
              {/* <ArrowRight className="ml-2 w-5 h-5" /> */}
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
