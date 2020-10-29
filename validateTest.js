const promises = require ('../index.js');

const folder = './ForTests';


async function mdLinks (data, options)  {
    try {
        const result = await fetch ('https://nodejs.org/');
        const data = await result.status;
        return data;
    } catch (e) {
        return null;
    }
}


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
  