import {enableFetchMocks} from "jest-fetch-mock";
import List from "../domain/List";
import ListId from "../domain/ListId";
import TwitterApiError from "./TwitterApiError";
import TwitterListRepository from "./TwitterListRepository";

/* global fetchMock */
enableFetchMocks();

// https://github.com/jefflau/jest-fetch-mock/issues/184#issuecomment-718058715
beforeEach(() => fetchMock.resetMocks());

it("returns lists with id and name from response", async function() {
	fetchMock.mockResponse(JSON.stringify([
		{id_str: "123", name: "topic-1"},
		{id_str: "456", name: "topic-2"},
	]));

	const twitterListRepository = new TwitterListRepository();
	const lists = await twitterListRepository.findByScreenName("danrot90");

	expect(fetchMock).toBeCalledWith("/api/lists/list.json?screen_name=danrot90");
	expect(lists).toEqual([new List("123" as ListId, "topic-1"), new List("456" as ListId, "topic-2")]);
});

it("returns empty list if response is unsuccessful", async function() {
	fetchMock.mockResponse(JSON.stringify({}), {status: 500});

	const twitterListRepository = new TwitterListRepository();

	expect(() => twitterListRepository.findByScreenName("danrot90")).rejects.toThrow(TwitterApiError);
	expect(fetchMock).toBeCalledWith("/api/lists/list.json?screen_name=danrot90");
});
