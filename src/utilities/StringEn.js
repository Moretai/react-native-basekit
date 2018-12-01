/* eslint-disable no-extend-native */

String.prototype.capitalizeFirstLetter = () => this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);

String.prototype.capitalizeEachLetter = () => this.toLowerCase()
  .split(' ')
  .map((word) => word.capitalizeFirstLetter())
  .join(' ');

String.prototype.capitalizeEachLetterSubString = (endpoint) => {
  const { length } = this;

  if (length > endpoint) {
    return `${this.toLowerCase()
      .split(' ')
      .map((word) => word.capitalizeFirstLetter())
      .join(' ')
      .substring(0, endpoint - 2)}...`;
  }

  return this.toLowerCase()
    .split(' ')
    .map((word) => word.capitalizeFirstLetter())
    .join(' ');
};

String.prototype.capitalizeFirstLetterSubString = (endpoint) => {
  const { length } = this;

  if (length > endpoint) {
    return `${this.charAt(0).toUpperCase()
      + this.toLowerCase()
        .slice(1)
        .substring(0, endpoint - 2)}...`;
  }

  return this.charAt(0).toUpperCase() + this.toLowerCase().slice(1);
};
