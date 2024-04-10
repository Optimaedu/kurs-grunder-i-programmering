const firstNames = [
  'Anna','Selma','Siri','Julia','Yvette','Görel','Pirkko','Pirjo','Berit','Lilian','Yvonne','Elisabeth','Ada','Jane','Clara','Aghata','Pamela',
  'Peter','Olav','Jonas','Fredrik','Henry','Ethan','Levi','Sebastian','Jack','Samuel','Leo','Gabriel','Michael','Robin','Rufus','Edgar','Otto'
];

const lastNames = [
  'Korhonen', 'Virtanen', 'Nieminen', 'Mäkinen', 'Hämäläinen', 'Koskinen', 'Heikkinen', 'Järvinen', 'Laine', 'Lehtinen', 'Salonen', 'Ojala', 'Kallio', 'Leppänen', 'Rantala', 'Johansson', 'Andersson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson'
]

const colors = [
  'röd', 'grön', 'blå', 'råsa', 'lila', 'orange', 'gul', 'vit', 'svart', 'grå', 'brun'
];

const fruits = ['banan', 'apelsin', 'mango', 'äpple', 'citron', 'kiwi', 'päron', 'lime', 'avokado'];

const nouns = ['bord', 'stol', 'skola', 'glas', 'hus', 'kastrull', 'säng', 'dator', 'telefon'];

const animals = [
  'katt', 'hund', 'råtta', 'kanin', 'gris', 'ko', 'get', 'får', 'häst', 'hamster', 'mus', 'fisk', 'orm', 'uggla', 'korp', 'höna', 'anka', 'ekorre', 'papegoja', 'kanariefågel'
];

const words = [...fruits, ...nouns, ...colors];

export function generateRandomString(length: number = 32) {
  const codes: number[] = [];
  while(codes.length < length) {
    codes.push(generateRandomNumber(65, 90));
  }
  return String.fromCharCode(...codes);
}

export function generateRandomNumber(min: number=0, max: number=9999) {
  return min + Math.round((max-min) * Math.random());
}

export function generateRandomFirstName() {
  return firstNames[Math.floor(Math.random()*firstNames.length)];
}

export function generateRandomLastName() {
  return lastNames[Math.floor(Math.random()*lastNames.length)];
}

export function generateRandomColor() {
  return colors[Math.floor(Math.random()*colors.length)];
}

export function generateRandomWord() {
  return words[Math.floor(Math.random()*words.length)];
}

export function generateRandomAnimal() {
  return animals[Math.floor(Math.random()*animals.length)];
}
