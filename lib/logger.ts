const logger = {
  info: (...args: any[]) => console.info("[vixo]", ...args),
  warn: (...args: any[]) => console.warn("[vixo]", ...args),
  error: (...args: any[]) => console.error("[vixo]", ...args),
};

export default logger;