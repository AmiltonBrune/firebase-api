export class Logger {
  public static error(message: string, error: Error): void {
    console.error(`[ERROR] ${message}`, error);
  }

  public static info(message: string): void {
    console.log(`[INFO] ${message}`);
  }
}
