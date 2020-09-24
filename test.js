const listName = "Prima lista";
const movies = ["321322", "543534"];
const ownerId = "01";

fetch("https://project-listana.firebaseio.com/lists.json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    listName,
    movies,
    ownerId,
  }),
});

// const LISTS = [
//     new ListsDatabase("001", "Prima lista", ["321322", "543534"], "01"),
//     new ListsDatabase(
//       "002",
//       "A douas lista",
//       ["123123", "234234", "345345"],
//       "02"
//     ),
//     new ListsDatabase("003", "A treias lista", ["232323", "343434"], "03"),
//     new ListsDatabase("004", "A patras lista", ["344334", "322332"], "01"),
//     new ListsDatabase("005", "A cincea lista", ["565656", "656565"], "02"),
//     new ListsDatabase(
//       "006",
//       "A sasea lista",
//       ["232123", "664465", "546217"],
//       "03"
//     ),
//     new ListsDatabase("007", "A saptea lista", ["767676", "668768"], "01"),
//     new ListsDatabase("008", "A opta lista", ["879654", "214897"], "02"),
//     new ListsDatabase("006", "A lista lista", ["322332"], "03"),
//   ];
