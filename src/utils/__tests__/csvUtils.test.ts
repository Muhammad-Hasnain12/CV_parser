import { convertToCSV, escapeCSV, formatArray, ParsedData } from '../csvUtils';

describe('CSV Utils', () => {
  describe('escapeCSV', () => {
    it('should escape strings with commas', () => {
      expect(escapeCSV('Hello, World')).toBe('"Hello, World"');
    });

    it('should escape strings with quotes', () => {
      expect(escapeCSV('He said "Hello"')).toBe('"He said ""Hello"""');
    });

    it('should escape strings with newlines', () => {
      expect(escapeCSV('Line 1\nLine 2')).toBe('"Line 1\nLine 2"');
    });

    it('should not escape simple strings', () => {
      expect(escapeCSV('Simple text')).toBe('Simple text');
    });
  });

  describe('formatArray', () => {
    it('should format array with semicolon separator', () => {
      const arr = ['Skill 1', 'Skill 2', 'Skill 3'];
      expect(formatArray(arr)).toBe('Skill 1; Skill 2; Skill 3');
    });

    it('should handle empty array', () => {
      expect(formatArray([])).toBe('');
    });

    it('should handle undefined array', () => {
      expect(formatArray(undefined)).toBe('');
    });

    it('should escape array items with special characters', () => {
      const arr = ['Skill, with comma', 'Skill with "quotes"'];
      expect(formatArray(arr)).toBe('"Skill, with comma"; "Skill with ""quotes"""');
    });
  });

  describe('convertToCSV', () => {
    it('should convert parsed data to CSV format', () => {
      const data: ParsedData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-1234',
        skills: ['JavaScript', 'React', 'TypeScript'],
        experience: ['Software Engineer at Tech Corp'],
        education: ['BS Computer Science'],
        certifications: ['AWS Certified'],
        projects: ['E-commerce Platform'],
        links: ['https://github.com/johndoe']
      };

      const csv = convertToCSV(data);
      const lines = csv.split('\n');

      expect(lines[0]).toBe('Field,Value');
      expect(lines[1]).toBe('Name,John Doe');
      expect(lines[2]).toBe('Email,john@example.com');
      expect(lines[3]).toBe('Phone,+1-555-1234');
      expect(lines[4]).toBe('Skills,JavaScript; React; TypeScript');
      expect(lines[5]).toBe('Experience,Software Engineer at Tech Corp');
      expect(lines[6]).toBe('Education,BS Computer Science');
      expect(lines[7]).toBe('Certifications,AWS Certified');
      expect(lines[8]).toBe('Projects,E-commerce Platform');
      expect(lines[9]).toBe('Links,https://github.com/johndoe');
    });

    it('should handle empty data', () => {
      const data: ParsedData = {};
      const csv = convertToCSV(data);
      const lines = csv.split('\n');

      expect(lines[0]).toBe('Field,Value');
      expect(lines[1]).toBe('Name,');
      expect(lines[2]).toBe('Email,');
      expect(lines[3]).toBe('Phone,');
      expect(lines[4]).toBe('Skills,');
      expect(lines[5]).toBe('Experience,');
      expect(lines[6]).toBe('Education,');
      expect(lines[7]).toBe('Certifications,');
      expect(lines[8]).toBe('Projects,');
      expect(lines[9]).toBe('Links,');
    });

    it('should handle data with special characters', () => {
      const data: ParsedData = {
        name: 'John "The Developer" Doe',
        email: 'john.doe@example.com',
        skills: ['JavaScript, TypeScript', 'React & Redux']
      };

      const csv = convertToCSV(data);
      const lines = csv.split('\n');

      expect(lines[1]).toBe('Name,"John ""The Developer"" Doe"');
      expect(lines[4]).toBe('Skills,"JavaScript, TypeScript"; "React & Redux"');
    });
  });
});
