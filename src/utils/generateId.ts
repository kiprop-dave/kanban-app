function generateId(): string {
  return Math.random().toString(36).substring(2);
}

export default generateId;
