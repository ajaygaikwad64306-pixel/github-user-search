import { useEffect, useState } from "react";
import { searchUsers } from "../services/githubApi";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await searchUsers(debouncedQuery);
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return (
    <div className="container">
      <h1>GitHub User Search</h1>
      <p style={{
        textAlign: "center",
        color: "#eee",
        marginBottom: "20px"
      }}>
        Search GitHub profiles instantly using public REST API
      </p>


      <SearchBar value={query} onChange={setQuery} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <div className="grid">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
