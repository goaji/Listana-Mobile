class userDatabase {
  constructor(
    userId,
    username,
    password,
    name,
    registrationDate,
    photo,
    bestMovieId
  ) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.name = name;
    this.registrationDate = registrationDate;
    this.photo = photo;
    this.bestMovieId = bestMovieId;
  }
}

export default userDatabase;
