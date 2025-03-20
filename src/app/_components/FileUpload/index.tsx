'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Upload, X, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@components/atoms/button';
import Image from 'next/image';

export default function FileUpload({
  handleUpload,
  setShowFileUpload,
}: {
  handleUpload: (file: File) => void;
  setShowFileUpload: (value: boolean) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const _handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    handleUpload(file);

    setIsUploading(false);
    setIsUploaded(true);

    // Reset upload status after 3 seconds
    setTimeout(() => {
      setIsUploaded(false);
    }, 3000);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setIsUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-6 max-w-4xl mx-auto">
      <div className="flex-1">
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 transition-colors flex flex-col items-center justify-center gap-4 min-h-[300px]',
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-border">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-foreground font-medium mb-1">Drag and drop your image here</p>
                <p className="text-muted-foreground text-sm mb-4">or click to browse files</p>
                <Button onClick={() => fileInputRef.current?.click()} variant="default">
                  Select File
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-border">
                    <Check className={cn('h-5 w-5', isUploaded ? 'text-green-500' : 'text-muted-foreground')} />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{file.name}</p>
                    <p className="text-muted-foreground text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button onClick={handleRemove} variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-6">
                <Button
                  onClick={_handleUpload}
                  disabled={isUploading || isUploaded}
                  className={cn('w-full', isUploaded ? 'bg-green-500 hover:bg-green-600' : '')}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : isUploaded ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Uploaded
                    </>
                  ) : (
                    'Upload File'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex-1 border border-border rounded-lg overflow-hidden flex items-center justify-center min-h-[300px]">
        {preview ? (
          <Image
            fill
            src={preview || '/placeholder.svg'}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <p className="text-muted-foreground">Image preview will appear here</p>
        )}
      </div>
      <Button variant="ghost" onClick={() => setShowFileUpload(false)}>
        <X /> Close
      </Button>
    </div>
  );
}
