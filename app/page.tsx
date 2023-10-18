import Contact from '@/components/Contact';
import Featured from '@/components/Featured';
import Offer from '@/components/Offer';
import Slider from '@/components/Slider';

export default function Home() {
  return (
    <main className="pt-12">
      <Offer />
      <Featured />
      <Slider />
      <Contact />
    </main>
  );
}
