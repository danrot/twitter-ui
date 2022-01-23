import List from "../domain/List";
import ListId from "../domain/ListId";
import ListRepository from "../domain/ListRepository";
import TwitterApiError from "./TwitterApiError";

class TwitterListRepository implements ListRepository {
	lists: Array<List> | undefined = undefined;

	async findByScreenName(screenName: string): Promise<Array<List>> {
		if (this.lists === undefined) {
			const response = await fetch(`/api/lists/list.json?screen_name=${screenName}`);

			if (!response.ok) {
				throw new TwitterApiError(await response.json());
			}

			const lists = await response.json();
			this.lists = lists.map((list: {id_str: ListId, name: string}) => new List(list.id_str, list.name));
		}

		return this.lists ?? [];
	}
}

export default TwitterListRepository;
