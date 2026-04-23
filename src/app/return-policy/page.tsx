import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReturnPolicyPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-40 pb-20">
        <h1 className="text-5xl font-bebas mb-12">Return Policy</h1>
        <div className="space-y-8 text-white/70 leading-relaxed font-light">
          <section>
            <h2 className="text-2xl text-white font-bebas mb-4">Refund Policy for Coaching</h2>
            <p>At Strider, we commit significant resources to each client upon signup. Therefore, the following refund terms apply:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Full refunds are available within 24 hours of purchase if coaching hasn't commenced.</li>
              <li>Once a custom blueprint has been delivered, a 50% cancellation fee applies.</li>
              <li>Monthly subscriptions can be cancelled at any time, but no partial refunds are given for the current billing cycle.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl text-white font-bebas mb-4">Digital Products</h2>
            <p>Standalone training guides and digital downloads are non-refundable once the download link has been accessed.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
