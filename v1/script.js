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

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase

async function loadFacts() {
  const res = await fetch(
    "https://ffucvynoppzuplewoyon.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdWN2eW5vcHB6dXBsZXdveW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMjE1NTEsImV4cCI6MjAxMzU5NzU1MX0.bnfyjbjil2yKcf9fi1xNpit5-EqJjInM_zcPc445fOs",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmdWN2eW5vcHB6dXBsZXdveW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwMjE1NTEsImV4cCI6MjAxMzU5NzU1MX0.bnfyjbjil2yKcf9fi1xNpit5-EqJjInM_zcPc445fOs",
      },
    }
  );
  const data = await res.json();
//   console.log(data);
//   const filteredData = data.filter((fact)=>fact.category === 'technology');
  createFactsList(data);
}

loadFacts();

function createFactsList(dataArray) {
  // factsList.insertAdjacentHTML("afterbegin", "<li>Anderson</li>");
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact">
      <p>
          ${fact.text}
          <a class="source" href="${fact.source}" target="_blank">(Source)</a>
      </p>
      <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === fact.category).color}">${fact.category}</span>
    </li>`
  );
  const html = htmlArray.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggçe form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

const allCategories = CATEGORIES.map((el) => el.name);

function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}
