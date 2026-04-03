import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, RotateCcw } from 'lucide-react';
import { useGetFeaturedProductsQuery } from '../features/products/productsApi';
import { useGetCategoriesQuery } from '../features/categories/categoriesApi';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';

const perks = [
  { icon: Truck, title: 'Free shipping', desc: 'On orders over $50' },
  { icon: RotateCcw, title: 'Easy returns', desc: '30-day return policy' },
  { icon: Shield, title: 'Secure checkout', desc: 'SSL encrypted payments' },
];

export function HomePage() {
  const { data: featuredData, isLoading: loadingFeatured } = useGetFeaturedProductsQuery(8);
  const { data: categories, isLoading: loadingCats } = useGetCategoriesQuery();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Discover <br /> your next<br /> favourite thing
            </h1>
            <p className="text-indigo-100 text-lg mb-8">
              Thousands of products, curated for you. Shop the latest trends with confidence.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                asChild
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold"
              >
                <Link to="/products">Shop now <ArrowRight className="ml-2 w-4 h-4 inline" /></Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-purple-400 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-indigo-300 blur-2xl" />
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{title}</div>
                <div className="text-sm text-gray-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {loadingCats
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-28 rounded-2xl bg-gray-100 animate-pulse" />
              ))
            : categories?.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/products?categoryId=${cat.id}`}
                  className="group relative h-28 rounded-2xl overflow-hidden bg-gray-100 hover:shadow-md transition-shadow"
                >
                  {cat.image && (
                    <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm">{cat.name}</span>
                </Link>
              ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured products</h2>
          <Link to="/products" className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingFeatured
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : featuredData?.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
