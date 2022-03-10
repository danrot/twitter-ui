import List from "../domain/List";
import TwitterListRepository from "../twitter/TwitterListRepository";

const twitterListRepository = new TwitterListRepository();

const listChooser = document.getElementById("list-chooser") as HTMLSelectElement;

twitterListRepository.findByScreenName("danrot90").then((lists: Array<List>) => {
	lists.forEach((list) => {
		const option = document.createElement("option");
		option.value = list.id;
		option.innerText = list.name;

		listChooser.append(option);
	});
});
