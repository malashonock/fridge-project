import fs from 'fs/promises';

export const deleteFile = (path) => {
  fs.access(path)
    .then(() => {
      return fs.rm(path);
    })
    .catch(() => {
      console.log(`Failed to delete file at: ${path}`);
    });
};
