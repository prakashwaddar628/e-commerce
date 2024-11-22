import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = await params;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (searchTerm) {
      query.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where: query,
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Preserve original error stack trace
  }
}
