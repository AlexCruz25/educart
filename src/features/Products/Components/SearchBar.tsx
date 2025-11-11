interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="flex justify-center mb-8">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        // TODO: conectar más adelante con búsqueda desde API
      />
    </div>
  );
}
