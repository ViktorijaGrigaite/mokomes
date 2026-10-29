// Word lists: topics with picture, Lithuanian word and English meaning; the alphabet; numbers.

const CATS = {
  gyvunai:{lt:'Gyvūnai',en:'Animals',art:'the ',items:[
    ['🐕','šuo','dog'],['🐈','katė','cat'],['🐄','karvė','cow'],['🐎','arklys','horse'],['🐖','kiaulė','pig'],
    ['🐑','avis','sheep'],['🦆','antis','duck'],['🐔','višta','hen'],['🐟','žuvis','fish'],['🐦','paukštis','bird'],
    ['🦊','lapė','fox'],['🐺','vilkas','wolf'],['🐻','meška','bear'],['🐰','kiškis','hare'],['🐭','pelė','mouse'],['🐸','varlė','frog']]},
  spalvos:{lt:'Spalvos',en:'Colours',art:'',items:[
    ['#E53935','raudona','red'],['#1E63D6','mėlyna','blue'],['#FDD835','geltona','yellow'],['#43A047','žalia','green'],
    ['#FB8C00','oranžinė','orange'],['#8E24AA','violetinė','purple'],['#F06292','rožinė','pink'],['#795548','ruda','brown'],
    ['#212121','juoda','black'],['#FFFFFF','balta','white']]},
  maistas:{lt:'Maistas',en:'Food',art:'the ',items:[
    ['🍎','obuolys','apple'],['🍌','bananas','banana'],['🍞','duona','bread'],['🥛','pienas','milk'],['🧀','sūris','cheese'],
    ['🥚','kiaušinis','egg'],['🥕','morka','carrot'],['🍓','braškė','strawberry'],['🍐','kriaušė','pear'],['🍦','ledai','ice cream'],
    ['🍲','sriuba','soup'],['🍒','vyšnia','cherry']]},
  seima:{lt:'Šeima',en:'Family',art:'',items:[
    ['👩','mama','mum'],['👨','tėtis','dad'],['👵','močiutė','grandma'],['👴','senelis','grandpa'],
    ['👦','brolis','brother'],['👧','sesė','sister'],['👶','kūdikis','baby']]},
  gamta:{lt:'Aplink mus',en:'Around us',art:'the ',items:[
    ['☀️','saulė','sun'],['🌙','mėnulis','moon'],['⭐','žvaigždė','star'],['🌳','medis','tree'],['🌸','gėlė','flower'],
    ['🏠','namas','house'],['🚗','mašina','car'],['⚽','kamuolys','ball'],['📖','knyga','book'],['🌧️','lietus','rain']]}
};

const ABC = [
  ['A','antis','🦆','duck'],['Ą','ąžuolas','🌳','oak'],['B','bananas','🍌','banana'],['C','citrina','🍋','lemon'],
  ['Č','česnakas','🧄','garlic'],['D','duona','🍞','bread'],['E','ežys','🦔','hedgehog'],['Ę','lęšiai','🫘','lentils'],
  ['Ė','ėriukas','🐑','lamb'],['F','fėja','🧚','fairy'],['G','gėlė','🌸','flower'],['H','hipopotamas','🦛','hippo'],
  ['I','indai','🍽️','dishes'],['Į','įrankiai','🔧','tools'],['Y','vyšnia','🍒','cherry'],['J','jūra','🌊','sea'],
  ['K','katė','🐈','cat'],['L','lapė','🦊','fox'],['M','meška','🐻','bear'],['N','namas','🏠','house'],
  ['O','obuolys','🍎','apple'],['P','pelė','🐭','mouse'],['R','ranka','✋','hand'],['S','saulė','☀️','sun'],
  ['Š','šuo','🐕','dog'],['T','traukinys','🚂','train'],['U','uogos','🍓','berries'],['Ų','dantų šepetėlis','🪥','toothbrush'],
  ['Ū','ūsai','🥸','moustache'],['V','vilkas','🐺','wolf'],['Z','zebras','🦓','zebra'],['Ž','žuvis','🐟','fish']
];

const NUMS = ['vienas','du','trys','keturi','penki','šeši','septyni','aštuoni','devyni','dešimt'];

const NUMS_EN = ['one','two','three','four','five','six','seven','eight','nine','ten'];

const COUNT_OBJ = ['🍎','⭐','🐟','🎈','🌸','🚗','🐞','🍓','⚽','🐥'];

CATS.kunas = {lt:'Kūnas', en:'Body', art:'the ', items:[
  ['👃','nosis','nose'],['👀','akys','eyes'],['👂','ausis','ear'],['👄','burna','mouth'],['🦷','dantys','teeth'],
  ['✋','ranka','hand'],['🦵','koja','leg'],['🦶','pėda','foot'],['👅','liežuvis','tongue'],['👆','pirštas','finger']]};

CATS.drabuziai = {lt:'Drabužiai', en:'Clothes', art:'the ', items:[
  ['🧣','šalikas','scarf'],['🧤','pirštinės','gloves'],['🧥','striukė','coat'],['🥾','batai','boots'],['☂️','skėtis','umbrella'],
  ['🕶️','akiniai nuo saulės','sunglasses'],['🧢','kepurė','cap'],['🩳','šortai','shorts'],['👕','marškinėliai','T-shirt']]};
