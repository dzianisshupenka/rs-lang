const filesAPI = {
  async getFile(fileName: string) {
    const getFileURL = `https://rs-lang-team65.herokuapp.com/${fileName}`;
    return getFileURL;
  },
};

export default filesAPI;
