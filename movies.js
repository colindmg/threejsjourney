import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const movies = [
  {
    title: "Fight Club",
    year: 1999,
    director: "David Fincher",
    coverImage: "/textures/movieCovers/fight_club.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/fight_club.webp"),
  },
  {
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    coverImage: "/textures/movieCovers/forrest_gump.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/forrest_gump.webp"),
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    coverImage: "/textures/movieCovers/inception.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/inception.webp"),
  },
  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    coverImage: "/textures/movieCovers/interstellar.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/interstellar.webp"),
  },
  {
    title: "Les évadés",
    year: 1994,
    director: "Frank Darabont",
    coverImage: "/textures/movieCovers/les_evades.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/les_evades.webp"),
  },
  {
    title: "La liste de Schindler",
    year: 1993,
    director: "Steven Spielberg",
    coverImage: "/textures/movieCovers/liste_de_schindler.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/liste_de_schindler.webp"
    ),
  },
  {
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    coverImage: "/textures/movieCovers/pulp_fiction.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/pulp_fiction.webp"),
  },
  {
    title: "Shutter Island",
    year: 2010,
    director: "Martin Scorsese",
    coverImage: "/textures/movieCovers/shutter_island.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/shutter_island.webp"
    ),
  },
  {
    title: "The Green Mile",
    year: 1999,
    director: "Frank Darabont",
    coverImage: "/textures/movieCovers/the_green_mile.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/the_green_mile.webp"
    ),
  },
  {
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    coverImage: "/textures/movieCovers/the_matrix.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/the_matrix.webp"),
  },
  {
    title: "Titanic",
    year: 1997,
    director: "James Cameron",
    coverImage: "/textures/movieCovers/titanic.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/titanic.webp"),
  },
  {
    title: "Django Unchained",
    year: 2012,
    director: "Quentin Tarantino",
    coverImage: "/textures/movieCovers/django_unchained.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/django_unchained.webp"
    ),
  },
  {
    title: "Dune",
    year: 2021,
    director: "Denis Villeneuve",
    coverImage: "/textures/movieCovers/dune.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/dune.webp"),
  },
  {
    title: "Green Book",
    year: 2018,
    director: "Peter Farrelly",
    coverImage: "/textures/movieCovers/green_book.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/green_book.webp"),
  },
  {
    title: "Joker",
    year: 2019,
    director: "Todd Phillips",
    coverImage: "/textures/movieCovers/joker.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/joker.webp"),
  },
  {
    title: "Léon",
    year: 1994,
    director: "Luc Besson",
    coverImage: "/textures/movieCovers/leon.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/leon.webp"),
  },
  {
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
    coverImage: "/textures/movieCovers/parasite.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/parasite.webp"),
  },
  {
    title: "Retour vers le futur",
    year: 1985,
    director: "Robert Zemeckis",
    coverImage: "/textures/movieCovers/retour_vers_le_futur.webp",
    coverTexture: textureLoader.load(
      "/textures/movieCovers/retour_vers_le_futur.webp"
    ),
  },
  {
    title: "Scarface",
    year: 1983,
    director: "Brian De Palma",
    coverImage: "/textures/movieCovers/scarface.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/scarface.webp"),
  },
  {
    title: "The Shining",
    year: 1980,
    director: "Stanley Kubrick",
    coverImage: "/textures/movieCovers/the_shining.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/the_shining.webp"),
  },
  {
    title: "Truman Show",
    year: 1998,
    director: "Peter Weir",
    coverImage: "/textures/movieCovers/truman_show.webp",
    coverTexture: textureLoader.load("/textures/movieCovers/truman_show.webp"),
  },
];

export default movies;
