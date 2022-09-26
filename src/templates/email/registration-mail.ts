import * as striptags from 'striptags';

export const registrationMailTemplate = (url: string) => {
  return `
    <h1>Registration mail</h1> 
    <p>URL: ${striptags(url)}</p>
    `;
}
