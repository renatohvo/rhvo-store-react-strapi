import React, { useEffect, useState, useRef } from "react";
import Layout from '../../components/Layout';
import { useParams } from "react-router-dom";
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { formatNumber, calcPrice } from '../../helpers/utils';
import NotFound from '../NotFound';
import styles from './ProductDetails.module.scss';

const ProductDetails = () => {

  const { id } = useParams();
  const { products } = useProducts();
  const { addProduct, cartItems, increase } = useCart();

  const [carouselWidth, setCarouselWidth] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const { offsetWidth } = carouselRef.current || {};
    if (offsetWidth) setCarouselWidth(offsetWidth);
  }, []);

  const product = products.find(p => p.id === Number(id));
  if (!product) {
    return <NotFound />
  }

  const mainImage = product.attributes.main_image.data.attributes.url;
  const othersImages = product.attributes.images.data;
  const images = [mainImage];
  if (othersImages && othersImages.length > 0) {
    othersImages.forEach((image) => {
      images.push(image.attributes.url);
    });
  }

  const isInCart = product => {
    return !!cartItems.find(item => item.id === product.id);
  }

  function handleSwipe(swipeDistance) {
    const swipeThreshold = carouselWidth / 4;
    if (Math.abs(swipeDistance) < swipeThreshold) return;

    const direction = swipeDistance > 0 ? -1 : 1;
    const nextIndex = currentImageIndex + direction;

    if (nextIndex < 0 || nextIndex > images.length - 1) return;
    setCurrentImageIndex(nextIndex);
  }

  const newPrice = calcPrice(product.attributes.price, product.attributes.discount);
  const oldPrice = product.attributes.price;

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
