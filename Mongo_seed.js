/**
* Genera un número aleatorio entre cero y el valor max
*/
function randInt(max) {
  return Math.round(_rand() * max);
}
/* Genera un valor boolean aleatorio ( true | false)*/
function randBool() {
  return _rand() > 0.5;
}
/* Genera una palabra aleatoria de longitud aleatoria entre minLength y maxLength*/
function randWord(minLengt, maxLength) {
  let letters = "abcdefghijlmnopqrstuvwxyz";
  let length = minLengt + randInt(maxLength - minLengt);
  let word = "";
  for (let i = 0; i < length; i++) {
    word += letters.charAt(randInt(letters.length));
  }
  return word;
}

/* Genera una fecha aleatoria entre fromDate y toDate */
function randomDate(fromDate, toDate) {
  toDate = toDate || new Date();
  fromDate = typeof fromDate == "string" ? new Date(fromDate) : fromDate;
  let max = toDate.getTime();
  let min = fromDate.getTime();
  let delta = randInt(max - min);
  return new Date(min + delta);
}

/* Genera un grupo de palabras aleatorias, la cantidad de palabras será entre minWordCount y maxWordCount*/
function randomText(minWordCount, maxWordCount) {
  let text = "";
  let length = minWordCount + randInt(maxWordCount - minWordCount);
  for (let i = 0; i < length; i++) {
    text += " " + randWord(4, 20);
  }
  return text;
}

/* retorna un elemento aleatorio de un arreglo randElement([1,2,3,4])*/
function randElement() {
  let array = [...arguments];
  if (array.length == 1 && Array.isArray(array[0])) {
    array = arguments[0];
  }
  let index = randInt(array.length)
  if(index >= array.length) index = array.length - 1
  let element =  array[index];
  return element
}

/* Genera una url de una imagen aleatoria del ancho y alto dado */
function randImage(width, height, seed = undefined) {
  width = width || 1024;
  height = height || 768;
  seed = seed || randWord(5, 10);
  return "https://picsum.photos/seed/" + seed + "/" + width + "/" + height;
}

/* Convierte una palabra o grupo de palabras en una clave unica en minúscula, removiendo todos los acentos y convirtiendo
  los espacios en guiones _. 
  
  Por ejemplo, al generar una clave para el nombre "Santa fe de Bogotá", retorna "santa_fe_de_bogota"
  Usado para generar identificadores
*/
function getKey(value){
  let replaceMap = { " " : "_", "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ñ": "ni", "ü": "u"}
  let lower = value.toLocaleLowerCase()
  return Object.keys(replaceMap).reduce((p, c) => p.replace(c, replaceMap[c]), lower)
}

/*
Igual que la funcion map de un array javascript, pero el mongo shell no soporta esta función
*/
function map(list, transformer){
  let mapped = []
  for(let e of list) mapped.push(transformer(e))
  return mapped
}

function randEnumerable(labels){
  const label = randElement(labels)
  return toEnumerable(label)
}

/* Algunos elementos en la db se almacenan como id, label, esta funcion convierte una string en un objeto.
  Ejemplo: Bogotá  ->   {"label": "Bogotá", "key": "bogota"}
*/
function toEnumerable(label){
  return { key: getKey(label), label }
}


/*
Realiza la incersión en lote de los elementos en la db de mongo, es más rápido que hacerlo uno a uno. El parámetro generator
es una función que genera los elementos a insertar.
*/
function batchInsert(collection, size, generator) {
  let batch = [];
  let batchCount = 1;
  for (let i = 0; i < size; i++) {
    let item = generator();
    batch.push(item);
    if (batch.length > 50) {
      print("Inserting batch " + batchCount++);
      db[collection].insertMany(batch);
      batch = [];
    }
  }
  if (batch.length > 0) db[collection].insertMany(batch);
}

/**elimina todos los elements colección con el nombre dado*/
function clearCollection(name){
    print("Clearing collection " + name)
    db[name].deleteMany({})
}

/* Genera muchos objetos de la forma {key, label} a partir de una lista de nombres y los inserta en una colección llamada enumerations */
function insertEnums(enumObjects){
  let keys = Object.keys(enumObjects)
  for(let key of keys){
    let values = enumObjects[key]
    let objects = map(values, e => ({type: key, key: getKey(e), label: e }))
    print("Inserting enums for " + key)
    db["enumerations"].insertMany(objects)
  }
}

function enumLists(){
  return {
    brand : [
      "Mazda",
      "Fiat",
      "Honda",
      "Chevrolet",
      "Ford",
      "Hyundai",
      "Renault",
    ],
    color: ["Rojo", "Negro", "Blanco", "Verde", "Plata", "Gris"],
    city: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga", "Manizales", "Pereira", "Villavicencio", "Cartagena"],
    transmision: ["Mecánica", "Automática"],
    tipoCarroceria: ["Sedán", "HatchBack"],
    source: ["Tu Carro", "CarroYa", "MatchCars", "Kavak"],
    tipoCombustible: ["Gasolina", "Gas Natural", "Eléctrico", "Diesel"]
  }
}

function randomItem() {
  let enums = enumLists()
  let randE = (listName) => randEnumerable(enums[listName]) 

  return {
    title: randomText(4, 8),
    description: randomText(128, 256),
    image: randImage(),
    price: { currency: "COP", value: (randInt(20000000) + 20000000)},
    location: { "city": randE("city") },
    features: {
      brand: randE("brand"),
      model: toEnumerable("Modelo " + randInt(5)),
      year: 2010 + randInt(12),
      color: randE("color"),
      tipoCombustible: randE("tipoCombustible"),
      puertas: randElement(2, 4, 5),
      transmision: randE("transmision"),
      tipoCarroceria: randE("tipoCarroceria"),
      kilometros: randInt(50000) + " km",
      direccion: randBool(),
      frenosAbs: randBool(),
      alarma: randBool(),
      bluetooth: randBool(),
      reproductorMp3: randBool(),
      airbagParaConductorYPasajero: randBool(),
      entradaUsb: randBool(),
      tapizadoCuero: randBool(),
      vidriosElectricos: randBool(),
      cierreAutomaticoVidrios: randBool(),
      farosAntinieblasDelanteros: randBool(),
      farosAntinieblasTraseros: randBool(),
    },
    publicationInfo: {
      source: randE("source"),
      publishedAt: randomDate("2021-01-01"),
      url: "https://articulo.tucarro.com.co/MCO-857263207",
    },
  };
}

clearCollection("enumerations")
insertEnums(enumLists());
batchInsert("items", 1000, randomItem);