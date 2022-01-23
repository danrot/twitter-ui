const listIdSymbol = Symbol("listId");

type ListId = string & {[listIdSymbol]: never};

export default ListId;
