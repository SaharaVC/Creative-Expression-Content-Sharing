
import { useState } from "react";
import { searchGifs, saveGif } from "../api/gifApi";

const GifSearch = ({ commentId, onGifSaved }) => {
    const [query, setQuery] = useState("");
    const [gifs, setGifs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);

            const results = await searchGifs(query);
            setGifs(results);

        } catch (err) {
            setError("Error loading GIFs (rate limit or server issue)");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = async (gif) => {
        try {
            await saveGif(gif, commentId);
            onGifSaved(); // refresh parent
        } catch (err) {
            setError("Failed to save GIF");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search GIFs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {gifs.map((gif) => (
                    <img
                        key={gif.giphyId}
                        src={gif.previewUrl}
                        alt=""
                        style={{ cursor: "pointer", width: "100px" }}
                        onClick={() => handleSelect(gif)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GifSearch;