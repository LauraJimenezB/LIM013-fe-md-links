//const mdLinks = require('../index.js');

const functions = require ('../utils.js');
const promises = require ('../index.js');

const relativePath = './README.md';
const ruta = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\README.md';
const folder = './ForTests';
const rutaB = 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md';

const objLinks = [
  {
    file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown'
  }
]

const objLinksFail = [
  {
    file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\files\\newIndex.md',
    href: 'https://nodejs.org/',
    text: 'Node.js'
  },
  {
    file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown'
  },
  {
    file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
    href: '#1-pre%C3%A1mbulo',
    text: '1. Preámbulo'
  }
]

//console.log(index.isValid(ruta));

describe('the path exists', () => {
  it('should be a function', () => {
    expect(typeof functions.isValid).toBe('function');
  });

  it('should return a boolean', () => {
    expect(functions.isValid(ruta)).toEqual(true);
  });
});

describe('the path is absolute', () => {
  it('should be a function', () => {
    expect(typeof functions.pathAbs).toBe('function');
  });

  it('should return a boolean', () => {
    expect(functions.pathAbs(ruta)).toEqual(true);
  });
});

describe('the relative path converts to absolute', () => {
  it('should be a function', () => {
    expect(typeof functions.convertPath).toBe('function');
  });

  it('should return an absolute path', () => {
    expect(functions.convertPath(relativePath)).toEqual(ruta);
  });
});

describe('get files from a directory', () => {

  it('should be a function', () => {
    expect(typeof functions.readFolder).toBe('function');
  });

  it('should return an object with the path of all files in a directory', () => {
    expect(functions.readFolder(folder)).toEqual([
      './ForTests\\anotherfile.json',
      './ForTests\\files\\newIndex.md',
      './ForTests\\readMe.md'
    ]);
  });
});


describe('get md-files from a path', () => {
  it('should be a function', () => {
    expect(typeof functions.pathToFile).toBe('function');
  });

  it('should return an object with the path of md-files in a directory', () => {
    expect(functions.pathToFile(folder)).toEqual([
      'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\files\\newIndex.md',
      'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md'
    ]);
  });
});

describe('get links from md-file', () => {
  it('should be a function', () => {
    expect(typeof functions.getLinks).toBe('function');
  });

  it('should return an object with 3 properties (path, link, title)', () => {
    expect(functions.getLinks(rutaB)).toEqual([
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown'
      },
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
        href: '#1-pre%C3%A1mbulo',
        text: '1. Preámbulo'
      }
    ]);
  });
});

describe('get links from a directory', () => {
  it('should be a function', () => {
    expect(typeof functions.dirToLinKs).toBe('function');
  });

  it('should return an object with 3 properties of links (path, link, title)', () => {
    expect(functions.dirToLinKs(folder)).toEqual([
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\files\\newIndex.md',
        href: 'https://nodejs.org/',
        text: 'Node.js'
      },
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown'
      },
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
        href: '#1-pre%C3%A1mbulo',
        text: '1. Preámbulo'
      }
    ]);
  });
});


describe('validate links', () => {
  it('should return an pbject with 5 properties (path, link, title, status and message)', () => {
    expect(functions.validate(objLinks).then((res)=>{
      return (res);
   })).resolves.toEqual([
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        status: 200,
        message: 'OK'
      }
    ]);
  });
});

describe('validate links (fail)', () => {
  it('should return an pbject with 5 properties (path, link, title, status and message)', () => {
    expect(functions.validate(objLinksFail).then((res)=>{
      return (res);
   })).resolves.toEqual([                                                                                                 
    {                                                                                               
      file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\files\\newIndex.md',       
      href: 'https://nodejs.org/',                                                                  
      text: 'Node.js',                                                                              
      status: 200,                                                                                  
      message: 'OK'                                                                                 
    },                                                                                              
    {                                                                                               
      file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',                
      href: 'https://es.wikipedia.org/wiki/Markdown',                                               
      text: 'Markdown',                                                                             
      status: 200,                                                                                  
      message: 'OK'                                                                                 
    },                                                                                              
    {                                                                                               
      file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',                
      href: '#1-pre%C3%A1mbulo',                                                                    
      text: '1. Preámbulo',                                                                         
      status: undefined,                                                                            
      message: 'fail'                                                                               
    }                                                                                               
  ]);
});
});

describe('stats of links', () => {
  it('should return an object with stats of links', () => {
    expect(functions.stats(objLinks)).toEqual({ total: 1, unique: 1 });
  });
});


describe('mdLinks: get links (path, link, title) from path', () => {
  it('should return an object with 3 properties of links (path, link, title)', () => {
    expect((promises.mdLinks(folder, {validate:false, stats:false})).then ((res)=>{
      return(res);
    })
    .catch ((res)=> {
       return(res);
    })).resolves.toEqual([                                                                                                 
      {                                                                                               
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\files\\newIndex.md',       
        href: 'https://nodejs.org/',                                                                  
        text: 'Node.js'                                                                               
      },                                                                                              
      {                                                                                               
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',                
        href: 'https://es.wikipedia.org/wiki/Markdown',                                               
        text: 'Markdown'                                                                              
      },                                                                                              
      {                                                                                               
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',                
        href: '#1-pre%C3%A1mbulo',                                                                    
        text: '1. Preámbulo'                                                                          
      }                                                                                               
    ]                                                                                                 );
  });
});

describe('mdLinks --validate: get links (file, href, text, status, message) from path', () => {
  it('should return an object with 3 properties of links (path, link, title)', () => {
    expect((promises.mdLinks(folder, {validate:true, stats:false})).then ((res)=>{
      return(res);
    })
    .catch ((res)=> {
       return(res);
    })).resolves.toEqual([
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\files\\newIndex.md',
        href: 'https://nodejs.org/',
        text: 'Node.js',
        status: 200,
        message: 'OK'
      },
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        status: 200,
        message: 'OK'
      },
      {
        file: 'C:\\Users\\laira\\JAVASCRIPT\\LIM013-fe-md-links\\ForTests\\readMe.md',
        href: '#1-pre%C3%A1mbulo',
        text: '1. Preámbulo',
        status: undefined,
        message: 'fail'
      }
    ]);
  });
});

describe('mdLinks --stats: get stats (total, unique)', () => {
  it('should return an object with 3 properties of links (path, link, title)', () => {
    expect((promises.mdLinks(folder, {validate:false, stats:true})).then ((res)=>{
      return(res);
    })
    .catch ((res)=> {
       return(res);
    })).resolves.toEqual({ total: 3, unique: 3 });
  });
});

describe('mdLinks --validate --stats: get stats (total, unique, broken)', () => {
  it('should return an object with 3 properties of links (path, link, title)', () => {
    expect((promises.mdLinks(folder, {validate:true, stats:true})).then ((res)=>{
      return(res);
    })
    .catch ((res)=> {
       return(res);
    })).resolves.toEqual({ total: 3, unique: 3, broken: 1 });
  });
});
