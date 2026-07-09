import React from 'react'

const Category = () => {
    const categories = [
  {
    icon: "🔧",
    name: "Mechanics",
    pros: "320+ pros",
    bg: "#FEF3C7",
  },
  {
    icon: "⚡",
    name: "Electricians",
    pros: "280+ pros",
    bg: "#FEF9C3",
  },
  {
    icon: "🚿",
    name: "Plumbers",
    pros: "210+ pros",
    bg: "#E0F2FE",
  },
  {
    icon: "🪚",
    name: "Carpenters",
    pros: "150+ pros",
    bg: "#FDF2F8",
  },
  {
    icon: "❄️",
    name: "AC Repair",
    pros: "180+ pros",
    bg: "#ECFDF5",
  },
  {
    icon: "🏠",
    name: "Appliances",
    pros: "240+ pros",
    bg: "#F0FDF4",
  },
];
  return (
     <div className="section">
      <div className="flex-between">
        <div>
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-sub">
            Find experts for every home & vehicle need
          </p>
        </div>

        <button className="btn btn-outline">
          View All <i className="fa fa-arrow-right" />
        </button>
      </div>

      <div className="category-grid mt-32">
        {categories.map((category) => (
          <div
            key={category.name}
            className="cat-card"
            onClick={() => navigate("post-problem")}
          >
            <div
              className="cat-icon"
              style={{ backgroundColor: category.bg }}
            >
              <span>{category.icon}</span>
            </div>

            <div className="cat-name">{category.name}</div>

            <div
              style={{
                fontSize: "12px",
                color: "var(--gray)",
                marginTop: "4px",
              }}
            >
              {category.pros}
            </div>
          </div>
        ))}
      </div>
    </div>
  
  );
}

export default Category
