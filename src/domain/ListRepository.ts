import List from "./List";

interface ListRepository {
	findByScreenName(screenName: string): Promise<Array<List>>;
}

export default ListRepository;
