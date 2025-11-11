import HomeCard from "../components/HomeCard";
import img1 from "../../../assets/1.webp";
import img2 from "../../../assets/2.webp";
import img3 from "../../../assets/3.webp";

export default function HomePage() {


  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-400 mb-3">Welcome to EduCart</h1>
        <p className="text-gray-600 text-lg">
          Smart tools, study materials, and workspace essentials to boost your productivity.
        </p>
      </div>

      <div className="container mx-auto grid gap-8 md:grid-cols-3 px-6">
        <HomeCard
          image={img1}
          title="Study Materials"
          description="Boost your learning with curated study resources."
          buttonText="Browse Collection"
          buttonLink="/products"
        />
        <HomeCard
          image={img2}
          title="Tech Tools"
          description="Find top-rated gadgets to enhance productivity."
          buttonText="Explore Gadgets"
          buttonLink="/products"
        />
        <HomeCard
          image={img3}
          title="Workspace Setup"
          description="Upgrade your study environment with ergonomic tools."
          buttonText="View Options"
          buttonLink="/products"
        />
      </div>
    </section>
  );
}
