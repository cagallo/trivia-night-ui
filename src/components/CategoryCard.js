import React from "react";
import '../styles/CategoryCard.css';

const CategoryCard = ({ categoryName }) => {
  return (
    <section className="category-card">
      <h3>{categoryName}</h3>
    </section>
  )
}

export default CategoryCard;