// Content for individual games (treasure hunt, weather, shop, opposites, animal sounds, …).

const MOVES = [
  ['🦘','Šokinėk!','Jump!'],['👏','Suplok rankomis!','Clap your hands!'],['🪑','Atsisėsk!','Sit down!'],
  ['🧍','Atsistok!','Stand up!'],['🔄','Apsisuk!','Turn around!'],['👋','Pamojuok!','Wave!'],
  ['😊','Nusišypsok!','Smile!'],['👃','Paliesk nosį!','Touch your nose!'],['🙌','Pakelk rankas!','Raise your hands!'],
  ['😌','Užsimerk!','Close your eyes!'],['🦶','Trepsėk kojomis!','Stomp your feet!'],['🏃','Bėk vietoje!','Run on the spot!'],
  ['🐸','Šok kaip varlė!','Jump like a frog!'],['🦒','Ištiesk kaklą kaip žirafa!','Stretch like a giraffe!']
];

const TREASURE = [
  ['🔴','Surask kažką raudono!','Find something red!'],['🔵','Surask kažką mėlyno!','Find something blue!'],
  ['🟡','Surask kažką geltono!','Find something yellow!'],['🟢','Surask kažką žalio!','Find something green!'],
  ['⚪','Surask kažką balto!','Find something white!'],['⚫','Surask kažką juodo!','Find something black!'],
  ['📖','Surask knygą!','Find a book!'],['⚽','Surask kamuolį!','Find a ball!'],['🥄','Surask šaukštą!','Find a spoon!'],
  ['👟','Surask batą!','Find a shoe!'],['🧸','Surask žaislą!','Find a toy!'],['☁️','Surask kažką minkšto!','Find something soft!'],
  ['⭕','Surask kažką apvalaus!','Find something round!'],['🍎','Surask kažką, ką galima valgyti!','Find something you can eat!'],
  ['🤗','Apkabink mamą!','Give mum a hug!']
];

const WEATHER = [
  {w:'❄️', lt:'Sninga!', en:'It is snowing!', ok:['šalikas','pirštinės','striukė','batai']},
  {w:'🌧️', lt:'Lyja!', en:'It is raining!', ok:['skėtis','striukė','batai']},
  {w:'☀️', lt:'Saulėta!', en:'It is sunny!', ok:['akiniai nuo saulės','kepurė','šortai','marškinėliai']}
];

const HOMES = [['🚜','Ūkyje!','On the farm'],['🌲','Miške!','In the forest'],['🌊','Jūroje!','In the sea']];

const LIVES = [['🐄','karvė',0],['🐖','kiaulė',0],['🐑','avis',0],['🐔','višta',0],['🐎','arklys',0],
  ['🦊','lapė',1],['🐺','vilkas',1],['🐻','meška',1],['🐰','kiškis',1],['🦔','ežys',1],['🐿️','voverė',1],
  ['🐟','žuvis',2],['🐋','banginis',2],['🐬','delfinas',2],['🐙','aštuonkojis',2],['🦀','krabas',2],['🦭','ruonis',2]];

const PRICES = ['vieną eurą','du eurus','tris eurus','keturis eurus','penkis eurus'];

const OPPOSITES = [
  [['🐘','didelis','big'],['🐭','mažas','small']], [['🔥','karštas','hot'],['🧊','šaltas','cold']],
  [['😀','linksmas','happy'],['😢','liūdnas','sad']], [['🐇','greitas','fast'],['🐢','lėtas','slow']],
  [['🌲','aukštas','tall'],['🌱','žemas','short']], [['☀️','diena','day'],['🌙','naktis','night']],
  [['📖','atidaryta','open'],['📕','uždaryta','closed']], [['💡','šviesu','light'],['🌑','tamsu','dark']]
];

const PLURALS = [['🐈','katė','katės','cat'],['🐕','šuo','šunys','dog'],['🍎','obuolys','obuoliai','apple'],['🐟','žuvis','žuvys','fish'],
  ['🐦','paukštis','paukščiai','bird'],['🌸','gėlė','gėlės','flower'],['🚗','mašina','mašinos','car'],['⚽','kamuolys','kamuoliai','ball'],
  ['📖','knyga','knygos','book'],['⭐','žvaigždė','žvaigždės','star'],['🦆','antis','antys','duck'],['🌳','medis','medžiai','tree'],
  ['🐭','pelė','pelės','mouse'],['🐸','varlė','varlės','frog'],['🍓','braškė','braškės','strawberry']];

const ROUTINE = [['⏰','Atsibundu','I wake up'],['🪥','Valau dantis','I brush my teeth'],['🥣','Valgau pusryčius','I eat breakfast'],
  ['🎒','Einu į darželį','I go to kindergarten'],['🧸','Žaidžiu','I play'],['🍝','Valgau vakarienę','I eat dinner'],
  ['🛁','Maudausi','I take a bath'],['😴','Miegu','I sleep']];

const SOUNDS = [['🐕','Šuo','au au'],['🐈','Katė','miau'],['🐄','Karvė','mū'],['🐓','Gaidys','kakariekū'],['🐖','Kiaulė','kriu kriu'],
  ['🐎','Arklys','igogo'],['🐸','Varlė','kva kva'],['🐑','Avis','bė bė'],['🐐','Ožka','mė mė'],['🐭','Pelė','cyp cyp'],
  ['🐝','Bitė','zzz'],['🐺','Vilkas','auuu'],['🐦','Gegutė','ku kū'],['🐔','Višta','kud kudak']];

const CALL = [
  {g:'Labas, vaikeli!', en:'Hello, little one!', ok:['Labas, močiute!','Hello, grandma!'], no:[['Labanakt!','Good night!'],['Ačiū!','Thank you!']]},
  {g:'Kaip sekasi?', en:'How are you?', ok:['Gerai, ačiū!','Good, thank you!'], no:[['Miau!','Meow!'],['Raudona.','Red.']]},
  {g:'Ką šiandien veikei?', en:'What did you do today?', ok:['Žaidžiau su draugais.','I played with friends.'], no:[['Penki.','Five.'],['Atsiprašau.','Sorry.']]},
  {g:'Ar valgei pietus?', en:'Did you eat lunch?', ok:['Taip, valgiau sriubą.','Yes, I ate soup.'], no:[['Aš esu bananas!','I am a banana!'],['Labas rytas!','Good morning!']]},
  {g:'Myliu tave! Iki!', en:'I love you! Bye!', ok:['Aš tave irgi myliu! Iki!','I love you too! Bye!'], no:[['Kva kva!','Ribbit!'],['Kur katė?','Where is the cat?']]}
];

const POLITE = [
  ['🎁','Draugas duoda tau dovaną.','A friend gives you a present.','Ačiū!'],
  ['🍪','Nori paprašyti sausainio.','You want to ask for a cookie.','Prašau!'],
  ['💥','Netyčia atsitrenkei į draugą.','You bumped into a friend by accident.','Atsiprašau!'],
  ['🌅','Rytas. Tu atsibundi.','It is morning. You wake up.','Labas rytas!'],
  ['🌙','Laikas miegoti.','It is time for bed.','Labanakt!'],
  ['👋','Draugas eina namo.','Your friend is going home.','Iki!'],
  ['🍽️','Šeima sėda valgyti.','The family sits down to eat.','Skanaus!'],
  ['🤝','Susitinki naują draugą.','You meet a new friend.','Labas!']
];

const POLITE_EN = {'Ačiū!':'Thank you!','Prašau!':'Please!','Atsiprašau!':'Sorry!','Labas rytas!':'Good morning!','Labanakt!':'Good night!','Iki!':'Bye!','Skanaus!':'Enjoy your meal!','Labas!':'Hello!'};

const FEELINGS = [['😀','linksmas','happy'],['😢','liūdnas','sad'],['😠','piktas','angry'],['😨','išsigandęs','scared'],['😴','pavargęs','tired'],['😲','nustebęs','surprised']];

const SYMBOLS = [
  ['🏀','krepšinis','basketball','Lietuviai labai mėgsta krepšinį.','Lithuanians love basketball.'],
  ['🥟','cepelinai','cepelinai','Cepelinai – lietuviškas patiekalas.','Cepelinai are a Lithuanian dish.'],
  ['🪺','gandro lizdas','stork\'s nest','Gandras – Lietuvos paukštis.','The stork is Lithuania\'s bird.'],
  ['🌳','ąžuolas','oak','Ąžuolas – stiprus medis.','The oak is a strong tree.'],
  ['🌿','rūta','rue','Rūta – Lietuvos augalas.','Rue is Lithuania\'s plant.'],
  ['🏰','pilis','castle','Vilniuje stovi Gedimino pilis.','Gediminas Castle stands in Vilnius.'],
  ['🌊','jūra','sea','Lietuva yra prie Baltijos jūros.','Lithuania is by the Baltic Sea.'],
  ['🟠','gintaras','amber','Gintaras randamas prie jūros.','Amber is found by the sea.'],
  ['FLAG','vėliava','flag','Vėliava: geltona, žalia, raudona.','The flag: yellow, green, red.']
];

const SEASONS = [['🌱','Pavasarį!','In spring'],['☀️','Vasarą!','In summer'],['🍁','Rudenį!','In autumn'],['❄️','Žiemą!','In winter']];

const SEASON_ITEMS = [['🐣','viščiukas',0],['🌷','tulpė',0],['🥚','Velykos',0],['🏖️','paplūdimys',1],['🍦','ledai',1],['🍓','braškės',1],
  ['🍂','krentantys lapai',2],['🍄','grybai',2],['🎒','mokykla',2],['⛄','besmegenis',3],['🎄','Kalėdos',3],['🛷','rogės',3],['🎭','Užgavėnės',3]];

const PLACES = [['ant','ant dėžės','on the box'],['in','dėžėje','in the box'],['by','šalia dėžės','next to the box']];

const PLACE_ANIMALS = [['🐈','Katė'],['🐕','Šuo'],['🐭','Pelė'],['🐸','Varlė']];

const TRANSPORT_BINS = [['☁️','Danguje!','In the sky'],['🛣️','Kelyje!','On the road'],['🌊','Vandenyje!','In the water']];

const TRANSPORT = [['✈️','lėktuvas',0],['🚁','sraigtasparnis',0],['🚀','raketa',0],['🚂','traukinys',1],['🚌','autobusas',1],
  ['🚲','dviratis',1],['🚗','mašina',1],['🚜','traktorius',1],['🚢','laivas',2],['⛵','burlaivis',2],['🚤','kateris',2]];

const RHYMES = [[['🐭','pelė'],['🌸','gėlė'],['🐸','varlė']],[['🐟','žuvis'],['🐑','avis']],[['👩','mama'],['🦙','lama']],
  [['⚽','kamuolys'],['🍎','obuolys']],[['🐖','kiaulė'],['☀️','saulė']]];

const MIXES = [['geltona','mėlyna','žalia'],['raudona','geltona','oranžinė'],['raudona','mėlyna','violetinė'],['raudona','balta','rožinė'],['juoda','balta','pilka']];
