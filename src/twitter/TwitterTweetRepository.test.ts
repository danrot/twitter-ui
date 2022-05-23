import {enableFetchMocks} from "jest-fetch-mock";
import ListId from "../domain/ListId";
import Tweet from "../domain/Tweet";
import TwitterApiError from "./TwitterApiError";
import TwitterTweetRepository from "./TwitterTweetRepository";

/* global fetchMock */
enableFetchMocks();

// https://github.com/jefflau/jest-fetch-mock/issues/184#issuecomment-718058715
beforeEach(() => fetchMock.resetMocks());

it("returns tweets with text from response", async function() {
	fetchMock.mockResponse(JSON.stringify([
		{full_text: "Tweet 1"},
		{full_text: "Tweet 2"},
	]));

	const twitterListRepository = new TwitterTweetRepository();
	const lists = await twitterListRepository.findByList("123" as ListId);

	expect(fetchMock).toBeCalledWith("/api/lists/statuses.json?list_id=123&tweet_mode=extended");
	expect(lists).toEqual([new Tweet("Tweet 1"), new Tweet("Tweet 2")]);
});

it("throws if response is unsuccessful", async function() {
	fetchMock.mockResponse(JSON.stringify({}), {status: 500});

	const twitterListRepository = new TwitterTweetRepository();

	expect(() => twitterListRepository.findByList("456" as ListId)).rejects.toThrow(TwitterApiError);
	expect(fetchMock).toBeCalledWith("/api/lists/statuses.json?list_id=456&tweet_mode=extended");
});
