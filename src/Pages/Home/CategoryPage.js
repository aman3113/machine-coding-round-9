import React from "react";
import { categories } from "../../Utils/Data";
import { Link } from "react-router-dom";

const CategoryPage = () => {
	return (
		<div>
			<h1 className="text-center text-3xl font-bold p-4">Categories</h1>
			<main className="flex gap-3 flex-wrap justify-center">
				{categories.map((category) => (
					<Link
						to={`/category/${category.category}`}
						key={category._id}
						className="min-w-[200px] w-[20vw] flex-grow md:flex-grow-0"
					>
						<img className="w-full" src={category.thumbnail} alt="text" />
						<p className="text-base font-semibold">{category.category}</p>
					</Link>
				))}
			</main>
		</div>
	);
};

export default CategoryPage;
