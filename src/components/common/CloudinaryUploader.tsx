import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Upload, 
  X, 
  RefreshCw, 
  FileText, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  CheckCircle2, 
  AlertCircle,
  CloudUpload,
  Play
} from 'lucide-react';
import { uploadToCloudinary, CloudinaryUploadResult, formatBytes } from '../../services/cloudinaryService';
import toast from 'react-hot-toast';

export interface CloudinaryUploaderProps {
  folder?: string;
  acceptedTypes?: 'image' | 'video' | 'auto' | string;
  maxSizeMB?: number;
  value?: string | CloudinaryUploadResult | null;
  onUploadSuccess: (result: CloudinaryUploadResult) => void;
  onRemove?: () => void;
  label?: string;
  description?: string;
  compact?: boolean;
  className?: string;
  required?: boolean;
}

export const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  folder = 'roadguard_media',
  acceptedTypes = 'auto',
  maxSizeMB = 50,
  value,
  onUploadSuccess,
  onRemove,
  label,
  description,
  compact = false,
  className = '',
  required = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [previewResult, setPreviewResult] = useState<CloudinaryUploadResult | null>(() => {
    if (typeof value === 'object' && value !== null) {
      return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
      return {
        url: value,
        secureUrl: value,
        publicId: 'existing',
        format: value.split('.').pop() || 'png',
        resourceType: value.match(/\.(mp4|webm|mov|avi)$/i) ? 'video' : 'image',
        bytes: 0,
        originalFilename: 'Attachment',
        createdAt: new Date().toISOString()
      };
    }
    return null;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize internal preview when external value changes
  React.useEffect(() => {
    if (typeof value === 'object' && value !== null) {
      setPreviewResult(value);
    } else if (typeof value === 'string' && value.trim() !== '') {
      setPreviewResult({
        url: value,
        secureUrl: value,
        publicId: 'existing',
        format: value.split('.').pop() || 'png',
        resourceType: value.match(/\.(mp4|webm|mov|avi)$/i) ? 'video' : 'image',
        bytes: 0,
        originalFilename: 'Attachment',
        createdAt: new Date().toISOString()
      });
    } else if (!value) {
      setPreviewResult(null);
    }
  }, [value]);

  const getAcceptAttribute = () => {
    if (acceptedTypes === 'image') return 'image/*';
    if (acceptedTypes === 'video') return 'video/*';
    if (acceptedTypes === 'auto') return 'image/*,video/*,.pdf,.doc,.docx';
    return acceptedTypes;
  };

  const handleFileSelect = (file: File) => {
    setError(null);
    setLastFile(file);

    // Validate size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      const err = `File size exceeds maximum allowed size of ${maxSizeMB}MB`;
      setError(err);
      toast.error(err);
      return;
    }

    startUpload(file);
  };

  const startUpload = async (file: File) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      const resType = acceptedTypes === 'image' ? 'image' : acceptedTypes === 'video' ? 'video' : 'auto';
      const result = await uploadToCloudinary(file, {
        folder,
        resourceType: resType,
        onProgress: (p) => setProgress(p)
      });

      setPreviewResult(result);
      setIsUploading(false);
      onUploadSuccess(result);
      toast.success('Uploaded to Cloudinary successfully!');
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      setIsUploading(false);
      const errMsg = err.message || 'Failed to upload to Cloudinary';
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRetry = () => {
    if (lastFile) {
      startUpload(lastFile);
    } else if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClear = () => {
    setPreviewResult(null);
    setError(null);
    setProgress(0);
    setLastFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onRemove) {
      onRemove();
    }
  };

  const isVideo = previewResult?.resourceType === 'video' || (previewResult?.format && ['mp4', 'webm', 'mov', 'avi'].includes(previewResult.format.toLowerCase()));

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {/* Upload Active or Complete View */}
      {previewResult && !isUploading ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-3 flex items-center gap-4 transition-all hover:border-indigo-400 dark:hover:border-indigo-500">
          
          {/* Media Preview Box */}
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 flex items-center justify-center border border-slate-300 dark:border-slate-700">
            {isVideo ? (
              <video 
                src={previewResult.secureUrl} 
                className="w-full h-full object-cover"
                controls={false}
              />
            ) : previewResult.secureUrl || previewResult.url ? (
              <img 
                src={previewResult.secureUrl || previewResult.url} 
                alt="Cloudinary Upload Preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <FileText className="w-8 h-8 text-slate-400" />
            )}

            {isVideo && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase tracking-wider">
                Cloudinary CDN
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
              {previewResult.originalFilename || 'Media Attachment'}
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span>{previewResult.bytes ? formatBytes(previewResult.bytes) : 'Stored safely'}</span>
              <span>•</span>
              <span className="uppercase text-[10px]">{previewResult.format || previewResult.resourceType}</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <a
              href={previewResult.secureUrl || previewResult.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors text-xs font-medium"
              title="View full media"
            >
              View
            </a>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Dropzone / Upload Progress Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`
            relative rounded-xl border-2 border-dashed transition-all cursor-pointer p-5 text-center
            ${compact ? 'p-3' : 'p-6'}
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30' 
              : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-900/30'
            }
            ${error ? 'border-rose-400 dark:border-rose-600 bg-rose-50/30 dark:bg-rose-950/20' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptAttribute()}
            onChange={handleInputChange}
            className="hidden"
          />

          {isUploading ? (
            /* Upload Progress View */
            <div className="space-y-3 py-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 max-w-md mx-auto">
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <CloudUpload className="w-4 h-4 animate-bounce" /> Uploading to Cloudinary...
                </span>
                <span>{progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Optimizing & storing file securely on Cloudinary CDN
              </p>
            </div>
          ) : error ? (
            /* Error State with Retry */
            <div className="space-y-2 py-1">
              <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">{error}</p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRetry(); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry Upload
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setError(null); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Standard Idle Dropzone View */
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                <CloudUpload className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {description || `Upload ${acceptedTypes === 'image' ? 'Images' : acceptedTypes === 'video' ? 'Videos' : 'Images, Videos or Documents'} up to ${maxSizeMB}MB`}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Powered by Cloudinary CDN
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
