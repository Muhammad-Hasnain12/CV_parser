import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, Sparkles, Zap } from 'lucide-react';
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
    maxFiles: 1
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "relative overflow-hidden border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-500 hover:border-primary/60 bg-gradient-to-br from-card/50 to-card/80 backdrop-blur-sm",
          isDragActive && "border-primary bg-primary/10 scale-105 shadow-2xl shadow-primary/20",
          uploadedFile && "border-primary/40 bg-primary/5 shadow-xl"
        )}
      >
        <input {...getInputProps()} />
        
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Floating particles */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-secondary/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-500"></div>
        
        {uploadedFile ? (
          <div className="space-y-8 relative z-10">
            <div className="flex items-center justify-center space-x-6">
              <div className="p-4 bg-primary/15 rounded-2xl border border-primary/20">
                <CheckCircle className="h-10 w-10 text-primary animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground mb-2">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to parse
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="h-12 w-12 hover:bg-destructive/10 hover:text-destructive rounded-xl transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-2 text-primary/70">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <p className="text-sm font-medium">
                File ready for parsing. Click the button below to start.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 relative z-10">
            <div className="relative">
              <div className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl w-32 h-32 mx-auto flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Upload className="h-16 w-16 text-primary group-hover:animate-bounce" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">
                {isDragActive ? 'Drop your file here' : 'Drag and drop your resume'}
              </h3>
              <p className="text-lg text-muted-foreground">
                Supports PDF, DOCX, and TXT files
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span>or click to browse files</span>
              </div>
            </div>
            
            {/* File type indicators */}
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">PDF</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">DOCX</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">TXT</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {uploadedFile && (
        <div className="mt-12 flex justify-center">
          <Button
            onClick={onParse}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-xl px-16 py-8 h-auto font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 border-0"
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <LoadingSpinner size="sm" className="text-white" />
                <span>Parsing Resume...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Sparkles className="h-6 w-6" />
                <span>Parse Resume</span>
                <Zap className="h-6 w-6" />
              </div>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};