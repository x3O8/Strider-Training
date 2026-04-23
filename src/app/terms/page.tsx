import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-40 pb-20">
        <h1 className="text-5xl font-bebas mb-12">Terms and Conditions</h1>
        <div className="space-y-8 text-white/70 leading-relaxed font-light">
          <section>
            <h2 className="text-2xl text-white font-bebas mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Strider Fitness, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl text-white font-bebas mb-4">2. Coaching Services</h2>
            <p>Our coaching services are provided "as is". While we strive for excellence, results depend on individual commitment and physical response to training. We do not guarantee specific outcomes.</p>
          </section>
          <section>
            <h2 className="text-2xl text-white font-bebas mb-4">3. User Responsibility</h2>
            <p>Users are responsible for ensuring they are physically fit to engage in training programs. Consult with a physician before starting any new fitness regimen.</p>
          </section>
          <section>
            <h2 className="text-2xl text-white font-bebas mb-4">4. Intellectual Property</h2>
            <p>All content, including training plans, videos, and text, is the property of Strider Fitness and protected by copyright laws.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
