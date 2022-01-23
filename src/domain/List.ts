import ListId from "./ListId";

class List {
	id: ListId;
	name: string;

	constructor(id: ListId, name: string) {
		this.id = id;
		this.name = name;
	}
};

export default List;
