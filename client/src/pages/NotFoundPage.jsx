import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <SEO title="Page Not Found" description="The page you requested could not be found." />
      <div className="max-w-md space-y-6 bg-white dark:bg-[#14211D] p-10 rounded-2xl border border-sand-300/80 dark:border-[#1E332B] shadow-soft-lg">
        <div className="w-20 h-20 rounded-2xl bg-forest-50 dark:bg-forest-900/30 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-700 dark:text-forest-400 mx-auto shadow-soft-sm">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '14s' }} />
        </div>

        <div className="space-y-2">
          <div className="text-5xl font-extrabold font-serif text-charcoal-900 dark:text-sand-100">404</div>
          <h2 className="text-xl font-bold font-serif text-charcoal-900 dark:text-sand-100">Gear Not Found</h2>
          <p className="text-xs text-charcoal-600 dark:text-charcoal-400">
            Looks like you've ventured into uncharted territory. The page or item listing may have moved or been returned.
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
            <Button variant="primary" size="sm" className="shadow-soft-sm">
              Explore Gear
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
