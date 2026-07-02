module.exports = function (api) {
  const isTest = process.env.BABEL_ENV === 'test' || process.env.NODE_ENV === 'test';

  api.cache.using(() => isTest);

  const presets = ['module:@react-native/babel-preset'];

  return {
    presets: isTest ? presets : [...presets, 'nativewind/babel'],
  };
};
