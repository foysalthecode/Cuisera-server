type Ioptions = {
  page?: number | string;
  limit?: number | string;
  sort?: string;
};

type IoptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortOrder: "asc" | "desc" | undefined;
};

const paginationSortingHelper = (options: Ioptions): IoptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortOrder: "asc" | "desc" | undefined =
    options.sort === "desc" ? "desc" : "asc";
  return { page, limit, skip, sortOrder };
};

export default paginationSortingHelper;
