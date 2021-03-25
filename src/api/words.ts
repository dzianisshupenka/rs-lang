const wordsAPI = {
  async getWords(page: number, group: number) {
    const getWordsAPIurl = `https://react-learnwords-example.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(getWordsAPIurl);
    const data = await res.json();
    return data;
  },
};

export default wordsAPI;
