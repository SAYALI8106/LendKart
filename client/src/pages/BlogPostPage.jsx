import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft, Share2, Tag, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import SEO from '../components/common/SEO';
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-slate-400">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center glass-card rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-2">Article Not Found</h3>
        <Link to="/blog" className="text-brand-primary text-xs underline">
          Back to all guides
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO title={blog.title} description={blog.excerpt} />

      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Guides</span>
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          {blog.tags?.map((t) => (
            <span key={t} className="px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">
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

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 pt-2">
          <img
            src={blog.author?.avatar}
            alt={blog.author?.name}
            className="w-10 h-10 rounded-full object-cover border border-white/20"
          />
          <div>
            <div className="text-xs font-bold text-white">{blog.author?.name}</div>
            <div className="text-[11px] text-slate-400">{blog.author?.role || 'LendKart Contributor'}</div>
          </div>
        </div>
      </div>

      {/* Cover Banner */}
      <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 text-slate-300 text-sm leading-relaxed whitespace-pre-line font-normal">
        {blog.content}
      </div>

      {/* Related Reading */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-white/10 space-y-6">
          <h3 className="text-xl font-bold font-display text-white">Recommended Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Link
                key={rel._id}
                to={`/blog/${rel.slug}`}
                className="glass-card p-4 rounded-2xl border border-white/5 hover:border-brand-primary/40 transition-colors space-y-2"
              >
                <img src={rel.coverImage} alt="" className="w-full h-24 rounded-xl object-cover" />
                <h4 className="font-bold text-xs text-white line-clamp-2">{rel.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogPostPage;
