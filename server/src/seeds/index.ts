import { sequelize, Book, Author, Publisher } from '../models/index.js';

async function seedBook() {
  const book = await Book.create({
    key: "/books/OL8773900M",
    title: "The Ecology Of Freedom",
    subtitle: "The Emergence And Dissolution Of Hierarchy",
    isbn_13: "9781904859260",
    isbn_10: "1904859267",
    publish_date: "July 2005",
    description: "\"The Ecology of Freedom\" is indispensable reading for anyone who's tired of living in a world where everything, and everyone, is an exploitable resource. Murray Bookchin uses an inspired synthesis of ecology, anthropology, philosophy and political theory to trace our society's conflicting legacies of freedom and domination, from the first emergence of human culture to today's global capitalism. This title expounds on the proposition that \"the very notion of the domination of nature by man stems from the very real domination of human by human\" and suggests that our nightmare will continue until hierarchy is dissolved and human beings develop more sane, sustainable and egalitarian social structures.",
    coverUrl: "https://covers.openlibrary.org/b/id/951734-L.jpg",
    owned: true,
    read: true,
  });

  return book;
}

async function seedAuthor() {
  const author = await Author.create({
    key: "/authors/OL333834A",
    name: "Murray Bookchin",
    bio: "Murray Bookchin (January 14, 1921 – July 30, 2006) was an American libertarian socialist, political and social philosopher, speaker and writer. For much of his life he called himself an anarchist, although as early as 1995 he privately renounced his identification with the anarchist movement. A pioneer in the ecology movement, Bookchin was the founder of the social ecology movement within libertarian socialist and ecological thought. He was the author of two dozen books on politics, philosophy, history, and urban affairs as well as ecology.\r\n\r\nBookchin was an anti-capitalist and vocal advocate of the decentralisation of society. His writings on libertarian municipalism, a theory of face-to-face, grassroots democracy, had an influence on the Green Movement and anti-capitalist direct action groups such as Reclaim the Streets. He was a staunch critic of biocentric philosophies such as deep ecology and the biologically deterministic beliefs of sociobiology, and his criticisms of \"new age\" Greens such as Charlene Spretnak contributed to the divisions that affected the American Green movement in the 1990s.",
    birth_date: "14 January 1921",
    death_date: "30 July 2006",
  });

  return author;
}

async function seedPublisher() {
  const publisher = await Publisher.create({ name: "AK Press" });

  return publisher;
}

const seedAll = async (): Promise<void> => {
  try {
    
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    const book = await seedBook();
    console.log('\n----- BOOK SEEDED -----\n');

    const author = await seedAuthor();
    console.log('\n----- AUTHOR SEEDED -----\n');

    const publisher = await seedPublisher();
    console.log('\n----- PUBLISHER SEEDED -----\n');

    await book.addAuthor(author);
    await book.addPublisher(publisher);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
