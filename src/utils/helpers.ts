export class Helpers {
  // Strings
  static standardID = (): string =>
    this.randomString(24, 'abcdefghijklmnopqrstuvwxyz0123456789');

  static randomString(length: number, chars: string): string {
    let result = '';
    if (!chars) return result;

    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  static getDomainFromEmailAddress(email: string): string {
    if (!email) return '';

    return email.split('@')[1];
  }
}
