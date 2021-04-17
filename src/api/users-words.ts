const usersWordsAPI = {
  async getAllUserWords(userId: string) {
    const getAllUserWordsURL = `https://rs-lang-team65.herokuapp.com/users/${userId}/words`;
    const res = await fetch(getAllUserWordsURL);
    const data = await res.json();
    return data;
  },

  async createUserWord(
    userId: string,
    wordId: string,
    difficulty: string,
    wordInfo: any,
    isDeleted: boolean,
    isBeenLearning: boolean,
  ) {
    const createUserWordURL = `https://rs-lang-team65.herokuapp.com/users/${userId}/words/${wordId}`;
    const payload = {
      difficulty,
      optional: {
        wordInfo,
        isDeleted,
        isBeenLearning,
      },
    };
    const payloadJSON = JSON.stringify(payload);

    const res = await fetch(
      createUserWordURL,
      {
        method: 'POST',
        mode: 'cors',
        body: payloadJSON,
      },
    );
    const data = await res.json();
    return data;
  },

  async getUserWordById(
    userId: string,
    wordId: string,
  ) {
    const getUserWordByIdURL = `https://rs-lang-team65.herokuapp.com/users/${userId}/words/${wordId}`;
    const res = await fetch(getUserWordByIdURL);
    const data = await res.json();
    return data;
  },

  // async updateUserWordById(
  //   userId: string,
  //   wordId: string,
  //   difficulty: string,
  //   wordInfo: any,
  //   difficulty: string,
  //   wordInfo: any,
  //   isDeleted: boolean,
  //   isBeenLearning: boolean,
  // ) {
  //   const updateUserWordByIdURL = `https://rs-lang-team65.herokuapp.com/users/${userId}/words/${wordId}`;
  //   const payload = {
  //     difficulty,
  //     optional: {
  //       wordInfo,
  //       isDeleted,
  //       isBeenLearning,
  //     },
  //   };
  //   const payloadJSON = JSON.stringify(payload);

  //   const res = await fetch(
  //     updateUserWordByIdURL,
  //     {
  //       method: 'PUT',
  //       mode: 'cors',
  //       body: payloadJSON,
  //     },
  //   );
  //   const data = await res.json();
  //   return data;
  // },

  async deleteUserWordsById(
    userId: string,
    wordId: string,
  ) {
    const deleteUserWordsByIdURL = `https://rs-lang-team65.herokuapp.com/users/${userId}/words/${wordId}`;

    const res = await fetch(deleteUserWordsByIdURL, {
      method: 'DELETE',
      mode: 'cors',
    });

    const data = await res.json();
    return data;
  },
};

export default usersWordsAPI;
