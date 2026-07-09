import { ParsedResumeData } from '@/types';


// Utility function to escape CSV values
export const escapeCSV = (value: string): string => {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

// Utility function to format arrays for CSV
export const formatArray = (arr: string[] | undefined): string => {
  if (!arr || arr.length === 0) return '';
  return arr.map(item => escapeCSV(item)).join('; ');
};

// Utility function to convert parsed data to CSV format
export const convertToCSV = (data: ParsedResumeData): string => {
  const csvData = [
    ['Field', 'Value'],
    ['Name', escapeCSV(data.name || '')],
    ['Email', escapeCSV(data.email || '')],
    ['Phone', escapeCSV(data.phone || '')],
    ['Skills', formatArray(data.skills)],
    ['Experience', formatArray(data.experience)],
    ['Education', formatArray(data.education)],
    ['Certifications', formatArray(data.certifications)],
    ['Projects', formatArray(data.projects)],
    ['Links', formatArray(data.links)]
  ];

  return csvData.map(row => row.join(',')).join('\n');
};

// Utility function to download CSV file
export const downloadCSV = (data: ParsedResumeData, filename: string = 'resume_data.csv'): void => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
  }
};

// Utility function to download JSON file
export const downloadJSON = (data: ParsedResumeData, filename: string = 'resume_data.json'): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
  }
};
