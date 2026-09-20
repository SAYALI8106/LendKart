import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, Share2, Tag, CheckCircle2, User } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
import Skeleton from '../components/common/Skeleton';
import { formatDate } from '../utils/formatters';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const res = await api.get(`/blogs/${slug}`);
        if (res.data.success) {
          setBlog(res.data.blog);
          setRelated(res.data.related || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white dark:bg-[#14211D] rounded-2xl border border-sand-300 dark:border-[#1E332B] shadow-soft-sm">
        <h3 className="text-xl font-bold font-serif text-charcoal-900 dark:text-sand-100 mb-2">Article Not Found</h3>
        <p className="text-xs text-charcoal-500 mb-4">The article you requested might have been moved or updated.</p>
        <Link to="/blog" className="text-forest-700 dark:text-forest-400 font-semibold text-xs hover:underline">
          Back to all guides
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEO title={blog.title} description={blog.excerpt} />

      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 dark:text-charcoal-400 hover:text-forest-700 dark:hover:text-forest-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Guides</span>
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-charcoal-500 dark:text-charcoal-400">
          {blog.tags?.map((t) => (
            <span key={t} className="px-2.5 py-0.5 rounded-md bg-forest-50 dark:bg-forest-900/30 text-forest-700 dark:text-forest-400 font-semibold text-[11px]">
              {t}
            </span>
          ))}
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {blog.readTime}
          </span>
          <span>•</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-serif text-charcoal-900 dark:text-sand-100 leading-tight tracking-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 pt-2">
          <img
            src={blog.author?.avatar}
            alt={blog.author?.name}
            className="w-10 h-10 rounded-full object-cover border border-sand-300 dark:border-charcoal-700"
          />
          <div>
            <div className="text-xs font-bold text-charcoal-900 dark:text-sand-100">{blog.author?.name}</div>
            <div className="text-[11px] text-charcoal-500 dark:text-charcoal-400">{blog.author?.role || 'LendKart Contributor'}</div>
          </div>
        </div>
      </div>

      {/* Cover Banner */}
      <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-sand-300/80 dark:border-[#1E332B] shadow-soft-md">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-[#14211D] p-8 sm:p-12 rounded-2xl border border-sand-300/80 dark:border-[#1E332B] space-y-6 text-charcoal-800 dark:text-sand-200 text-sm sm:text-base leading-relaxed whitespace-pre-line shadow-soft-sm font-normal">
        {blog.content}
      </div>

      {/* Related Reading */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-sand-300 dark:border-[#1E332B] space-y-6">
          <h3 className="text-2xl font-bold font-serif text-charcoal-900 dark:text-sand-100">Recommended Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Link
                key={rel._id}
                to={`/blog/${rel.slug}`}
                className="bg-white dark:bg-[#14211D] p-4 rounded-xl border border-sand-300/80 dark:border-[#1E332B] hover:border-forest-600/40 hover:shadow-soft-md transition-all space-y-2 group"
              >
                <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-sand-200 dark:bg-charcoal-800">
                  <img src={rel.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="font-serif font-bold text-xs text-charcoal-900 dark:text-sand-100 group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPostPage;
