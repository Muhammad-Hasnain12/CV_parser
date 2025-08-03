import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
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
    <div className="w-full max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 hover:border-primary/50 bg-upload-area relative overflow-hidden",
          isDragActive && "border-primary bg-primary/5 scale-105",
          uploadedFile && "border-primary/30 bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        {uploadedFile ? (
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xl font-semibold text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="h-10 w-10 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              File ready for parsing. Click the button below to start.
            </p>
          </div>
        ) : (
          <div className="space-y-6 relative z-10">
            <div className="p-6 bg-primary/10 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
              <Upload className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">
                {isDragActive ? 'Drop your file here' : 'Drag and drop your resume'}
              </h3>
              <p className="text-muted-foreground">
                Supports PDF, DOCX, and TXT files
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse files
              </p>
            </div>
          </div>
        )}
      </div>

      {uploadedFile && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onParse}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-primary hover:shadow-glow text-lg px-12 py-6 h-auto font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" className="text-white" />
                <span>Parsing Resume...</span>
              </div>
            ) : (
              'Parse Resume'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};