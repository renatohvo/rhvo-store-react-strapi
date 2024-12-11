import React, { useEffect, useState, useRef } from "react";
import Layout from '../../components/Layout';
import { useParams } from "react-router-dom";
import { useCart } from '../../hooks/useCart';
import { formatNumber } from '../../helpers/utils';
import styles from './ProductDetails.module.scss';
import Loading from "../Loading";

const ProductDetails = () => {

  const { addProduct, cartItems, increase } = useCart();

  const isInCart = product => {
    return !!cartItems.find(item => item.id === product.id);
  }

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
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

  if (isLoading) return <Loading />;

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <Layout title="Product" description="This is the Product page" >
      <div>
        <section className={styles.productDetailsSection}>
          {/* Container de imagens (à esquerda) */}
          <div className={styles.imageContainer}>
            <div className={styles.imageCarousel}>
              <div
                ref={carouselRef}
                className={styles.imageSlide}
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                onDragEnd={(e) => handleSwipe(e.nativeEvent.offsetX)}
              >
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={index}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.imageThumbnails}>
              {images.map((image, index) => (
                <button
                  key={index}
                  className={index !== currentImageIndex ? styles.imageThumbnailsInactive : styles.imageThumbnailsActive}
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
          <div className={styles.descriptionContainer}>
            <h1 className={styles.productTitle}>{product.attributes.title}</h1>
            <div>
              <span style={{ color: '#718096' }}>DESCRIÇÃO</span>
              <p className={styles.productDescription}>{product.attributes.characteristics}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={styles.productPrice}>{formatNumber(newPrice)}</span>
              {product.attributes.discount > 0 && (
                <span className={styles.discountedPrice}>{formatNumber(oldPrice)}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {
                isInCart(product) &&
                <button
                  onClick={() => increase(product)}
                  className="btn btn-outline-primary btn-sm">Adicionar mais</button>
              }
              {
                !isInCart(product) &&
                <button
                  onClick={() => addProduct(product)}
                  className="btn btn-primary btn-sm">Adicionar ao carrinho</button>
              }
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;
