// Test isStrongPassword(utils.ts)
// Test isValidUserName(utils.ts)
// Test signToken(utils.ts)
// Test replaceName(utils.ts)
// Test randomText(utils.ts)
// Model: none
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { isStrongPassword, isValidUserName, randomText, replaceName, signToken } from '../../utils';

jest.mock('jsonwebtoken');

describe('Utils', () => {
  describe('isStrongPassword', () => {
    it('should return true for a strong password', () => {
      expect(isStrongPassword('StrongPass1!')).toBe(true);
    });

    it('should return false for a weak password', () => {
      expect(isStrongPassword('weak')).toBe(false);
    });

    it('should return false for a password without uppercase', () => {
      expect(isStrongPassword('weakpass1!')).toBe(false);
    });

    it('should return false for a password without lowercase', () => {
      expect(isStrongPassword('WEAKPASS1!')).toBe(false);
    });

    it('should return false for a password without numbers', () => {
      expect(isStrongPassword('WeakPass!')).toBe(false);
    });

    it('should return false for a short password', () => {
      expect(isStrongPassword('Short1!')).toBe(false);
    });
  });

  describe('isValidUserName', () => {
    it('should return true for a valid username', () => {
      expect(isValidUserName('ValidUser123')).toBe(true);
    });

    it('should return false for a username without uppercase', () => {
      expect(isValidUserName('invaliduser123')).toBe(false);
    });

    it('should return false for a username without lowercase', () => {
      expect(isValidUserName('INVALIDUSER123')).toBe(false);
    });

    it('should return false for a username without numbers', () => {
      expect(isValidUserName('InvalidUser')).toBe(false);
    });
  });

  describe('signToken', () => {
    it('should sign a token', async () => {
      const mockSign = jest.spyOn(jwt, 'sign');
      mockSign.mockImplementation(() => 'mocked-token');

      const payload = {
        _id: new Types.ObjectId(),
        email: 'test@example.com',
        username: 'testuser',
        role: 'user',
        isVerified: true
      };

      const token = await signToken(payload);
      expect(token).toBe('mocked-token');
      expect(mockSign).toHaveBeenCalledWith(payload, expect.any(String));

      mockSign.mockRestore();
    });

  });

  describe('replaceName', () => {
    it('should replace special characters and spaces', () => {
      expect(replaceName('Tên Có Dấu')).toBe('ten-co-dau');
    });

    it('should handle special characters', () => {
      expect(replaceName('Name@With:Special!Chars')).toBe('namewithspecialchars');
    });

    it('should handle uppercase letters', () => {
      expect(replaceName('UPPERCASE')).toBe('uppercase');
    });

    it('should handle mixed case and diacritics', () => {
      expect(replaceName('Đây Là Một Chuỗi Thử')).toBe('day-la-mot-chuoi-thu');
    });

    it('should handle empty string', () => {
      expect(replaceName('')).toBe('');
    });
  });

  describe('randomText', () => {
    it('should generate random text of specified length', () => {
      const result = randomText(5);
      expect(result.length).toBe(6);
    });

    it('should generate random text of default length when no length is specified', () => {
      const result = randomText(0);
      expect(result.length).toBe(11); // default is 11
    });

    it('should contain only alphanumeric characters', () => {
      const result = randomText(20);
      expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it('should generate different texts on multiple calls', () => {
      const result1 = randomText(10);
      const result2 = randomText(11);
      expect(result1).not.toBe(result2);
    });

    it('should handle large numbers', () => {
      const result = randomText(100);
      expect(result.length).toBe(62);
    });

    it('should handle negative numbers', () => {
      const result = randomText(-5);
      expect(result.length).toBe(0);
    });
  });
});
