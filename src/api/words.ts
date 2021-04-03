const wordsAPI = {
  async getWords(page: number, group: number) {
    const getWordsAPIurl = `https://rs-lang-team65.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(getWordsAPIurl);
    const data = await res.json();
    return data;
  },
};

export default wordsAPI;
