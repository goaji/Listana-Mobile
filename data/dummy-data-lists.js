import ListsDatabase from "../models/listsDatabase";

const LISTS = [
  new ListsDatabase("001", "Prima lista", ["321322", "543534"], "01"),
  new ListsDatabase(
    "002",
    "A douas lista",
    ["123123", "234234", "345345"],
    "02"
  ),
  new ListsDatabase("003", "A treia lista", ["232323", "343434"], "03"),
  new ListsDatabase("004", "A patra lista", ["344334", "322332"], "01"),
  new ListsDatabase("005", "A cincea lista", ["565656", "656565"], "02"),
  new ListsDatabase(
    "006",
    "A sasea lista",
    ["232123", "664465", "546217"],
    "03"
  ),
  new ListsDatabase("007", "A saptea lista", ["767676", "668768"], "01"),
  new ListsDatabase("008", "A opta lista", ["879654", "214897"], "02"),
  new ListsDatabase("009", "A noua lista", ["322332"], "03"),
];

export default LISTS;
