import { useEffect, useState } from "react";
import supabase from "./supabase";
import Loader from "./components/Loader";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import CategoryFilter from "./components/CategoryFilter";
import FactList from "./components/FactList";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  // eslint-disable-next-line
  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) {
          setFacts(facts);
        } else {
          alert("There was a problem getting data");
        }
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          setFacts={setFacts}
          setShowForm={setShowForm}
          categories={categories}
        />
      ) : null}

      <main className="main">
        <CategoryFilter
          setCurrentCategory={setCurrentCategory}
          categories={categories}
        />
        {isLoading ? (<Loader />) : (<FactList facts={facts} categories={categories} setFacts={setFacts} />)}
      </main>
    </>
  );
}

export default App;
