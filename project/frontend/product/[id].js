import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Product not found");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} width={200} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}
