'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="pixel-corners--wrapper mx-auto max-w-lg">
          <div className="bg-white border-2 border-black p-8 pixel-corners">
            <h1 className="font-press-start text-2xl sm:text-3xl mb-4 text-red-600">
              Maintenance Mode
            </h1>
            <h2 className="font-press-start text-lg sm:text-xl mb-6"> We’ll be back shortly!</h2>
            <p className="font-space-mono text-sm sm:text-base mb-6 text-gray-700">
              The Annual Recruitment Week 2025 Website is currently under scheduled maintenance. Our
              dev team is patching things up to serve you better. 🚧
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
