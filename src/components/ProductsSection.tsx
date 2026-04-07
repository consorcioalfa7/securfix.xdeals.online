'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingCart } from 'lucide-react';

interface Product {
  name: string;
  originalPrice: number;
  salePrice: number;
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
      { name: 'Painel de Vedação Cinza', originalPrice: 25.5, salePrice: 15.25 },
      { name: 'Rede Eletrossoldada Galvanizada', originalPrice: 25.0, salePrice: 14.85 },
      { name: 'Grade de Ferro Maciço Quadrado 1,00 x 2,25 m', originalPrice: 203.0, salePrice: 122.0 },
      { name: 'Gradil Tramex', originalPrice: 26.5, salePrice: 15.9 },
      { name: 'Portão de Vedação Cinza Premium', originalPrice: 287.0, salePrice: 172.8 },
      { name: 'Poste Malha Hercules Verde', originalPrice: 11.0, salePrice: 6.45 },
      { name: 'Rolo de Arame Farpado Verde', originalPrice: 101.0, salePrice: 60.75 },
      { name: 'Rolo de Rede Ovelheira com Nó', originalPrice: 63.0, salePrice: 37.9 },
    ],
  },
  {
    id: 'portas',
    label: 'Portas',
    products: [
      { name: 'Porta Corta-Fogo P60 (EI 60) C5 1 Folha', originalPrice: 317.0, salePrice: 190.95 },
      { name: 'Porta de Segurança Grau 3 Cearco Standard', originalPrice: 594.99, salePrice: 475.99 },
      { name: 'Portão de Vedação Cinza Premium', originalPrice: 287.0, salePrice: 172.8 },
      { name: 'Porta Multiuso Branca', originalPrice: 182.5, salePrice: 109.8 },
      { name: 'Porta de Segurança Triana B4 Grau 3', originalPrice: 876.99, salePrice: 701.99 },
      { name: 'Estrutura Porta de Correr Orchidea Basic', originalPrice: 412.0, salePrice: 248.05 },
      { name: 'Porta Corta-Fogo P90 (EI 90) C5 1 Folha', originalPrice: 542.5, salePrice: 326.55 },
      { name: 'Porta Corta-Fogo P120 (EI 120) C5 1 Folha', originalPrice: 755.5, salePrice: 454.95 },
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      {/* Image placeholder */}
      <div className="relative bg-gray-100 aspect-square flex items-center justify-center">
        <Package className="w-12 h-12 text-gray-300" />
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
        <button className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm font-semibold py-2.5 rounded hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2">
          <ShoppingCart className="w-4 h-4" />
          Adicionar
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
          className="flex justify-center gap-2 mb-10 border-b border-gray-200"
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
                relative px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-colors duration-200
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
