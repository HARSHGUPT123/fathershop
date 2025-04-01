import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryProducts() {
    const router = useRouter();
    const { id } = router.query;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:8000/api/categories/${id}`)
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Category not found");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Category Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <a href={`/product/${product.id}`}>
                            <img src={product.image} alt={product.name} width={100} />
                            <p>{product.name}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
