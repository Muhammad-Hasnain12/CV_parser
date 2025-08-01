import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-upload-border rounded-xl p-12 text-center cursor-pointer transition-all duration-300 hover:border-primary/50 bg-upload-area",
          isDragActive && "border-primary bg-primary/5",
          uploadedFile && "border-primary/30"
        )}
      >
        <input {...getInputProps()} />
        
        {uploadedFile ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <FileText className="h-12 w-12 text-primary" />
              <div className="text-left">
                <p className="text-lg font-semibold text-foreground">{uploadedFile.name}</p>
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
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="h-16 w-16 text-muted-foreground mx-auto" />
            <div className="space-y-2">
              <p className="text-xl font-semibold text-foreground">
                Drag and drop your file here
              </p>
              <p className="text-muted-foreground">
                (PDF, DOCX)
              </p>
            </div>
          </div>
        )}
      </div>

      {uploadedFile && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={onParse}
            disabled={isLoading}
            className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 h-auto font-semibold"
          >
            {isLoading ? 'Parsing CV...' : 'Parse CV'}
          </Button>
        </div>
      )}
    </div>
  );
};