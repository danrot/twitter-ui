import ListId from "./ListId";
import Tweet from "./Tweet";

interface TweetRepository {
	findByList(listId: ListId): Promise<Array<Tweet>>;
}

export default TweetRepository;
