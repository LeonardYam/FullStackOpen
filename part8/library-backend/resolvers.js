import Author from "./models/Author.js";
import Book from "./models/Book.js";
import User from "./models/User.js";
import { PubSub } from "graphql-subscriptions";

const PASSWORD = "TEST";
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = args.genre ? { genres: args.genre } : {};
      const books = await Book.find(query).populate("author");
      return books.filter((a) =>
        args.author ? a.author.name.includes(args.author) : true
      );
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("Not authenticated!");

      let authorId = null;
      let author = await Author.findOne({ name: args.author });

      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author, bookCount: 0 });
          author = await newAuthor.save();
        } 
        authorId = author._id;
        const book = new Book({ ...args, author: authorId });
        await book.save();
        await Author.findByIdAndUpdate(authorId, {bookCount: author.bookCount + 1})
        const populatedBook = book.populate("author")
        pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
        return populatedBook;
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args, context) => {
      const user = context.currentUser;
      if (!user) throw new AuthenticationError("Not authenticated!");

      const { name, setBornTo } = args;
      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true }
        );
        return updatedAuthor;
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });

      if (password != PASSWORD || !user) {
        throw new UserInputError("Wrong credentials!");
      }

      const userToken = {
        username,
        id: user._id,
      };

      return { value: jwt.sign(userToken, JWT_SECRET) };
    },
    createUser: async (root, args) => {
      const { username, favouriteGenre } = args;
      const user = new User({ username, favouriteGenre });
      await user.save();
      return user;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

export default resolvers;
