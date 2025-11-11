interface HomeCardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

export default function HomeCard({
  image,
  title,
  description,
  buttonText,
  buttonLink = "#",
}: HomeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover"
      />
      <div className="p-6 text-center space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <a
          href={buttonLink}
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}
