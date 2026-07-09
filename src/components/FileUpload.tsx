import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Sparkles, Check, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onParse: () => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onParse, isLoading }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    disabled: !!uploadedFile || isLoading
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="w-full space-y-4">
      {/* File Upload Box */}
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed border-[#6366f1]/40 rounded-xl p-10 text-center transition-all bg-white shadow-sm",
          !uploadedFile && "cursor-pointer hover:bg-slate-50/50 hover:border-[#6366f1]/70",
          isDragActive && "border-[#4f46e5] bg-indigo-50/30",
          uploadedFile && "border-slate-200 bg-white cursor-default"
        )}
      >
        <input {...getInputProps()} />

        {uploadedFile ? (
          <div className="space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-[#4f46e5]">
              <Upload className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-800">
                Drag & drop your resume here
              </h3>
              <p className="text-xs text-slate-500">
                or <span className="text-[#4f46e5] font-medium">click to browse</span>
              </p>
              <p className="text-[10px] text-slate-400">
                Supports PDF, DOCX, TXT (Max 10MB)
              </p>
            </div>

            <div className="pt-2">
              <Button
                type="button"
                className="bg-[#4f46e5] hover:bg-[#4f46e5]/90 text-white font-medium text-xs h-8 px-4 rounded-md shadow-sm transition-colors"
              >
                Browse Files
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-[#4f46e5]">
              <Upload className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-slate-800">
                Drag & drop your resume here
              </h3>
              <p className="text-xs text-slate-500">
                or <span className="text-[#4f46e5] font-medium">click to browse</span>
              </p>
              <p className="text-[10px] text-slate-400">
                Supports PDF, DOCX, TXT (Max 10MB)
              </p>
            </div>

            <div className="pt-2">
              <Button
                type="button"
                className="bg-[#4f46e5] hover:bg-[#4f46e5]/90 text-white font-medium text-xs h-8 px-4 rounded-md shadow-sm transition-colors"
              >
                Browse Files
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Selected File Card */}
      {uploadedFile && (
        <div className="flex items-center justify-between border border-slate-200 rounded-lg p-3.5 bg-white shadow-sm">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="p-2 bg-red-50 border border-red-100 rounded-md text-red-500 flex-shrink-0">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate max-w-[160px] sm:max-w-md">{uploadedFile.name}</p>
              <p className="text-[10px] text-slate-400">
                {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <Button
              variant="ghost"
              size="icon"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Parse Resume Trigger Button */}
      {uploadedFile && (
        <div className="flex justify-center">
          <Button
            onClick={onParse}
            disabled={isLoading}
            className="w-full bg-[#4f46e5] hover:bg-[#4f46e5]/90 text-white font-medium text-xs h-9 px-6 rounded-md shadow-sm transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" className="text-white" />
                <span>Parsing Resume...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Parse Resume</span>
              </div>
            )}
          </Button>
        </div>
      )}

      {/* Tips Card */}
      <div className="border border-[#3b82f6]/10 rounded-lg p-5 bg-[#eff6ff]/30 dark:bg-blue-950/5 space-y-3.5 text-left shadow-sm">
        <div className="flex items-center space-x-2 text-[#3b82f6]">
          <Lightbulb className="h-4 w-4" />
          <h4 className="text-xs font-semibold uppercase tracking-wider">Tips</h4>
        </div>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <li className="flex items-center space-x-2">
            <Check className="h-3.5 w-3.5 text-[#3b82f6] flex-shrink-0" />
            <span>Ensure your resume is in English</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="h-3.5 w-3.5 text-[#3b82f6] flex-shrink-0" />
            <span>PDF format works best</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="h-3.5 w-3.5 text-[#3b82f6] flex-shrink-0" />
            <span>Max file size is 10MB</span>
          </li>
          <li className="flex items-center space-x-2">
            <Check className="h-3.5 w-3.5 text-[#3b82f6] flex-shrink-0" />
            <span>All data is processed securely</span>
          </li>
        </ul>
      </div>
    </div>
  );
};