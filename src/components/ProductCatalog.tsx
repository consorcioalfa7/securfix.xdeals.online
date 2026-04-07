'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ShoppingCart,
  ChevronDown,
  SlidersHorizontal,
} from 'lucide-react';
import { getProductImage } from '@/lib/images';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  category: CategoryKey;
}

type CategoryKey =
  | 'hercules'
  | 'malha-solta'
  | 'eletrossoldada'
  | 'grades'
  | 'arames'
  | 'postes'
  | 'corta-fogo'
  | 'seguranca'
  | 'portoes-rede'
  | 'multiuso'
  | 'correr'
  | 'tramex'
  | 'acessorios';

interface CategoryTab {
  key: CategoryKey | 'todos';
  label: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRODUCTS_PER_PAGE = 24;

const CATEGORY_TABS: CategoryTab[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'hercules', label: 'Painel Hercules' },
  { key: 'malha-solta', label: 'Rede Malha Solta' },
  { key: 'eletrossoldada', label: 'Rede Eletrossoldada' },
  { key: 'grades', label: 'Grades' },
  { key: 'arames', label: 'Arames' },
  { key: 'postes', label: 'Postes' },
  { key: 'corta-fogo', label: 'Portas Corta-Fogo' },
  { key: 'seguranca', label: 'Portas de Segurança' },
  { key: 'portoes-rede', label: 'Portões de Rede' },
  { key: 'multiuso', label: 'Portas Multiuso' },
  { key: 'correr', label: 'Portas de Correr' },
  { key: 'tramex', label: 'Tramex' },
  { key: 'acessorios', label: 'Acessórios' },
];

const ALL_PRODUCTS: Product[] = [
  // ── Painel Hercules (1–7) ──
  { id: 1, name: 'Painel Malla Hercules Verde', originalPrice: 26.00, salePrice: 15.45, category: 'hercules' },
  { id: 2, name: 'Painel Malla Hercules Branca', originalPrice: 23.50, salePrice: 14.05, category: 'hercules' },
  { id: 3, name: 'Painel Malla Hercules Gris Antracita', originalPrice: 25.50, salePrice: 15.25, category: 'hercules' },
  { id: 4, name: 'Painel Malla Hercules Galvanizada', originalPrice: 24.00, salePrice: 14.35, category: 'hercules' },
  { id: 5, name: 'Cerca Hercules Verde Básico (2m)', originalPrice: 25.00, salePrice: 14.85, category: 'hercules' },
  { id: 6, name: 'Cerca Hercules Branco Básico (2m)', originalPrice: 28.50, salePrice: 17.10, category: 'hercules' },
  { id: 7, name: 'Cerca Hercules Cinza Básico (2m)', originalPrice: 30.00, salePrice: 17.85, category: 'hercules' },

  // ── Rede Malha Solta (8–11) ──
  { id: 8, name: 'Rolo Rede Malha Solta Galvanizada', originalPrice: 34.00, salePrice: 20.30, category: 'malha-solta' },
  { id: 9, name: 'Rolo Rede Malha Solta Verde', originalPrice: 49.00, salePrice: 29.40, category: 'malha-solta' },
  { id: 10, name: 'Rolo Rede Malha Tripla Torção Galinheiro', originalPrice: 18.00, salePrice: 10.55, category: 'malha-solta' },
  { id: 11, name: 'Rolo de Rede Ovelheira com Nó', originalPrice: 63.00, salePrice: 37.90, category: 'malha-solta' },

  // ── Rede Eletrossoldada (12–13) ──
  { id: 12, name: 'Painel Rede Eletrossoldada Galvanizada', originalPrice: 25.00, salePrice: 14.85, category: 'eletrossoldada' },
  { id: 13, name: 'Rolo Rede Eletrossoldada Galvanizada', originalPrice: 24.00, salePrice: 14.30, category: 'eletrossoldada' },

  // ── Grades (14–19) ──
  { id: 14, name: 'Grade Varilla Redonda 0.90 x 2.50 m', originalPrice: 152.00, salePrice: 91.50, category: 'grades' },
  { id: 15, name: 'Grade Maciço Quadrado 0.90 x 2.50 m', originalPrice: 203.00, salePrice: 122.00, category: 'grades' },
  { id: 16, name: 'Grade Maciço Quadrado Rombo 0.90 x 2.50 m', originalPrice: 203.00, salePrice: 122.00, category: 'grades' },
  { id: 17, name: 'Grade Modelo Aspe 0.60 x 2.50 m', originalPrice: 176.50, salePrice: 106.20, category: 'grades' },
  { id: 18, name: 'Grade Modelo Cadi 0.60 x 2.50 m', originalPrice: 289.50, salePrice: 174.35, category: 'grades' },
  { id: 19, name: 'Grade Modelo Montblanc 0.60 x 2.50 m', originalPrice: 266.00, salePrice: 160.15, category: 'grades' },

  // ── Arames (20–24) ──
  { id: 20, name: 'Rolo Arame Farpado Verde', originalPrice: 101.00, salePrice: 60.75, category: 'arames' },
  { id: 21, name: 'Rolo Arame Farpado Galvanizado', originalPrice: 76.50, salePrice: 46.00, category: 'arames' },
  { id: 22, name: 'Rolo Arame Plastificado 3 Kg', originalPrice: 31.00, salePrice: 18.65, category: 'arames' },
  { id: 23, name: 'Rolo Arame Galvanizado', originalPrice: 22.00, salePrice: 13.15, category: 'arames' },
  { id: 24, name: 'Rolo Arame Recozido', originalPrice: 25.00, salePrice: 14.85, category: 'arames' },

  // ── Postes (25–40) ──
  { id: 25, name: 'Poste Malha Hercules Verde', originalPrice: 11.00, salePrice: 6.45, category: 'postes' },
  { id: 26, name: 'Poste Malha Hercules Branco', originalPrice: 13.00, salePrice: 7.80, category: 'postes' },
  { id: 27, name: 'Poste Malha Hercules Gris Antracita', originalPrice: 14.50, salePrice: 8.60, category: 'postes' },
  { id: 28, name: 'Poste Malha Hercules Galvanizado', originalPrice: 8.00, salePrice: 4.60, category: 'postes' },
  { id: 29, name: 'Poste Cremallera Quickfix Verde', originalPrice: 11.50, salePrice: 6.90, category: 'postes' },
  { id: 30, name: 'Poste Intermediário Verde', originalPrice: 12.00, salePrice: 7.05, category: 'postes' },
  { id: 31, name: 'Poste Intermediário Galvanizado', originalPrice: 8.00, salePrice: 4.65, category: 'postes' },
  { id: 32, name: 'Poste Terminal Verde', originalPrice: 42.50, salePrice: 25.60, category: 'postes' },
  { id: 33, name: 'Poste Terminal Galvanizado', originalPrice: 29.00, salePrice: 17.25, category: 'postes' },
  { id: 34, name: 'Poste de Reforço Verde', originalPrice: 34.50, salePrice: 20.50, category: 'postes' },
  { id: 35, name: 'Poste de Reforço Galvanizado', originalPrice: 35.00, salePrice: 21.00, category: 'postes' },
  { id: 36, name: 'Poste Canto/Extensão Verde', originalPrice: 68.00, salePrice: 40.75, category: 'postes' },
  { id: 37, name: 'Poste Canto/Extensão Galvanizado', originalPrice: 55.00, salePrice: 32.85, category: 'postes' },
  { id: 38, name: 'Poste Tornapunta Galvanizado', originalPrice: 6.00, salePrice: 3.50, category: 'postes' },
  { id: 39, name: 'Poste Tornapunta Verde', originalPrice: 8.50, salePrice: 5.00, category: 'postes' },
  { id: 40, name: 'Barra Tensão Plastificada Verde', originalPrice: 7.50, salePrice: 4.50, category: 'postes' },

  // ── Portas Corta-Fogo (41–45) ──
  { id: 41, name: 'Porta Corta-Fogo P60 (EI 60) C5 1 Folha', originalPrice: 317.00, salePrice: 190.95, category: 'corta-fogo' },
  { id: 42, name: 'Porta Corta-Fogo P60 (EI 60) C5 2 Folhas', originalPrice: 704.00, salePrice: 563.20, category: 'corta-fogo' },
  { id: 43, name: 'Porta Corta-Fogo P90 (EI 90) C5 1 Folha', originalPrice: 542.50, salePrice: 326.55, category: 'corta-fogo' },
  { id: 44, name: 'Porta Corta-Fogo RF 90 (EI2 90) C5 2 Folhas', originalPrice: 951.00, salePrice: 760.80, category: 'corta-fogo' },
  { id: 45, name: 'Porta Corta-Fogo P120 (EI 120) C5 1 Folha', originalPrice: 755.50, salePrice: 454.95, category: 'corta-fogo' },

  // ── Portas de Segurança (46–53) ──
  { id: 46, name: 'Porta Segurança Cearco Grau 3 Standard 3 pontos', originalPrice: 594.99, salePrice: 475.99, category: 'seguranca' },
  { id: 47, name: 'Porta Blindada Verona V8 B4 Grau 3', originalPrice: 778.99, salePrice: 622.99, category: 'seguranca' },
  { id: 48, name: 'Porta Segurança Cearco Grau 3 Verona Dupla', originalPrice: 1390.00, salePrice: 1111.32, category: 'seguranca' },
  { id: 49, name: 'Porta Segurança Triana B4 Grau 3 3 Pontos', originalPrice: 876.99, salePrice: 701.99, category: 'seguranca' },
  { id: 50, name: 'Porta Segurança Triana Dupla B4 Grau 3', originalPrice: 1390.00, salePrice: 1111.32, category: 'seguranca' },
  { id: 51, name: 'Porta Segurança Cearco Grau 4 Omega Verona V8', originalPrice: 1113.00, salePrice: 889.99, category: 'seguranca' },
  { id: 52, name: 'Porta Segurança Cearco Grau 3 Milan 4 Vidros', originalPrice: 1140.99, salePrice: 912.99, category: 'seguranca' },
  { id: 53, name: 'Porta Acorazada Cearco Provenzal', originalPrice: 651.00, salePrice: 520.45, category: 'seguranca' },

  // ── Portões de Rede (54–63) ──
  { id: 54, name: 'Portão Rede Verde Premium 1m', originalPrice: 287.00, salePrice: 172.80, category: 'portoes-rede' },
  { id: 55, name: 'Portão Rede Branca Premium 1m', originalPrice: 287.00, salePrice: 172.80, category: 'portoes-rede' },
  { id: 56, name: 'Portão Rede Gris Antracita Premium 1m', originalPrice: 287.00, salePrice: 172.80, category: 'portoes-rede' },
  { id: 57, name: 'Portão Rede Galvanizada 1m', originalPrice: 287.00, salePrice: 172.80, category: 'portoes-rede' },
  { id: 58, name: 'Portão Rede Ondulado Galvanizada 0.90x1.00m', originalPrice: 424.00, salePrice: 255.20, category: 'portoes-rede' },
  { id: 59, name: 'Portão Rede Ondulado Verde', originalPrice: 441.00, salePrice: 265.60, category: 'portoes-rede' },
  { id: 60, name: 'Portão Rede Ligeira Verde 2 Folhas', originalPrice: 756.00, salePrice: 604.80, category: 'portoes-rede' },
  { id: 61, name: 'Portão Rede Ligeira Branca 2 Folhas', originalPrice: 757.00, salePrice: 605.30, category: 'portoes-rede' },
  { id: 62, name: 'Portão Rede Ligeira Cinza Escuro 2 Folhas', originalPrice: 818.00, salePrice: 653.75, category: 'portoes-rede' },
  { id: 63, name: 'Portão Malha Galvanizada Luz 2 Folhas', originalPrice: 636.00, salePrice: 508.05, category: 'portoes-rede' },

  // ── Portas Multiuso (64–68) ──
  { id: 64, name: 'Porta Multiuso Branca', originalPrice: 182.50, salePrice: 109.80, category: 'multiuso' },
  { id: 65, name: 'Porta Multiuso Grade', originalPrice: 196.00, salePrice: 117.95, category: 'multiuso' },
  { id: 66, name: 'Porta Multiuso Duas Folhas com Grade', originalPrice: 746.00, salePrice: 449.30, category: 'multiuso' },
  { id: 67, name: 'Porta Trastero Galvanizada', originalPrice: 154.00, salePrice: 92.50, category: 'multiuso' },
  { id: 68, name: 'Porta Trastero Galvanizada com Grade', originalPrice: 170.50, salePrice: 102.70, category: 'multiuso' },

  // ── Portas de Correr (69–72) ──
  { id: 69, name: 'Estrutura Porta de Correr Orchidea Basic', originalPrice: 412.00, salePrice: 248.05, category: 'correr' },
  { id: 70, name: 'Casoneto Orchidea PYL Simples', originalPrice: 412.00, salePrice: 248.05, category: 'correr' },
  { id: 71, name: 'Casoneto Orchidea PYL Duplo', originalPrice: 638.00, salePrice: 510.30, category: 'correr' },
  { id: 72, name: 'Cassete Porta de Correr Reboco', originalPrice: 383.50, salePrice: 230.75, category: 'correr' },

  // ── Tramex (73) ──
  { id: 73, name: 'Gradil Tramex', originalPrice: 26.50, salePrice: 15.90, category: 'tramex' },

  // ── Acessórios (74–84) ──
  { id: 74, name: 'Barra Antipânico', originalPrice: 118.00, salePrice: 118.00, category: 'acessorios' },
  { id: 75, name: 'Fechadura Antitaladro', originalPrice: 51.99, salePrice: 41.99, category: 'acessorios' },
  { id: 76, name: 'Cierrapuertas Standard', originalPrice: 49.50, salePrice: 49.50, category: 'acessorios' },
  { id: 77, name: 'Cierrapuertas Premium', originalPrice: 106.50, salePrice: 106.50, category: 'acessorios' },
  { id: 78, name: 'Vigia Corta-Fogo', originalPrice: 327.00, salePrice: 327.00, category: 'acessorios' },
  { id: 79, name: 'Eletroímã', originalPrice: 129.50, salePrice: 129.50, category: 'acessorios' },
  { id: 80, name: 'Seletor de Fecho', originalPrice: 92.00, salePrice: 92.00, category: 'acessorios' },
  { id: 81, name: 'Varão Nervurado 8mm', originalPrice: 22.00, salePrice: 13.15, category: 'acessorios' },
  { id: 82, name: 'Varão Nervurado 10mm', originalPrice: 29.00, salePrice: 17.40, category: 'acessorios' },
  { id: 83, name: 'Tinta em Spray Verde', originalPrice: 8.50, salePrice: 5.00, category: 'acessorios' },
  { id: 84, name: 'Tinta em Spray Galvanizado', originalPrice: 8.50, salePrice: 5.00, category: 'acessorios' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return price.toLocaleString('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function isOnSale(product: Product): boolean {
  return product.salePrice < product.originalPrice;
}

function getCategoryLabel(key: CategoryKey): string {
  const tab = CATEGORY_TABS.find((t) => t.key === key);
  return tab ? tab.label : key;
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const onSale = isOnSale(product);
  const categoryLabel = getCategoryLabel(product.category);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, delay: (index % PRODUCTS_PER_PAGE) * 0.03 }}
      layout
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
    >
      {/* Product image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={getProductImage(product.name)}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />

        {/* OFERTA badge */}
        {onSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
            OFERTA
          </span>
        )}

        {/* Category badge */}
        <span className="absolute top-2 right-2 bg-[#ea6663] text-white text-xs font-medium px-2 py-0.5 rounded z-10">
          {categoryLabel}
        </span>
      </div>

      {/* Product info */}
      <div className="flex flex-col flex-1 px-3 pt-2 pb-3">
        {/* Name */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price + button spacer */}
        <div className="mt-auto">
          {/* Prices */}
          <div className="mb-3">
            {onSale && (
              <span className="text-sm text-gray-400 line-through mr-2">
                {formatPrice(product.originalPrice)} €
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.salePrice)} €
            </span>
          </div>

          {/* Add button */}
          <button
            type="button"
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="w-full bg-black text-white text-sm font-medium rounded py-2.5 px-4 hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'todos'>('todos');
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  // Filter products
  const filteredProducts =
    activeCategory === 'todos'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  // Products currently visible
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Whether there are more to load
  const hasMore = visibleCount < filteredProducts.length;

  // Reset visible count when category changes
  function handleCategoryChange(key: CategoryKey | 'todos') {
    setActiveCategory(key);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE);
  }

  return (
    <section
      className="bg-gray-50 py-12 md:py-16"
      aria-labelledby="catalog-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="text-center mb-10">
          <h2
            id="catalog-title"
            className="text-3xl md:text-4xl font-bold tracking-wide uppercase text-black mb-3"
          >
            Catálogo Completo de{' '}
            <span className="relative inline-block">
              Produtos
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#ea6663] rounded" />
            </span>
          </h2>
          <p className="text-[rgb(111,111,111)] max-w-2xl mx-auto text-base md:text-lg">
            Todos os nossos produtos com preços de fábrica. Preços com IVA incluído.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="mb-8">
          {/* Desktop: wrapped tabs with filter icon */}
          <div className="hidden md:flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mr-1">
              Filtrar por categoria
            </span>
          </div>

          {/* Scrollable tabs */}
          <nav
            className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:pb-0 scrollbar-thin"
            role="tablist"
            aria-label="Categorias de produtos"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(tab.key)}
                  className={`
                    flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2
                    ${
                      isActive
                        ? 'bg-[#ea6663] text-white shadow-sm'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">{visibleProducts.length}</span>{' '}
            de{' '}
            <span className="font-semibold text-gray-700">{filteredProducts.length}</span>{' '}
            produtos
          </p>

          {activeCategory !== 'todos' && (
            <button
              type="button"
              onClick={() => handleCategoryChange('todos')}
              className="text-sm text-[#ea6663] hover:text-[#d94f4c] font-medium transition-colors focus-visible:outline-none focus-visible:underline"
            >
              Mostrar todos
            </button>
          )}
        </div>

        {/* ── Product grid ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Load More button ── */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <motion.button
              type="button"
              onClick={handleLoadMore}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white font-medium text-base px-8 py-3.5 rounded-lg hover:bg-gray-800 active:bg-gray-900 transition-colors duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2"
            >
              <ChevronDown className="w-5 h-5" />
              Carregar Mais Produtos
            </motion.button>
          </div>
        )}

        {/* ── End of results ── */}
        {!hasMore && filteredProducts.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-10">
            Mostrados todos os {filteredProducts.length} produtos
            {activeCategory !== 'todos' && (
              <span> da categoria &quot;{getCategoryLabel(activeCategory)}&quot;</span>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
