type SearchBarProps = {
    query: string;
    onQueryChange: (value: string) => void;
}

export default function SearchBar({query, onQueryChange}: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Search (min 3 chars) ..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="mb-5 border rounded-xl bg-zinc-950/60 px-3 py-2 flex-1 text-zinc-100
                                     placeholder:text-zinc-500 ring-q ring-zinc-800 focus:outline-none focus:ring-2
                                     focus:ring-indigo-500 bg-zinc"
        />
    )
}