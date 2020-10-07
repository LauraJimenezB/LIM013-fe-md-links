//const mdLinks = require('../index.js');

const index = require ('../index.js');


let ruta = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\README.md';

describe('the path exists', () => {

  it('should be a function', () => {
    expect(typeof index.isValid).toBe('function');
  });

  it('should return a string', () => {
    expect(index.isValid(ruta)).toEqual(true);
  });

});

