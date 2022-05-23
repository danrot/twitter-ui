import ListId from "../domain/ListId";
import Tweet from "../domain/Tweet";
import TweetRepository from "../domain/TweetRepository";
import TwitterApiError from "./TwitterApiError";

class TwitterTweetRepository implements TweetRepository {
	async findByList(listId: ListId): Promise<Array<Tweet>> {
		const response = await fetch(`/api/lists/statuses.json?list_id=${listId}&tweet_mode=extended`);

		if (!response.ok) {
			throw new TwitterApiError(await response.json());
		}

		const tweets = await response.json();

		return tweets.map((tweet: {full_text: string}) => new Tweet(tweet.full_text));
	}
}

export default TwitterTweetRepository;
