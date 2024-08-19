import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const movies = [
  {
    title: "Fight Club",
    year: 1999,
    director: "David Fincher",
    coverImage: "/textures/movieCovers/fight_club.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/fight_club.webp"),
    summary:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
  },
  {
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    coverImage: "/textures/movieCovers/forrest_gump.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/forrest_gump.webp"),
    summary:
      "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    coverImage: "/textures/movieCovers/inception.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/inception.webp"),
    summary:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    coverImage: "/textures/movieCovers/interstellar.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/interstellar.webp"),
    summary:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    coverImage: "/textures/movieCovers/les_evades.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/les_evades.webp"),
    summary:
      "A Maine banker convicted of the murder of his wife and her lover in 1947 gradually forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
  },
  {
    title: "Schindler's List",
    year: 1993,
    director: "Steven Spielberg",
    coverImage: "/textures/movieCovers/liste_de_schindler.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/liste_de_schindler.webp"
    ),
    summary:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    coverImage: "/textures/movieCovers/pulp_fiction.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/pulp_fiction.webp"),
    summary:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    title: "Shutter Island",
    year: 2010,
    director: "Martin Scorsese",
    coverImage: "/textures/movieCovers/shutter_island.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/shutter_island.webp"
    ),
    summary:
      "Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.",
  },
  {
    title: "The Green Mile",
    year: 1999,
    director: "Frank Darabont",
    coverImage: "/textures/movieCovers/the_green_mile.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/the_green_mile.webp"
    ),
    summary:
      "A tale set on death row, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the lead guard, Paul Edgecombe, recognizes John's gift, he tries to help stave off the condemned man's execution.",
  },
  {
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    coverImage: "/textures/movieCovers/the_matrix.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/the_matrix.webp"),
    summary:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    title: "Titanic",
    year: 1997,
    director: "James Cameron",
    coverImage: "/textures/movieCovers/titanic.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/titanic.webp"),
    summary:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
  },
  {
    title: "Django Unchained",
    year: 2012,
    director: "Quentin Tarantino",
    coverImage: "/textures/movieCovers/django_unchained.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/django_unchained.webp"
    ),
    summary:
      "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
  },
  {
    title: "Dune",
    year: 2021,
    director: "Denis Villeneuve",
    coverImage: "/textures/movieCovers/dune.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/dune.webp"),
    summary:
      "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
  },
  {
    title: "Green Book",
    year: 2018,
    director: "Peter Farrelly",
    coverImage: "/textures/movieCovers/green_book.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/green_book.webp"),
    summary:
      "A working-class Italian-American bouncer becomes the driver of an African-American classical pianist on a tour of venues through the 1960s American South.",
  },
  {
    title: "Joker",
    year: 2019,
    director: "Todd Phillips",
    coverImage: "/textures/movieCovers/joker.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/joker.webp"),
    summary:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
  },
  {
    title: "Léon",
    year: 1994,
    director: "Luc Besson",
    coverImage: "/textures/movieCovers/leon.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/leon.webp"),
    summary:
      "12-year-old Mathilda is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin's trade.",
  },
  {
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
    coverImage: "/textures/movieCovers/parasite.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/parasite.webp"),
    summary:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
  {
    title: "Back to the future",
    year: 1985,
    director: "Robert Zemeckis",
    coverImage: "/textures/movieCovers/retour_vers_le_futur.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/retour_vers_le_futur.webp"
    ),
    summary:
      "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
  },
  {
    title: "Scarface",
    year: 1983,
    director: "Brian De Palma",
    coverImage: "/textures/movieCovers/scarface.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/scarface.webp"),
    summary:
      "Miami in the 1980s: a determined criminal minded Cuban immigrant, becomes the biggest drug smuggler in Florida, and is eventually undone by his own drug addiction.",
  },
  {
    title: "The Shining",
    year: 1980,
    director: "Stanley Kubrick",
    coverImage: "/textures/movieCovers/the_shining.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/the_shining.webp"),
    summary:
      "A family heads to an isolated hotel for the winter, where a sinister presence influences the father into violence. At the same time, his psychic son sees horrifying forebodings from both the past and the future.",
  },
  {
    title: "The Truman Show",
    year: 1998,
    director: "Peter Weir",
    coverImage: "/textures/movieCovers/truman_show.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/truman_show.webp"),
    summary:
      "An insurance salesman is oblivious of the fact that his entire life is a TV show and his family members are mere actors. As he starts noticing things and uncovers the truth, he decides to escape.",
  },
];

export default movies;
