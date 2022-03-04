import React from "react";
import '../styles/CategoryCard.css';

const CategoryCard = ({ categoryName }) => {
  return (
    <section className="category-card">
      <h4 className="category-name-card">{categoryName}</h4>
    </section>
  )
}

export default CategoryCard;