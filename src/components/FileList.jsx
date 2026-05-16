// src/components/FileList.jsx
'use client';

import React from 'react';
import FileCard from './FileCard';

export default function FileList({ files, isLoading, error }) {
  // 1. معالجة حالة التحميل بـ Skeleton فائق السلاسة لعام 2026
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 h-48 animate-pulse flex flex-col justify-between">
            <div className="w-12 h-12 bg-slate-800 rounded-lg mb-4"></div>
            <div className="h-4 bg-slate-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-800 rounded w-1/2"></div>
            <div className="h-10 bg-slate-800 rounded w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  // 2. حل مشكلة عدم عرض الملفات الآمن (Fallback UI)
  if (error || !files || files.length === 0) {
    return (
      <div className="w-full text-center py-12 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/20">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-bold text-slate-200 mb-1">لم يتم العثور على أي ملفات</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          تأكد من اتصالك بالقاعدة أو صحة مصفوفة البيانات الممررة للمكون.
        </p>
      </div>
    );
  }

  // 3. عرض شبكة الملفات المتجاوبة بالكامل تلقائياً
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {files.map((file) => (
        <FileCard key={file.id || file.url} file={file} />
      ))}
    </div>
  );
}
