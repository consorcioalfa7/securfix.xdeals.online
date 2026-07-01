'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ShoppingCart,
  ChevronDown,
  SlidersHorizontal,
  Check,
  X,
  Ruler,
  Info,
  CheckCircle2,
  Wrench,
} from 'lucide-react';
import { getProductImage } from '@/lib/images';
import { useCartStore } from '@/lib/cart-store';
import {
  ALL_PRODUCTS,
  CATEGORY_TABS,
  type EnrichedProduct,
  type CategoryKey,
} from '@/lib/products-data';

// ─── Constants ───────────────────────────────────────────────────────────────

const PRODUCTS_PER_PAGE = 24;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return price.toLocaleString('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function isOnSale(product: EnrichedProduct): boolean {
  return product.salePrice < product.originalPrice;
}

function getCategoryLabel(key: CategoryKey | 'todos'): string {
  if (key === 'todos') return 'Todos';
  const tab = CATEGORY_TABS.find((t) => t.key === key);
  return tab ? tab.label : key;
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ─── Product Detail Modal ────────────────────────────────────────────────────

function ProductDetailModal({
  product,
  onClose,
}: {
  product: EnrichedProduct | null;
  onClose: () => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      originalPrice: product.originalPrice,
      salePrice: product.salePrice,
      category: product.category,
      image: getProductImage(product.name),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setTimeout(() => {
      onClose();
      openCart();
    }, 600);
  }, [product, addItem, openCart, onClose]);

  if (!product) return null;

  const onSale = isOnSale(product);
  const specEntries = Object.entries(product.specs);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes: ${product.name}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-1.5 text-gray-500 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="overflow-y-auto">
            {/* Image + header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              <div className="relative aspect-square sm:aspect-auto bg-gray-100">
                <Image
                  src={getProductImage(product.name)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized
                />
                {onSale && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                    OFERTA
                  </span>
                )}
              </div>

              <div className="p-5 sm:p-6 flex flex-col">
                <span className="inline-block self-start bg-[#ea6663] text-white text-xs font-medium px-2 py-0.5 rounded mb-3">
                  {getCategoryLabel(product.category)}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                  {product.name}
                </h2>

                {product.dimensions && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Ruler className="h-4 w-4 text-[#ea6663] shrink-0" />
                    <span className="font-medium">{product.dimensions}</span>
                  </div>
                )}

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>

                {product.application && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Wrench className="h-3.5 w-3.5 shrink-0" />
                    <span>Aplicação: <strong className="text-gray-700">{product.application}</strong></span>
                  </div>
                )}

                {/* Price */}
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    {onSale && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.originalPrice)} €
                      </span>
                    )}
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {formatPrice(product.salePrice)} €
                    </span>
                    <span className="text-xs text-gray-400">IVA incluído</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`w-full text-white text-sm font-bold rounded-lg py-3 px-4 transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] ${
                      added
                        ? 'bg-green-600'
                        : 'bg-[#ea6663] hover:bg-[#d94f4c] active:scale-[0.98]'
                    }`}
                  >
                    {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                    {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
                  </button>
                </div>
              </div>
            </div>

            {/* Long description */}
            {product.longDescription && (
              <div className="px-5 sm:px-6 py-4 border-t border-gray-100">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                  <Info className="h-4 w-4 text-[#ea6663]" />
                  Descrição técnica
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.longDescription}
                </p>
              </div>
            )}

            {/* Highlights */}
            {product.highlights.length > 0 && (
              <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  <CheckCircle2 className="h-4 w-4 text-[#ea6663]" />
                  Características principais
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specs table */}
            {specEntries.length > 0 && (
              <div className="px-5 sm:px-6 py-4 border-t border-gray-100">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  <Ruler className="h-4 w-4 text-[#ea6663]" />
                  Ficha técnica
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                  {specEntries.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-3 py-1.5 border-b border-gray-100 last:border-0"
                    >
                      <dt className="text-sm text-gray-500 shrink-0">{key}</dt>
                      <dd className="text-sm font-medium text-gray-900 text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
  onOpenDetails,
}: {
  product: EnrichedProduct;
  index: number;
  onOpenDetails: (p: EnrichedProduct) => void;
}) {
  const onSale = isOnSale(product);
  const categoryLabel = getCategoryLabel(product.category);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addItem({
        id: product.id,
        name: product.name,
        originalPrice: product.originalPrice,
        salePrice: product.salePrice,
        category: product.category,
        image: getProductImage(product.name),
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
      setTimeout(() => openCart(), 400);
    },
    [product, addItem, openCart],
  );

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, delay: (index % PRODUCTS_PER_PAGE) * 0.03 }}
      layout
      onClick={() => onOpenDetails(product)}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer"
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

        {/* Hover "Ver detalhes" overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            Ver detalhes
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col flex-1 px-3 pt-2 pb-3">
        {/* Name */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1.5 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Dimensions (new) */}
        {product.dimensions && (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-2">
            <Ruler className="h-3 w-3 shrink-0" />
            <span className="truncate">{product.dimensions}</span>
          </div>
        )}

        {/* Top spec preview (new) */}
        {(() => {
          const specVals = Object.entries(product.specs);
          const preview = specVals.find(([k]) => /material|cor|acabamento/i.test(k)) || specVals[0];
          if (!preview) return null;
          return (
            <p className="text-[11px] text-gray-400 mb-2 truncate">
              <span className="font-medium text-gray-500">{preview[0]}:</span> {preview[1]}
            </p>
          );
        })()}

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
            onClick={handleAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className={`w-full text-white text-sm font-medium rounded py-3 px-4 transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea6663] focus-visible:ring-offset-2 ${
              added
                ? 'bg-green-600'
                : 'bg-black hover:bg-gray-800 active:bg-gray-900'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            {added ? 'Adicionado!' : 'Adicionar'}
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
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null);

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
            Todos os nossos produtos com preços de fábrica. Clique num produto para ver dimensões, ficha técnica e características. Preços com IVA incluído.
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
              className="text-sm text-[#ea6663] hover:text-[#d94f4c] font-medium transition-colors focus-visible:outline-none focus-visible:underline px-2 py-1 -ml-2 rounded"
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
                onOpenDetails={setSelectedProduct}
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

      {/* ── Product detail modal ── */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
