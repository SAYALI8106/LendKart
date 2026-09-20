import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEO
        title="Rental Guides, Gear Economics & Consumer Hacks"
        description="Learn how to save money on high-end tech, cameras, and camping gear by renting instead of buying. Explore LendKart guides."
      />

      <div className="max-w-2xl space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">
          LendKart Editorial
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white">
          Community Rental Guides & Gear Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          In-depth guides on rental economics, gear safety, sustainable lifestyle hacks, and earning passive income.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blog/${blog.slug}`}
            className="glass-card rounded-3xl overflow-hidden border border-white/10 group flex flex-col justify-between hover:border-brand-primary/40 transition-all duration-300"
          >
            <div>
              <div className="aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">
                    {blog.tags?.[0] || 'Guide'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-brand-primary transition-colors font-display line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <img
                  src={blog.author?.avatar}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{blog.author?.name}</span>
              </div>
              <span className="text-brand-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Article →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogIndexPage;
