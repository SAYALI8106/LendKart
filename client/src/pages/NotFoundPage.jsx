import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <SEO title="Page Not Found — LendKart" description="The page you requested could not be found." />
      <div className="max-w-md space-y-6 bg-white dark:bg-[#14211D] p-10 rounded-3xl border border-[#E5E0D2] dark:border-white/10 shadow-soft-lg">
        <div className="w-20 h-20 rounded-2xl bg-[#176B52]/10 dark:bg-[#176B52]/20 border border-[#176B52]/30 flex items-center justify-center text-[#176B52] dark:text-emerald-300 mx-auto shadow-soft-sm">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '14s' }} />
        </div>

        <div className="space-y-2">
          <div className="text-6xl font-extrabold font-display text-slate-900 dark:text-white">404</div>
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">Gear Not Found</h2>
          <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
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
            <Button variant="primary" size="sm" className="!bg-[#176B52] shadow-soft-sm">
              Explore Gear
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
