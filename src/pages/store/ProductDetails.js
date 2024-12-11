import React, { useEffect, useState, useRef } from "react";
import Layout from '../../components/Layout';
import { useParams } from "react-router-dom";
import { useCart } from '../../hooks/useCart';
import { formatNumber } from '../../helpers/utils';

const ProductDetails = () => {

  const { addProduct, cartItems, increase } = useCart();

  const isInCart = product => {
    return !!cartItems.find(item => item.id === product.id);
  }

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const { offsetWidth } = carouselRef.current || {};
    if (offsetWidth) setCarouselWidth(offsetWidth);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_HOST}/api/products/${id}?populate=*`
        );
        const res = await response.json();
        setProduct(res.data);
        const mainImage = res.data.attributes.main_image.data.attributes.url;
        const images = res.data.attributes.images.data;

        const arrayImages = [mainImage];
        if (images && images.length > 0) {
          images.forEach((image) => {
            arrayImages.push(image.attributes.url);
          });
        }
        setImages(arrayImages);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  function handleSwipe(swipeDistance) {
    const swipeThreshold = carouselWidth / 4;
    if (Math.abs(swipeDistance) < swipeThreshold) return;

    const direction = swipeDistance > 0 ? -1 : 1;
    const nextIndex = currentImageIndex + direction;

    if (nextIndex < 0 || nextIndex > images.length - 1) return;
    setCurrentImageIndex(nextIndex);
  }

  const discountAmount = product?.attributes.price * (product?.attributes.discount / 100);
  const newPrice = Math.trunc(product?.attributes.price - discountAmount);
  const oldPrice = Math.trunc(product?.attributes.price);

  if (loading) return <p>Loading...</p>;

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Layout title="Product" description="This is the Product page" >
      <div>
        <section style={{ display: 'flex', gap: '16px', padding: '16px' }}>
          {/* Container de imagens (à esquerda) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px', flex: '0 0 60%' }}>
            <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
              <div
                ref={carouselRef}
                style={{ display: 'flex', cursor: 'grab', transform: `translateX(-${currentImageIndex * 100}%)` }}
                onDragEnd={(e) => handleSwipe(e.nativeEvent.offsetX)}
              >
                {images.map((image, index) => (
                  <div key={index} style={{ minWidth: '100%', overflow: 'hidden' }}>
                    <img
                      style={{ width: '100%', objectFit: 'cover' }}
                      src={image}
                      alt={index}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {images.map((image, index) => (
                <button
                  key={index}
                  style={{ opacity: index !== currentImageIndex ? 0.5 : 1 }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    style={{ width: '100%', objectFit: 'cover' }}
                    src={image}
                    alt={`Img ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Container de informações (à direita) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', flex: 1 }}>
            <h1 style={{ fontSize: '2rem', color: '#1a202c' }}>{product.attributes.title}</h1>
            <div>
              <span style={{ color: '#718096' }}>DESCRIPTION</span>
              <p style={{ color: '#4a5568' }}>{product.attributes.characteristics}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '2rem' }}>{formatNumber(newPrice)}</span>
              {product.attributes.discount > 0 && (
                <span style={{ color: '#718096', textDecoration: 'line-through' }}>{`$${oldPrice}`}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {
                isInCart(product) &&
                <button
                  onClick={() => increase(product)}
                  className="btn btn-outline-primary btn-sm">Add more</button>
              }
              {
                !isInCart(product) &&
                <button
                  onClick={() => addProduct(product)}
                  className="btn btn-primary btn-sm">Add to cart</button>
              }
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;
