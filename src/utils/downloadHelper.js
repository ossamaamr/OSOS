// src/utils/downloadHelper.js

/**
 * تحويل روابط Google Drive التقليدية إلى روابط تحميل مباشر وفوري
 * @param {string} url - رابط جوجل درايف الأصلي
 * @returns {string} - رابط التحميل المباشر
 */
export const convertDriveLinkToDirectDownload = (url) => {
  if (!url) return '';
  
  // صيغ روابط جوجل درايف المختلفة
  const regExp = /(?:https?:\/\/)?(?:drive\.google\.com\/)(?:file\/d\/|open\?id=)([^/\?]+)/;
  const match = url.match(regExp);
  
  if (match && match[1]) {
    const fileId = match[1];
    // الصيغة المعيارية للتحميل المباشر الفوري لعام 2026
    return `https://docs.google.com/uc?export=download&id=${fileId}`;
  }
  
  return url; // إرجاع الرابط الأصلي إذا لم يكن من جوجل درايف
};

/**
 * تحميل الملف مباشرة في الخلفية وفرضه على جهاز المستخدم كـ Blob (لضمان عدم فتح صفحة جديدة)
 * @param {string} url - رابط الملف
 * @param {string} fileName - الاسم المراد حفظ الملف به
 */
export const triggerDirectDownload = async (url, fileName = 'download') => {
  try {
    const directUrl = convertDriveLinkToDirectDownload(url);
    
    // جلب الملف كـ Blob لمنع المتصفح من فتح صفحة جديدة
    const response = await fetch(directUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/octet-stream'
      }
    });
    
    if (!response.ok) throw new Error('فشل تحميل الملف من الخادم');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    // إنشاء عنصر وهمي للتحميل وضغط الزر برمجياً
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // تنظيف الذاكرة فوراً لمنع Memory Leaks (معايير أداء 2026)
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('خطأ أثناء التحميل الفوري:', error);
    // كخطة بديلة فائقة الأمان في حال قيود CORS: فتح الرابط المباشر في نافذة مخفية
    const directUrl = convertDriveLinkToDirectDownload(url);
    window.open(directUrl, '_self');
  }
};
