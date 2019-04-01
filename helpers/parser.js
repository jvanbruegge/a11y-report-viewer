module.exports = class Parser {
  constructor(inputData) {
    this.data = this.normalise(inputData);
  }

  normalise(inputData) {
    return JSON.parse(inputData);
  }

  getViolations() {
    return this.data
      .map(item => {
        if (item.violations.length <= 0) return null;
        const { url, violations } = item;
        return {
          url,
          violations
        };
      })
      .filter(Boolean);
  }

  parse() {
    return this.getViolations();
  }
};
