import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import Skeleton from '../components/common/Skeleton';
import { formatDate } from '../utils/formatters';

export const BlogIndexPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/blogs');
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEO
        title="Rental Guides, Gear Economics & Consumer Hacks"
        description="Learn how to save money on high-end tech, cameras, and camping gear by renting instead of buying. Explore LendKart guides."
      />

      <div className="max-w-3xl space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 bg-forest-50 dark:bg-forest-900/20 px-3 py-1 rounded-full">
          <BookOpen className="w-3.5 h-3.5" />
          LendKart Journal
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-charcoal-900 dark:text-sand-100 tracking-tight leading-tight">
          Rental Guides & Sustainable Gear Economics
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
          Expert guides on renting over buying, maximizing passive income from idle gear, and making the most of premium equipment in your neighborhood.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-[#14211D] rounded-2xl border border-sand-300 dark:border-[#1E332B] p-4 space-y-4">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-6 w-full rounded" />
              <Skeleton className="h-12 w-full rounded" />
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#14211D] rounded-2xl border border-sand-300 dark:border-[#1E332B] p-8">
          <h3 className="font-serif text-lg font-bold text-charcoal-900 dark:text-sand-100 mb-2">No guides published yet</h3>
          <p className="text-xs text-charcoal-500">Check back soon for community rental stories and gear economics.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className="bg-white dark:bg-[#14211D] rounded-2xl overflow-hidden border border-sand-300/80 dark:border-[#1E332B] group flex flex-col justify-between hover:border-forest-600/40 dark:hover:border-forest-500/40 hover:shadow-soft-lg transition-all duration-300"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-sand-200 dark:bg-charcoal-800">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-charcoal-500 dark:text-charcoal-400">
                    <span className="px-2.5 py-0.5 rounded-md bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-400 font-semibold text-[11px]">
                      {blog.tags?.[0] || 'Guide'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-charcoal-400" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-charcoal-900 dark:text-sand-100 group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-charcoal-600 dark:text-charcoal-400 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-sand-200 dark:border-[#1E332B] mt-4 flex items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400">
                <div className="flex items-center gap-2 pt-3">
                  <img
                    src={blog.author?.avatar}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover border border-sand-300 dark:border-charcoal-700"
                  />
                  <span className="font-medium text-charcoal-700 dark:text-sand-200">{blog.author?.name}</span>
                </div>
                <span className="pt-3 text-forest-700 dark:text-forest-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogIndexPage;
