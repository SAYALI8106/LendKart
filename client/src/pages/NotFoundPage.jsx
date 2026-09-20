import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <SEO title="Page Not Found" description="The page you requested could not be found." />
      <div className="max-w-md space-y-6 glass-card p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mx-auto shadow-neon-glow">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <div className="space-y-2">
          <div className="text-5xl font-extrabold font-display text-white">404</div>
          <h2 className="text-xl font-bold font-display text-white">Gear Not Found</h2>
          <p className="text-xs text-slate-400">
            Looks like you've ventured into uncharted territory. The page or item listing may have moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Return Home
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="primary" size="sm">
              Explore Gear
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
