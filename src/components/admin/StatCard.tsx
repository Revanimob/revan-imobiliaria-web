
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'wine' | 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard = ({ title, value, description, icon: Icon, trend, color = 'wine' }: StatCardProps) => {
  const colorClasses = {
    wine: 'from-wine/10 to-wine/5 border-wine/20 text-wine',
    blue: 'from-blue-600/10 to-blue-600/5 border-blue-600/20 text-blue-600',
    green: 'from-green-600/10 to-green-600/5 border-green-600/20 text-green-600',
    purple: 'from-purple-600/10 to-purple-600/5 border-purple-600/20 text-purple-600',
    orange: 'from-orange-600/10 to-orange-600/5 border-orange-600/20 text-orange-600',
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 dark:from-gray-800/20 dark:to-gray-800/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className={`relative backdrop-blur-sm bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-gray-700/50`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {description}
              </p>
            )}
            {trend && (
              <div className={`flex items-center mt-2 text-xs ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} shadow-sm`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
