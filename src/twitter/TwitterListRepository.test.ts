import List from "../domain/List";
import ListId from "../domain/ListId";
import TwitterApiError from "./TwitterApiError";
import TwitterListRepository from "./TwitterListRepository";

function createFetchMockWithSuccessfulResponse(json: Object) {
	const fetchMock = jest.fn();

	const jsonMock = jest.fn();
	jsonMock.mockResolvedValue(json);

	fetchMock.mockResolvedValue({json: jsonMock, ok: true});

	return fetchMock;
}

function createFetchMockWithUnsuccessfulResponse() {
	const fetchMock = jest.fn();
	fetchMock.mockResolvedValue({json: jest.fn(), ok: false});

	return fetchMock;
}

it("returns lists with id and name from response", async function() {
	global.fetch = createFetchMockWithSuccessfulResponse([
		{id_str: "123", name: "topic-1"},
		{id_str: "456", name: "topic-2"},
	]);

	const twitterListRepository = new TwitterListRepository();
	const lists = await twitterListRepository.findByScreenName("danrot90");

	expect(global.fetch).toBeCalledWith("/api/lists/list.json?screen_name=danrot90");
	expect(lists).toEqual([new List("123" as ListId, "topic-1"), new List("456" as ListId, "topic-2")]);
});

it("returns empty list if response is unsuccessful", async function() {
	global.fetch = createFetchMockWithUnsuccessfulResponse();

	const twitterListRepository = new TwitterListRepository();

	expect(() => twitterListRepository.findByScreenName("danrot90")).rejects.toThrow(TwitterApiError);
	expect(global.fetch).toBeCalledWith("/api/lists/list.json?screen_name=danrot90");
});
