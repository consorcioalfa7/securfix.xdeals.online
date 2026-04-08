'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import Image from 'next/image';
import { getProductImage } from '@/lib/images';
import { useCartStore } from '@/lib/cart-store';

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  category: string;
}

interface Tab {
  id: string;
  label: string;
  products: Product[];
}

const tabs: Tab[] = [
  {
    id: 'vedacoes',
    label: 'Vedações Metálicas',
    products: [
      { id: 101, name: 'Painel de Vedação Cinza', originalPrice: 25.5, salePrice: 15.25, category: 'vedacoes' },
      { id: 102, name: 'Rede Eletrossoldada Galvanizada', originalPrice: 25.0, salePrice: 14.85, category: 'vedacoes' },
      { id: 103, name: 'Grade de Ferro Maciço Quadrado 1,00 x 2,25 m', originalPrice: 203.0, salePrice: 122.0, category: 'vedacoes' },
      { id: 104, name: 'Gradil Tramex', originalPrice: 26.5, salePrice: 15.9, category: 'vedacoes' },
      { id: 105, name: 'Portão de Vedação Cinza Premium', originalPrice: 287.0, salePrice: 172.8, category: 'vedacoes' },
      { id: 106, name: 'Poste Malha Hercules Verde', originalPrice: 11.0, salePrice: 6.45, category: 'vedacoes' },
      { id: 107, name: 'Rolo de Arame Farpado Verde', originalPrice: 101.0, salePrice: 60.75, category: 'vedacoes' },
      { id: 108, name: 'Rolo de Rede Ovelheira com Nó', originalPrice: 63.0, salePrice: 37.9, category: 'vedacoes' },
    ],
  },
  {
    id: 'portas',
    label: 'Portas',
    products: [
      { id: 201, name: 'Porta Corta-Fogo P60 (EI 60) C5 1 Folha', originalPrice: 317.0, salePrice: 190.95, category: 'portas' },
      { id: 202, name: 'Porta de Segurança Grau 3 Cearco Standard', originalPrice: 594.99, salePrice: 475.99, category: 'portas' },
      { id: 203, name: 'Portão de Vedação Cinza Premium', originalPrice: 287.0, salePrice: 172.8, category: 'portas' },
      { id: 204, name: 'Porta Multiuso Branca', originalPrice: 182.5, salePrice: 109.8, category: 'portas' },
      { id: 205, name: 'Porta de Segurança Triana B4 Grau 3', originalPrice: 876.99, salePrice: 701.99, category: 'portas' },
      { id: 206, name: 'Estrutura Porta de Correr Orchidea Basic', originalPrice: 412.0, salePrice: 248.05, category: 'portas' },
      { id: 207, name: 'Porta Corta-Fogo P90 (EI 90) C5 1 Folha', originalPrice: 542.5, salePrice: 326.55, category: 'portas' },
      { id: 208, name: 'Porta Corta-Fogo P120 (EI 120) C5 1 Folha', originalPrice: 755.5, salePrice: 454.95, category: 'portas' },
    ],
  },
];

function formatPrice(value: number): string {
  return value.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getDiscountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}

function ProductCard({ product }: { product: Product }) {
  const discount = getDiscountPercent(product.originalPrice, product.salePrice);
  const productImage = getProductImage(product.name);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    addItem({
      id: product.id,
      name: product.name,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      category: product.category,
      image: productImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
    setTimeout(() => openCart(), 400);
  }, [product, addItem, openCart, productImage]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Product image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          OFERTA
        </span>
      </div>

      {/* Product info */}
      <div className="px-3 py-2 flex-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
          {product.name}
        </h3>
      </div>

      {/* Price area */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(product.originalPrice)} €
          </span>
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-1.5 py-0.5 rounded">
            {discount}% OFF
          </span>
        </div>
        <p className="text-lg font-bold text-gray-900 mb-3">
          {formatPrice(product.salePrice)} €
        </p>
        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          {added ? 'Adicionado!' : 'Adicionar'}
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<string>('vedacoes');

  const activeProducts = tabs.find((t) => t.id === activeTab)?.products ?? [];

  return (
    <section
      className="w-full bg-gray-50 py-16 md:py-24"
      aria-labelledby="products-title"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <div className="text-center mb-10">
          <h2
            id="products-title"
            className="text-3xl md:text-4xl font-bold tracking-wide text-black uppercase mb-3"
          >
            Produtos em{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Destaque</span>
              <span className="absolute bottom-1 left-0 w-full h-1.5 bg-[#ea6663] rounded-full" />
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div
          className="flex sm:justify-center gap-2 mb-10 border-b border-gray-200 overflow-x-auto scrollbar-thin"
          role="tablist"
          aria-label="Categorias de produtos"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 whitespace-nowrap flex-shrink-0
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2
                ${
                  activeTab === tab.id
                    ? 'text-[#ea6663]'
                    : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="active-tab-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ea6663] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {activeProducts.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
