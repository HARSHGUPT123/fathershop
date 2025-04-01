import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/categories")
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load categories");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <a href={`/categories/${category.id}`}>
                            <img src={category.image} alt={category.name} width={100} />
                            <p>{category.name}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
