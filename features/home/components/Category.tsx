import Link from "next/link";

type Category = {
    id: string;
    name: string;
};

const Category = ({ categories }: { categories: Category[] }) => {
    return (
        <section className="bg-background py-16">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <p className="mb-3 text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-300">Browse by sport</p>
                <h2 className="mb-8 max-w-2xl font-heading text-3xl font-bold text-foreground md:text-4xl">
                    Choose a category and find match-ready equipment fast.
                </h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-7">
                    {categories.map((c) => (
                        <Link
                            key={c.id}
                            href={`/gear?categoryId=${c.id}`}
                            className="rounded-md border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-md"
                        >
                            <span className="text-xs font-semibold text-muted-foreground">{c.name}</span>
                            <p className="mt-2 text-sm font-semibold text-card-foreground">{c.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
