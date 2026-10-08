import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, User, Sparkles } from 'lucide-react';
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

  const featuredBlog = blogs[0];
  const secondaryBlogs = blogs.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      <SEO
        title="LendKart Journal — Rental Guides & Gear Economics"
        description="Learn how to save money on high-end tech, cameras, and camping gear by renting instead of buying. Explore LendKart guides."
      />

      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#176B52] dark:text-[#A8C8B5] font-display">
          <BookOpen className="w-3.5 h-3.5 text-[#C96F52]" />
          <span>LendKart Journal & Guides</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Rental Guides & Sustainable Gear Economics
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">
          Expert guides on renting over buying, maximizing passive income from idle gear, and making the most of equipment in your city.
        </p>
      </div>

      {loading ? (
        <div className="space-y-8">
          <Skeleton className="h-96 rounded-3xl w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-3xl" />
            ))}
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#14211D] rounded-3xl border border-[#E5E0D2] dark:border-white/10 p-8">
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">No guides published yet</h3>
          <p className="text-xs text-[#5C6E66]">Check back soon for community rental stories and gear economics.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* =========================================================================
              1. LARGE HERO FEATURED ARTICLE
              ========================================================================= */}
          {featuredBlog && (
            <Link
              to={`/blog/${featuredBlog.slug}`}
              data-cursor="READ"
              className="group block rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 shadow-soft-md hover:shadow-2xl hover:border-[#176B52]/40 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-slate-900 relative">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#176B52] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                    Featured Cover Story
                  </div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
                    <span className="px-3 py-1 rounded-full bg-[#176B52]/10 text-[#176B52] dark:text-emerald-300 font-bold text-[11px]">
                      {featuredBlog.tags?.[0] || 'Guide'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredBlog.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white group-hover:text-[#176B52] dark:group-hover:text-emerald-300 transition-colors leading-snug">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5C6E66] dark:text-[#A8C8B5] line-clamp-3 leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-[#E5E0D2] dark:border-white/10 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={featuredBlog.author?.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-[#176B52]/30"
                      />
                      <span className="font-bold text-slate-800 dark:text-white">{featuredBlog.author?.name}</span>
                    </div>

                    <span className="font-bold text-[#176B52] dark:text-emerald-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Story <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* =========================================================================
              2. ASYMMETRICAL SECONDARY ARTICLES GRID
              ========================================================================= */}
          {secondaryBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                  data-cursor="READ"
                  className="group rounded-3xl overflow-hidden bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 shadow-soft-sm hover:shadow-xl hover:border-[#176B52]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter brightness-95"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        {blog.tags?.[0] || 'Guide'}
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                        <span>•</span>
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-[#176B52] dark:group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug font-display">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#E5E0D2] dark:border-white/10 mt-3 flex items-center justify-between text-xs pt-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{blog.author?.name}</span>
                    <span className="font-bold text-[#176B52] dark:text-emerald-300 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogIndexPage;
