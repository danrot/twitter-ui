import List from "../domain/List";
import ListId from "../domain/ListId";
import TwitterListRepository from "../twitter/TwitterListRepository";
import TwitterTweetRepository from "../twitter/TwitterTweetRepository";

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register(new URL("./service-worker.ts", import.meta.url), {type: "module"});
}

const twitterListRepository = new TwitterListRepository();
const twitterTweetRepository = new TwitterTweetRepository();

const $listChooser = document.getElementById("list-chooser") as HTMLSelectElement;
const $tweets = document.getElementById("tweets") as HTMLSelectElement;

const listsPromise = twitterListRepository.findByScreenName("danrot90");

listsPromise.then((lists: Array<List>) => {
	lists.forEach((list: List) => {
		const option = document.createElement("option");
		option.value = list.id;
		option.innerText = list.name;

		$listChooser.append(option);
	});
});

$listChooser.addEventListener("change", () => {
	const tweetsPromise = twitterTweetRepository.findByList($listChooser.value as ListId);

	tweetsPromise.then((tweets) => {
		$tweets.innerHTML = tweets.map((tweet) => `<article class="tweet">${tweet.text}</article>`).join("");
	});
});
