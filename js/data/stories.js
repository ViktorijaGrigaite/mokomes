// The picture stories: pages of [pictures, Lithuanian sentence, English], then a question.

const STORIES = [
  {ico:'🦊', title:'Alkana lapė', en:'The hungry fox', pages:[
    ['🦊🌲','Miške gyvena lapė.','A fox lives in the forest.'],['🦊😟','Lapė labai alkana.','The fox is very hungry.'],
    ['🦊🍎','Ji randa raudoną obuolį.','She finds a red apple.'],['🦊😋','Lapė valgo obuolį. Skanu!','The fox eats the apple. Yummy!']],
    q:['Ką valgė lapė?','What did the fox eat?'], opts:[['🍎','obuolį'],['🧀','sūrį'],['🐟','žuvį']], ans:0},
  {ico:'🐱', title:'Kačiuko kamuolys', en:'The kitten\'s ball', pages:[
    ['🐱⚽','Kačiukas turi mėlyną kamuolį.','The kitten has a blue ball.'],['⚽🌳','Kamuolys nurieda po medžiu.','The ball rolls under the tree.'],
    ['🐶','Šuniukas padeda ieškoti.','The puppy helps to look.'],['🐱🐶⚽','Jie randa kamuolį ir žaidžia kartu.','They find the ball and play together.']],
    q:['Kokios spalvos kamuolys?','What colour is the ball?'], opts:[['🔵','mėlynas'],['🔴','raudonas'],['🟡','geltonas']], ans:0},
  {ico:'🐻', title:'Meškiuko gimtadienis', en:'Little bear\'s birthday', pages:[
    ['🐻🎂','Šiandien meškiuko gimtadienis.','Today is little bear\'s birthday.'],['🐰🦊🐸','Ateina kiškis, lapė ir varlė.','The hare, the fox and the frog come.'],
    ['🎁🎈','Draugai atneša dovanų ir balionų.','Friends bring presents and balloons.'],['🐻🎉','Visi dainuoja ir šoka. Valio!','Everyone sings and dances. Hooray!']],
    q:['Kas atėjo į gimtadienį?','Who came to the birthday?'], opts:[['🐰','kiškis'],['🐄','karvė'],['🐟','žuvis']], ans:0}
];
