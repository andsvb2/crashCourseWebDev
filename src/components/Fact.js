import { useState } from "react";
import supabase from "../supabase";

function Fact({ fact, categories, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesFalse > (fact.votesInteresting + fact.votesMindBlowing);

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
      {isDisputed ? <span className="disputed">[⛔DISPUTED]</span> : null}
        {fact.text}
        <a
          className="source"
          href={fact.source}
          rel="noreferrer"
          target="_blank"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote("votesInteresting")} disabled={isUpdating}>👍 {fact.votesInteresting}</button>
        <button onClick={() => handleVote("votesMindBlowing")}>🤯 {fact.votesMindBlowing}</button>
        <button onClick={() => handleVote("votesFalse")}>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default Fact;
